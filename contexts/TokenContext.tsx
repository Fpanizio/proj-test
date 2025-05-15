import React, { createContext, useState, useEffect } from 'react';
import { useServiceToken } from '../service/token';

interface TokenContextType {
    apiToken: string;
}

export const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {

    const [apiToken, setApiToken] = useState('');
    const { getTokenFromApi } = useServiceToken();

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const token = await getTokenFromApi();
                setApiToken(token.accessToken);
            } catch (error) {
                console.error('Failed to fetch token from API:', error);
                const fallbackToken = 'defaultFallbackToken'; // Valor padrão para o token
                setApiToken(fallbackToken);
            }
        };

        fetchToken();
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
        throw new Error('useTokenContext must be used within a TokenContextProvider');
    }
    return context;
};