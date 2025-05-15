import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useServiceToken } from '../service/token';

interface TokenContextType {
    apiToken: string;
}

export const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [apiToken, setApiToken] = useState(() => {
        // Recupera o token do cookie ao inicializar
        return Cookies.get('apiToken') || '';
    });
    const { getTokenFromApi } = useServiceToken();

    const expiresIn = 0.5; // Expira em 12 horas

    useEffect(() => {
        let isMounted = true;

        const fetchTokenIfExpired = async () => {
            const tokenFromCookie = Cookies.get('apiToken');
            if (!tokenFromCookie) {
                try {
                    const token = await getTokenFromApi();
                    if (isMounted) {
                        setApiToken(token.accessToken);
                        Cookies.set('apiToken', token.accessToken, { expires: expiresIn });
                    }
                } catch (error) {
                    console.error('Failed to fetch token from API:', error);
                    if (isMounted) {
                        const fallbackToken = 'defaultFallbackToken';
                        setApiToken(fallbackToken);
                        Cookies.set('apiToken', fallbackToken, { expires: expiresIn });
                    }
                }
            } else {
                setApiToken(tokenFromCookie);
            }
        };

        fetchTokenIfExpired();

        return () => {
            isMounted = false;
        };
    }, [getTokenFromApi]);

    return (
        <TokenContext.Provider value={{ apiToken }}>
            {children}
        </TokenContext.Provider>
    );
};

export const useTokenContext = () => {
    const context = React.useContext(TokenContext);
    if (context === undefined) {
        throw new Error('useTokenContext must be used within a TokenProvider');
    }
    return context;
};