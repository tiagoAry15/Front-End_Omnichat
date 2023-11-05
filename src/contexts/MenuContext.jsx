import React, { createContext, useState, useEffect } from 'react';
import cardapio from '../pages/Menu/cardapio.json'
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "./SocketContext";
import {
    getMenu as onGetMenu,
    addMenu as onAddMenu,
    updateMenu as onUpdateMenu,
} from "/src/store/actions";
import { useContext } from 'react';

const MenuContext = createContext();

const MenuProvider = ({ children }) => {
    const menu = useSelector(state => state.menu.menu);
    const error = useSelector(state => state.menu.error);
    const loading = useSelector(state => state.menu.loading);

    const { displayErrorToast } = useContext(SocketContext);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const dispatch = useDispatch();


    const MenuAuthor = import.meta.env.VITE_MENU_AUTHOR;
    useEffect(() => {
        loadMenu()
    }, [dispatch])


    function loadMenu() {
        dispatch(onGetMenu())
    }
    const saveMenu = (newMenu) => {
        console.log('newMenu', newMenu)
        setIsSaving(true)
        if (newMenu.Autor === MenuAuthor) dispatch(onUpdateMenu(newMenu))
        else dispatch(onAddMenu(newMenu))
        setIsSaving(false)
        console.log('saved')
    }

    const menuContextValue =
    {
        menu,
        loading,
        error,
        isEditing,
        setIsEditing,
        isSaving,
        setIsSaving,
        loadMenu,
        saveMenu
    };

    return (
        <MenuContext.Provider value={menuContextValue}>
            {children}
        </MenuContext.Provider>
    );
}; export { MenuContext, MenuProvider };
