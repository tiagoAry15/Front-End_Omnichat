import axios from 'axios';

const apiUrl = import.meta.env.VITE_GCR_MIDDLEWARE_URL + '/speisekarte';
export const MenuAuthor = import.meta.env.VITE_MENU_AUTHOR;
export const menuAPI = axios.create({
    baseURL: apiUrl 
});

export const getMenu = async () => {
    try {
        const headers = {
            'Access-Control-Allow-Origin': '*' // Defina a origem correta
        };

        const response = await menuAPI.get(`/get_menu_by_author/${MenuAuthor}`);
        console.log(response.data);
        return response.data ? response.data : [];
    } catch (error) {
        error.message = "Erro na comunicação com o servidor ao obter cardápio";
        throw error;
    }
}

// Adicionar um novo pedido
export const createMenu = async (menuData) => {
    try {
        if (!menuData) throw new Error("Dados do cardápio inválidos");
        const response = await menuAPI.post(`/create_menu`, menuData);
        return response.data;
    } catch (error) {
        console.error("Erro ao adicionar pedido", error);
        throw error;
    }
}

// Atualizar um pedido existente
export const updateMenu = async (menuData) => {
    try {
        if (!menuData) throw new Error("Dados de pedido inválidos");
        const response = await menuAPI.put(`/update_menu_by_author/${MenuAuthor}`, menuData);
        
        return response.data.speisekarte;
    } catch (error) {
        error.message = "Erro na comunicação com o servidor ao atualizar cardápio";
        throw error;
    }
}



