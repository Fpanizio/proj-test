const api_key = 'XS2SbP3EhmbR+kY7BllulZaM5XszwQo/AP5ekcVbN5ZaSfA1f44LgHopWITVs3Yb'

export const useServiceClientes = () => {

    const getAllClientes = (page: number = 1, token: string) => {
        try {


            const url = `https://api.serverlondrisoft.com:9050/clientes/Cliente/?page=${page}&limit=10&filtros={"codigo":0,"nome":"","cnpj":"","cpf":""}`;
            const data = fetch(url, {
                method: 'GET',
                headers: {
                    token: token,
                    chave: api_key,
                }
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

    const getOneCliente = (codigo: string[], token: string) => {
        try {
            const url = `https://api.serverlondrisoft.com:9050/clientes/Cliente/Id/?cliente=${codigo}`
            const data = fetch(url + "", {
                method: 'GET',
                headers: {
                    token: token,
                    chave: api_key,
                }
            }

            ).then((response) => {
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

    const postCliente = (data: any, token: string) => {
        const newData = updatePayload(data);
        try {
            const url = 'https://api.serverlondrisoft.com:9050/clientes/Cliente/'
            const response = fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: token,
                    chave: api_key,
                },
                body: JSON.stringify(newData)
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }).catch((error) => {
                console.error('There has been a problem with your fetch operation:', error);
            })
            return response;
        }
        catch (error) {
            throw new Error(`Error fetching data: ${error}`);
        }
    }

    const putCliente = (data: any, token: string) => {
        const newData = updatePayload(data);

        try {
            const url = 'https://api.serverlondrisoft.com:9050/clientes/Cliente/'
            const response = fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    token: token,
                    chave: api_key,
                },
                body: JSON.stringify(newData)
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }).catch((error) => {
                console.error('There has been a problem with your fetch operation:', error);
            })
            return response;
        }
        catch (error) {
            throw new Error(`Error fetching data: ${error}`);
        }
    }

    const updatePayload = (data: any) => {
        const payload = {
            ...data,
            contatos: [],
        };
        return payload;
    }

    return {
        getAllClientes,
        getOneCliente,
        postCliente,
        putCliente
    }
}