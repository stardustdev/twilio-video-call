import React, { createContext, useContext, useState } from 'react';
import { TwilioError } from 'twilio-video';

export interface StateContextType {
  error: TwilioError | null;
  setError(error: TwilioError | null): void;
  getToken(name: string, room: string): Promise<string>;
  user?: { displayName: undefined; photoURL: undefined; passcode?: string } | null;
  isAuthReady?: boolean;
  activeSinkId: string;
  setActiveSinkId(sinkId: string): void;
}

export const StateContext = createContext<StateContextType>(null!);

/*
  The 'react-hooks/rules-of-hooks' linting rules prevent React Hooks fron being called
  inside of if() statements. This is because hooks must always be called in the same order
  every time a component is rendered. The 'react-hooks/rules-of-hooks' rule is disabled below
  because the "if (process.env.REACT_APP_SET_AUTH === 'firebase')" statements are evaluated
  at build time (not runtime). If the statement evaluates to false, then the code is not
  included in the bundle that is produced (due to tree-shaking). Thus, in this instance, it
  is ok to call hooks inside if() statements.
*/
export default function AppStateProvider(props: React.PropsWithChildren<{}>) {
  const [error, setError] = useState<TwilioError | null>(null);
  const [activeSinkId, setActiveSinkId] = useState('default');

  let contextValue = {
    error,
    setError,
    activeSinkId,
    setActiveSinkId,
  } as StateContextType;

  contextValue = {
    ...contextValue,
    getToken: async (identity, roomName) => {
      const endpoint = process.env.REACT_APP_TOKEN_ENDPOINT || '/token';
      const params = new window.URLSearchParams({ identity, roomName });

      return fetch(`${endpoint}?${params}`).then(res => res.text());
    },
  };

  const getToken: StateContextType['getToken'] = (name, room) => {
    return contextValue
      .getToken(name, room)
      .then(res => {
        return res;
      })
      .catch(err => {
        setError(err);
        return Promise.reject(err);
      });
  };

  return <StateContext.Provider value={{ ...contextValue, getToken }}>{props.children}</StateContext.Provider>;
}

export function useAppState() {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useAppState must be used within the AppStateProvider');
  }
  return context;
}
