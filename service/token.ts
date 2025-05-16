const api_key = 'XS2SbP3EhmbR+kY7BllulZaM5XszwQo/AP5ekcVbN5ZaSfA1f44LgHopWITVs3Yb'


export const useServiceToken = () => {
    const getTokenFromApi = () => {
        try {
            const url = `https://api.serverlondrisoft.com:9050/autenticador/Token/`;
            const data = fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    chave: api_key
                },
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }).catch((error) => {
                console.error('There has been a problem with your fetch operation:', error);
            })
            return data;
        } catch (error) {
            throw new Error(`Error fetching data: ${error}`);
        }
    }

    const testApiToken = async (token: string) => {
        try {
            const url = `https://api.serverlondrisoft.com:9050/autenticador/TestarApi/`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error(`Erro ao testar token: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao testar o token:', error);
            throw error;
        }
    };

    return { getTokenFromApi, testApiToken }
}