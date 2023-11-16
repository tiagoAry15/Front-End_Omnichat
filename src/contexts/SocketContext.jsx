import React, { createContext, useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import { createSelector } from 'reselect';
import { useDispatch, useSelector } from "react-redux";
import {
    getChats as onGetChats,
    addChat as onAddChat,
    getOrders as onGetOrders,
    updateOrder as onUpdateOrder,
    addOrder as onAddOrder,

} from "/src/store/actions";
import { useTranslation } from 'react-i18next';
const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    const { t } = useTranslation();
    const [socket, setSocket] = useState(null)
    const socket_url = import.meta.env.VITE_GCR_SOCKET_URL
    const [isToastActive, setIsToastActive] = useState(false);
    const [receivedMessage, setReceivedMessage] = useState(null);
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
        dispatch(onGetChats())
        dispatch(onGetOrders())
    }, []);

    const chatsRef = useRef(chats);


    useEffect(() => {

        const socket = io(socket_url, {
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 5000, // defaults to 1000
            reconnectionDelayMax: 10000, // defaults to 5000
            auth: {
                offset: undefined,
            },
        });



        setSocket(socket);

        socket.on("connect", () => {
            displaySuccessToast("Conectado ao servidor socket");

        });
        socket.on('connect_error', (error) => {
            displayErrorToast("Erro ao conectar com o servidor socket", error);
        });

        socket.on('order', (data) => {
            socket.emit('message_ack', { id: data.id })
            handleOrderReceive(data.body)
        });

        socket.on('message', (data) => {
            socket.emit('message_ack', { id: data.id })

            handleMessageReceive(data.body)
        });

        return () => {
            socket.off('connect');
            socket.off('connect_error');
            socket.off('order');
            socket.off('message');
        };
    }, []);



    useEffect(() => {
        chatsRef.current = chats;
    }, [chats]);

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

    const handleOrderReceive = (receivedOrder) => {
        if (Array.isArray(receivedOrder) && receivedOrder.length > 0) {
            receivedOrder = receivedOrder[0];
        }
        console.log('order_received', receivedOrder)
        displaySuccessToast(t('novo pedido confirmado'));
        const orderIndex = orders.findIndex((order) => order.communication === receivedOrder.communication);
        console.log(orderIndex)
        if (orderIndex > -1) {
            dispatch(onUpdateOrder(receivedOrder))
        } else {
            dispatch(onAddOrder(receivedOrder))
        }
    };

    const handleMessageReceive = (receivedMessage) => {
        console.log('message_received', receivedMessage);

        const chatIndex = chatsRef.current.findIndex((chat) => chat.phoneNumber === receivedMessage.phoneNumber);
        if (chatIndex > -1) {
            addNewMessage(receivedMessage, chatIndex);
        } else {
            addNewChat(receivedMessage);
        }
    }; // Dependência de chats





    const addNewMessage = (data, chatIndex) => {
        console.log('mensagem nova')
        const updatedChat = { ...chatsRef.current[chatIndex], messagePot: [...chatsRef.current[chatIndex].messagePot, data] };
        updatedChat.unreadMessages = (updatedChat.unreadMessages || 0) + 1;
        updatedChat.lastMessage_timestamp = data.timestamp;
        dispatch(onAddChat(updatedChat));
    }

    const addNewChat = (data) => {
        console.log('chat novo')
        const newChat = {
            phoneNumber: data.phoneNumber,
            name: data.sender,
            messagePot: [data],
            unreadMessages: 1,
            status: "active",
            isImg: false,
            from: data.from,
            lastMessage_timestamp: data.timestamp,
        };
        dispatch(onAddChat(newChat));
    }



    const socketContextValue =
    {
        chats,
        orders,
        receivedMessage,
        setReceivedMessage,
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
