import { createContext, useContext, ReactNode } from 'react';
import User from '../interfaces/User';
import Role from '../interfaces/Role';

interface UserContextType {
    roles: Role[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children, roles }: { children: ReactNode; roles: Role[]; }) => {
    return (
        <UserContext.Provider value={{ roles }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};
