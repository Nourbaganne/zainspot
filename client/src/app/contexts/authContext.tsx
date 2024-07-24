"use client"

import React, { createContext, useReducer, useEffect, ReactNode, useState } from 'react';

interface User {
  access_token: string;
  user :{
    email: string,
    role: string,
    userId: number
  }
}

interface AuthState {
  user: User | null;
}

interface AuthAction {
  type: 'LOGIN' | 'LOGOUT';
  payload?: User;
}

interface AuthContextProps extends AuthState {
  dispatch: React.Dispatch<AuthAction>;
  loading: boolean;
}

const defaultState: AuthState = {
  user: null,
};

export const AuthContext = createContext<AuthContextProps>({
  ...defaultState,
  dispatch: () => undefined,
  loading: true,
});

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload || null };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, defaultState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch({ type: 'LOGIN', payload: JSON.parse(storedUser) });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('user');
    }
  }, [state.user]);

  console.log('AuthContext state:', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
