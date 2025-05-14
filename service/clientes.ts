const token = '7Ajjmwfz7RCGOp1zrgmvkZVcyDYw7EcBIK1Q0mA3ja31O0iyU/D53n2G90JaUGllo+mjhAH3WdU7wALWzI5YiyeEZt1NtDMzR3+KWkMZz3SSZirDgI37tWcb+reB+ER95Fo9D3cGpnofFVK2DT8+wqtgMFS0qKw40NpJ90x3NhbNs6lCkgVCXG/FKGAuio0qccA1S4a9I0BHZ3q/TZTNveQwPQg84U1URtGi0jgJxaV131GnmqvZ+Vornm1/r9/Uqw/KGZN3D8YfzFnpE7wlW/E6hqPw942IsX4HYQayHS8SvaveO+FoQcHqCHGmRcMzFZY5q+eeP7+Sk1grdSQAB5O8L3S05FlTYt3kLxW5uLatkfNrB8vD8w/ta1+KMDMj'
const api_key = 'XS2SbP3EhmbR+kY7BllulZaM5XszwQo/AP5ekcVbN5ZaSfA1f44LgHopWITVs3Yb'

export const useServiceClientes = () => {

    const getAllClientes = (page: number = 1) => {
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

    const getOneCliente = (codigo: string[]) => {
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

    const postCliente = (data: any) => {
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

    const putCliente = (data: any) => {
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