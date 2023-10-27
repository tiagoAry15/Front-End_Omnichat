import React, { createContext, useState } from 'react';
import cardapio from './cardapio.json'
import { useEffect } from 'react';
// Create a new context
const MenuContext = createContext();

const MenuProvider = ({ children }) => {

    const [menu, setMenu] = useState(cardapio)
    const [isEditing, setIsEditing] = useState(false);


    const addNewItem = (setItems, items) => {
        const newItem = {
            id: items.length + 1, // gerando um ID único com base na data atual
            nome: "",
            tamanho: "",
            preco: ""
        };
        setItems(prevItems => [...prevItems, newItem]);
    }
    const removeItem = (setItems, id) => {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
    }
    const saveMenu = () => { console.log('saved') }

    const menuContextValue =
    {
        menu,
        setMenu,
        isEditing,
        setIsEditing,
        addNewItem,
        removeItem,
        saveMenu
    };

    return (
        <MenuContext.Provider value={menuContextValue}>
            {children}
        </MenuContext.Provider>
    );
}; export { MenuContext, MenuProvider };
