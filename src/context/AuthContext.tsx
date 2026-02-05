import React, { createContext, useContext, useEffect, useState } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

interface User {
    id: string;
    email: string;
    user_metadata?: {
        full_name?: string;
    };
    app_metadata?: {
        roles?: string[];
        unlocked_collections?: string[];
    };
}

interface AuthContextType {
    user: User | null;
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
    hasUnlockedCollection: (collectionId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Initialize Netlify Identity
        netlifyIdentity.init({
            locale: 'en'
        });

        // Handle initial user state
        const currentUser = netlifyIdentity.currentUser() as unknown as User;
        if (currentUser) {
            setUser(currentUser);
        }

        // Set up event listeners
        netlifyIdentity.on('login', (u) => {
            setUser(u as unknown as User);
            netlifyIdentity.close();
        });

        netlifyIdentity.on('logout', () => {
            setUser(null);
        });

        return () => {
            netlifyIdentity.off('login');
            netlifyIdentity.off('logout');
        };
    }, []);

    const login = () => netlifyIdentity.open();
    const logout = () => netlifyIdentity.logout();

    const hasUnlockedCollection = (collectionId: string) => {
        // Check if the user has the collection ID in their app_metadata
        // We'll store this in app_metadata.unlocked_collections (synced via Stripe webhook later)
        return user?.app_metadata?.unlocked_collections?.includes(collectionId) || false;
    };

    return (
        <AuthContext.Provider value={{
            user,
            isLoggedIn: !!user,
            login,
            logout,
            hasUnlockedCollection
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
