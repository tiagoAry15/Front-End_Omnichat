import axios from 'axios';

const apiUrl = import.meta.env.VITE_GCP_URL + '/conversation_handler';
const middlewareApiUrl = import.meta.env.VITE_GCR_MIDDLEWARE_URL;

import.meta.env.VITE_GCR_MIDDLEWARE_URL ;
const ChatsAPI = axios.create({
    baseURL: apiUrl 
});



export const getChats = async () => {
    try {
        const response = await ChatsAPI.get(`/get_all_conversations`);
        console.log('response.data', response.data)
        return response.data[0] != 'None' ?  response.data : [];
    } catch (error) {
        error.message = `Erro na comunicação com o servidor ao obter chats`;
        throw error;
    }
}

// Adicionar um novo chat
export const addChat = async (chatData) => {
    try {
        if (!chatData) throw new Error("Dados de chat inválidos");
        const response = await ChatsAPI.get(`/get_all_conversations`);
        var new_chat = response.data.filter(chat => chat.phoneNumber == chatData.phoneNumber)
        return new_chat == [] ? []: new_chat[0];
    } catch (error) {
        console.error("Erro ao adicionar chat", error);
        throw error;
    }
}

// Atualizar um chat existente
export const updateChat = async (chatData) => {
    try {
       
        if (!chatData) throw new Error("Dados de chat inválidos");
        console.log('chatData', chatData)
        const response = await ChatsAPI.put(`/update_conversation`, chatData);
        return chatData;
    } catch (error) {
        error.message = "Erro na comunicação com o servidor ao atualizar chats";
        throw error;
    }
}

// Adicionar uma nova mensagem
export const addMessage = async (messageData) => {
    try {
        if (!messageData) throw new Error("Dados de mensagem inválidos");
         const MiddlewareChatsAPI = axios.create({
            baseURL: middlewareApiUrl + '/conversations'
        });
        const response = await MiddlewareChatsAPI.post(`/send_message_to_user/${messageData.phoneNumber}`, messageData);
        console.log('adicionou mensagem ',response.data )
        return response.data;
    } catch (error) {
        console.error("Erro ao adicionar mensagem", error);
        error.message = "Erro na comunicação com o servidor ao adicionar mensagem";
        throw error;
    }
}

// Obter mensagens de um chat (room) específico
export const getMessages = async (telephone) => {
    try {
        if (!telephone) throw new Error("ID de sala inválido");
        const response = await ChatsAPI.get(`/get_conversation_by_whatsapp_number/${telephone}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao obter mensagens", error);
        throw error;
    }
}
