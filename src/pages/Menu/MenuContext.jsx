import React, { createContext, useState } from 'react';
import cardapio from './cardapio.json'
import { useEffect } from 'react';
// Create a new context
const MenuContext = createContext();

const MenuProvider = ({ children }) => {

    const [menu, setMenu] = useState(cardapio)
    const [isEditing, setIsEditing] = useState(false);



    const saveMenu = (newMenu) => {
        console.log('newMenu', newMenu)
        setMenu(newMenu)
        console.log('saved')
    }

    const menuContextValue =
    {
        menu,
        setMenu,
        isEditing,
        setIsEditing,
        saveMenu
    };

    return (
        <MenuContext.Provider value={menuContextValue}>
            {children}
        </MenuContext.Provider>
    );
}; export { MenuContext, MenuProvider };
