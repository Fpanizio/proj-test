import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useServiceToken } from '../service/token';

interface TokenContextType {
    apiToken: string;
}

export const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [apiToken, setApiToken] = useState<string>(
        () => Cookies.get('apiToken') || ''
    );
    const { getTokenFromApi, testApiToken } = useServiceToken();

    useEffect(() => {
        let isMounted = true;

        const fetchAndStoreToken = async () => {
            try {
                const tokenResponse = await getTokenFromApi();
                const token = tokenResponse.accessToken ?? tokenResponse.token ?? '';

                await testApiToken(token);

                if (isMounted) {
                    setApiToken(token);
                    const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // agora + 30min
                    Cookies.set('apiToken', token, { expires: expiresAt });
                }
            } catch (error) {
                console.error('Falha ao obter ou validar token:', error);
                if (isMounted) {
                    const fallbackToken = 'defaultFallbackToken';
                    setApiToken(fallbackToken);
                    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
                    Cookies.set('apiToken', fallbackToken, { expires: expiresAt });
                }
            }
        };

        const existing = Cookies.get('apiToken');
        if (!existing) {
            fetchAndStoreToken();
        } else {
            setApiToken(existing);
        }

        return () => {
            isMounted = false;
        };
    }, [getTokenFromApi, testApiToken]);

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
