import axios from 'axios';

const apiUrl = import.meta.env.VITE_GCF_URL;

const ordersAPI = axios.create({
    baseURL: apiUrl
});

export const getOrders = async () => {
    try {
    
        const response = await ordersAPI.get(`/order_handler/read`);
        return response.data ? response.data : [];
    } catch (error) {
        error.message = "Erro na comunicação com o servidor ao obter pedidos";
        throw error;
    }
}

export const getOrderById = async (orderId) => {
    try {
        if (!orderId) throw new Error("ID de pedido inválido");
        const headers = { "unique_id": orderId};
        const response = await ordersAPI.get(`/order_handler/read`, headers);
        return response.data;
    } catch (error) {
        error.message = "Erro na comunicação com o servidor ao obter pedidos";
        throw error;
    }
}
// Adicionar um novo pedido
export const addOrder = async (orderData) => {
    try {
        if (!orderData) throw new Error("Dados de pedido inválidos");
        const response = await ordersAPI.post(`/order_handler/create`, orderData);
        //let uid = JSON.stringify(response.data);
        //let orderDict = {}
        //orderDict[uid] = orderData;

        return orderData;
    } catch (error) {
        console.error("Erro ao adicionar pedido", error);
        throw error;
    }
}

// Atualizar um pedido existente
export const updateOrder = async (orderData) => {
    console.log('orderId', orderData)
    try {
        console.log('orderData', orderData);
        if (!orderData) throw new Error("Dados de pedido inválidos");
        const response = await ordersAPI.put(`/order_handler/update/${orderData.orderId}`, orderData);
        return response.data;
    } catch (error) {
        error.message = "Erro na comunicação com o servidor ao atualizar pedidos";
        throw error;
    }
}

// Deletar um pedido
export const deleteOrder = async (orderId) => {
    console.warn(orderId)
    try {
        if (!orderId) throw new Error("ID de pedido inválido");
        const response = await ordersAPI.delete(`/order_handler/delete/${orderId}`);
        return response.data;
    } catch (error) {
        error.message = "Erro na comunicação com o servidor ao deletar pedido";
        throw error;
    }
}

