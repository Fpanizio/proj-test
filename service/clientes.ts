import Cookies from "js-cookie";

const api_key = 'XS2SbP3EhmbR+kY7BllulZaM5XszwQo/AP5ekcVbN5ZaSfA1f44LgHopWITVs3Yb'

export const useServiceClientes = () => {

    const getAllClientes = async (
        page: number = 1,
        limite: number = 10,
        token: string,
        nome: string = "",
        cnpj: string = "",
        cpf: string = ""
    ) => {
        try {
            const filtros = { codigo: 0, nome, cnpj, cpf };


            // 1) Serializa e gera a query string já escapada
            const params = new URLSearchParams({
                page: String(page),
                limit: String(limite),
                filtros: JSON.stringify(filtros),
            });

            // 2) Constrói a URL completa
            const url = `https://api.serverlondrisoft.com:9050/clientes/Cliente/?${params.toString()}`;

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    token: Cookies.get('apiToken') ?? '',
                    chave: api_key,
                },
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return await response.json();
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
            throw error;
        }
    };

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