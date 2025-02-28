'use client';
//need to be changed before deployment
import React, {
    createContext,
    useReducer,
    useEffect,
    ReactNode,
    useState,
    useContext,
} from 'react';
import { redirect } from 'next/navigation';

interface Permission {
    id: number;
    action: string;
    resource: string;
}

interface RoleProps {
    id: number;
    name: string;
    permissions: Permission[];
}

interface User {
    access_token: string;
    expires_at: Date;
    user: {
        email: string;
        role: RoleProps;
        userId: number;
    };
}

interface AuthState {
    user: User | null;
    initialized: boolean;
}

interface AuthAction {
    type: 'LOGIN' | 'LOGOUT' | 'INIT';
    payload?: User;
}

interface AuthContextProps extends AuthState {
    dispatch: React.Dispatch<AuthAction>;
    loading: boolean;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isSupport: () => boolean;
    initialized: boolean;
}

const defaultState: AuthState = {
    user: null,
    initialized: false
};

export const AuthContext = createContext<AuthContextProps & AuthContextType>({
    ...defaultState,
    dispatch: () => undefined,
    loading: true,
    login: () => Promise.resolve(),
    logout: () => undefined,
    isSupport: () => false,
});

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthContextProvider');
    }
    return context;
};

export const authReducer = (
    state: AuthState,
    action: AuthAction,
): AuthState => {
    console.log('Auth Reducer:', { type: action.type, payload: action.payload, currentState: state });
    
    switch (action.type) {
        case 'INIT':
            return { ...state, initialized: true };
        case 'LOGIN':
            if (!action.payload) {
                console.error('LOGIN action missing payload');
                return state;
            }
            return { user: action.payload, initialized: true };
        case 'LOGOUT':
            return { user: null, initialized: true };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, defaultState);
    const [loading, setLoading] = useState(true);

    // Debug auth state changes
    useEffect(() => {
        console.log('Auth State Changed:', {
            state,
            loading,
            hasUser: !!state.user,
            userEmail: state.user?.user?.email,
            isInitialized: state.initialized,
        });
    }, [state, loading]);

    useEffect(() => {
        console.log('Auth Context Initializing...');
        const initializeAuth = async () => {
            try {
                const storedUser = localStorage.getItem('user');
                const storedToken = localStorage.getItem('token');
                console.log('Stored Auth Data:', { hasStoredUser: !!storedUser, hasStoredToken: !!storedToken });

                if (storedUser && storedToken) {
                    const userData = JSON.parse(storedUser);
                    console.log('Parsed User Data:', {
                        email: userData.user?.email,
                        role: userData.user?.role?.name,
                        expiresAt: userData.expires_at
                    });
                    
                    // For test support user, always consider it valid
                    if (userData.user?.email === 'support@test.com') {
                        console.log('Test Support User Found - Restoring Session');
                        // Create a proper access token for the test user
                        const testUserData = {
                            ...userData,
                            access_token: storedToken
                        };
                        dispatch({ type: 'LOGIN', payload: testUserData });
                        setLoading(false);
                        return;
                    }

                    // For regular users, check expiration
                    const expiresAt = new Date(userData.expires_at);
                    if (expiresAt > new Date()) {
                        console.log('Valid User Session Found - Restoring');
                        dispatch({ type: 'LOGIN', payload: userData });
                    } else {
                        console.log('User Session Expired - Clearing');
                        localStorage.removeItem('user');
                        localStorage.removeItem('token');
                        dispatch({ type: 'LOGOUT' });
                    }
                }
            } catch (error) {
                console.error('Error initializing auth:', error);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                dispatch({ type: 'LOGOUT' });
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            // For test support user
            if (email === 'support@test.com' && password === 'test') {
                console.log('Test Support Login - Starting');
                const timestamp = Date.now();
                const testToken = `test-support-token-${timestamp}`;
                const testUser = {
                    user: {
                        email: 'support@test.com',
                        role: {
                            id: 1,
                            name: 'support',
                            permissions: []
                        },
                        userId: 1
                    },
                    access_token: testToken,
                    expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
                    email: 'support@test.com',
                    role: {
                        id: 1,
                        name: 'support',
                        permissions: []
                    },
                    userId: 1
                };

                console.log('Storing user data and token...');
                localStorage.setItem('user', JSON.stringify(testUser));
                localStorage.setItem('token', testToken);
                
                console.log('Updating auth state...');
                dispatch({ type: 'LOGIN', payload: testUser });
                
                console.log('Navigating to support dashboard...');
                redirect('/admin/support');
                return;
            }

            console.log('Invalid login attempt');
            throw new Error('Invalid credentials');
        } catch (error) {
            console.error('Login Error:', error);
            throw error;
        }
    };

    const logout = () => {
        console.log('Logging out user...');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
        redirect('/login');
    };

    // Add protection for support routes
    useEffect(() => {
        const path = window.location.pathname;
        if (path.startsWith('/admin/support')) {
            const isAuthorized = state.user?.user?.role?.name === 'support';
            console.log('Checking support access:', { path, isAuthorized });
            
            if (!isAuthorized) {
                console.log('Unauthorized access attempt to support route - redirecting to login');
                redirect('/login');
            }
        }
    }, [state.user]);

    const isSupport = () => {
        const support = state.user?.user?.role?.name === 'support';
        console.log('Support role check:', { 
            support,
            hasUser: !!state.user,
            userRole: state.user?.user?.role?.name,
            email: state.user?.user?.email
        });
        return support;
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                dispatch,
                loading,
                login,
                logout,
                isSupport,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};