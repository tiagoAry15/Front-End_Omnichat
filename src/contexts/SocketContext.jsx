import React, { createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import { createSelector } from 'reselect';
import { useDispatch, useSelector } from "react-redux";
import {
    getChats as onGetChats,
    getOrders as onGetOrders,
} from "/src/store/actions";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {

    const [socket, setSocket] = useState(null)
    const socket_url = import.meta.env.VITE_GCR_SOCKET_URL
    const [isToastActive, setIsToastActive] = useState(false);
    const dispatch = useDispatch();
    const selectChats = createSelector(
        state => state.chat.chats,
        chats => chats
    );

    const selectOrders = createSelector(
        state => state.orders.orders,
        orders => orders
    );
    const chats = useSelector(selectChats);
    const orders = useSelector(selectOrders);

    useEffect(() => {

        console.log('carregando chat')

        dispatch(onGetChats())
        dispatch(onGetOrders())
    }, []);



    const displayErrorToast = (message) => {
        if (!isToastActive) {
            setIsToastActive(true);
            toast.error(message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: () => setIsToastActive(false) // Atualiza o estado quando o toast é fechado
            });
        }
    };
    const displaySuccessToast = (message) => {
        if (!isToastActive) {
            setIsToastActive(true);
            toast.success(message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: () => setIsToastActive(false) // Atualiza o estado quando o toast é fechado
            });
        }
    }
    useEffect(() => {

        const socket = io(socket_url, {
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 5000, // defaults to 1000
            reconnectionDelayMax: 10000 // defaults to 5000
        });


        setSocket(socket);

        socket.on("connect", () => {


        });
        socket.on('connect_error', (error) => {
            displayErrorToast("Erro ao conectar com o servidor socket", error);
        });

        return () => {
            socket.off('connect');
            socket.off('connect_error');
        };
    }, []);


    const socketContextValue =
    {
        chats,
        socket,
        setSocket,
        displayErrorToast,
        displaySuccessToast,


    };

    return (
        <SocketContext.Provider value={socketContextValue}>
            {children}
        </SocketContext.Provider>
    );
}; export { SocketContext, SocketProvider };
