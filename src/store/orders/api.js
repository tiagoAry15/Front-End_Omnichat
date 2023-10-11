import axios from 'axios';

const apiUrl = import.meta.env.VITE_GCP_URL;

const ordersAPI = axios.create({
    baseURL: apiUrl 
});

export const getOrders = async () => {
    try {
        const headers = {
            'Access-Control-Allow-Origin': '*' // Defina a origem correta
        };

        const response = await ordersAPI.get(`/get_all_orders`, { headers });
        return response.data ? response.data : [];
    } catch (error) {
        error.message = "Erro na comunicação com o servidor ao obter pedidos";
        throw error;
    }
}

// Adicionar um novo pedido
export const addOrder = async (orderData) => {
    try {
        if (!orderData) throw new Error("Dados de pedido inválidos");
        const response = await ordersAPI.post(`/create_order`, orderData);
        return response.data;
    } catch (error) {
        console.error("Erro ao adicionar pedido", error);
        throw error;
    }
}

// Atualizar um pedido existente
export const updateOrder = async (orderData) => {
    try {
        if (!orderData) throw new Error("Dados de pedido inválidos");
        const response = await ordersAPI.put(`/update_order`, orderData);
        return response.data;
    } catch (error) {
        error.message = "Erro na comunicação com o servidor ao atualizar pedidos";
        throw error;
    }
}

// Deletar um pedido
export const deleteOrder = async (orderId) => {
    try {
        if (!orderId) throw new Error("ID de pedido inválido");
        const response = await ordersAPI.delete(`/delete_order/${orderId}`);
        return response.data;
    } catch (error) {
        error.message = "Erro na comunicação com o servidor ao deletar pedido";
        throw error;
    }
}

