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

    const { displayErrorToast, displaySuccessToast } = useContext(SocketContext);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const dispatch = useDispatch();


    const MenuAuthor = import.meta.env.VITE_MENU_AUTHOR;
    useEffect(() => {
        loadMenu()
    }, [dispatch])

    const formatErrorMessage = (errors) => {
        let messages = [];

        for (const [menuType, errorDetails] of Object.entries(errors)) {
            if (errorDetails.length > 0) {
                const errorMessages = errorDetails.map(error => `Item ${error.index + 1}: ${error.field}`);
                messages.push(`${menuType} - ${errorMessages.join(', ')}`);
            }
        }

        return messages.join('\n');
    };

    const loadMenu = () => {
        dispatch(onGetMenu())
    }
    const saveMenu = (newMenu) => {
        console.log('newMenu', newMenu)
        let menuValido = validateMenu(newMenu)
        if (menuValido.isValid) {
            setIsSaving(true)
            if (newMenu.Autor === MenuAuthor) {
                console.log("salvando menu")
                dispatch(onUpdateMenu(newMenu))
            }
            else { dispatch(onAddMenu(newMenu)) }
            setIsSaving(false)
            console.log('saved')
            displaySuccessToast('Menu salvo com sucesso!')
            setIsEditing(false)
        }
        else {
            displayErrorToast('Preencha todos os campos!: \n' + formatErrorMessage(menuValido.errors))
        }
    }
    const validateField = (menuItems, fieldName) => {
        // This will hold information about any fields that have validation errors
        const errors = menuItems
            .map((item, index) => {
                // Check if 'nome' and 'tamanho' fields are not empty or whitespace only
                const nameIsValid = item.nome.trim() !== '';
                const sizeIsValid = item.tamanho.trim() !== '';

                // Check if 'preço' field is not empty, and is a number greater than 0
                const priceIsValid = !isNaN(item.preço) && Number(item.preço) > 0;

                // If there's an error with the name, size, or price, return details, otherwise return null
                if (!nameIsValid || !sizeIsValid || !priceIsValid) {
                    return {
                        index,
                        field: !nameIsValid ? 'nome' : !sizeIsValid ? 'tamanho' : 'preço',
                    };
                } else {
                    return null;
                }
            })
            // Filter out the non-error entries (where field is null)
            .filter(error => error !== null);

        return errors;
    };

    const validateMenu = (menu) => {
        const errors = {
            Bebidas: validateField(menu.Bebidas, 'Bebidas'),
            Pizza: validateField(menu.Pizzas, 'Pizza'),
        };
        console.log('errors', errors)
        // If there are no errors in both arrays, validation is successful
        const isValid = errors.Bebidas.length === 0 && errors.Pizza.length === 0;

        // Return both the validation result and the details of any errors
        return {
            isValid,
            errors,
        };
    };

    // Usage example:
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
