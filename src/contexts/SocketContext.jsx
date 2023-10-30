import React, { createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
;
// Create a new context
const SocketContext = createContext();

const SocketProvider = ({ children }) => {

    const [socket, setSocket] = useState(null)
    const socket_url = import.meta.env.VITE_GCR_SOCKET_URL
    const [isToastActive, setIsToastActive] = useState(false);
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
    useEffect(() => {

        const socket = io(socket_url, {
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 5000, // defaults to 1000
            reconnectionDelayMax: 10000 // defaults to 5000
        });


        setSocket(socket);

        socket.on("connect", () => {
            console.log("recovered?", socket.recovered);

            setTimeout(() => {
                if (socket.io.engine) {
                    // close the low-level connection and trigger a reconnection
                    socket.io.engine.close();
                }
            }, 10000);
        });

        socket.on('connect_error', (error) => {
            displayErrorToast("Erro ao conectar com o servidor socket", error);
        });

        return () => {
            socket.off('connect', () => {
                console.log('connected');
            });

            socket.off('connect_error', (error) => {
                displayErrorToast("Error connecting to socket.io server:", error);
            });
        };
    }, []);


    const socketContextValue =
    {
        socket,
        setSocket,
        displayErrorToast


    };

    return (
        <SocketContext.Provider value={socketContextValue}>
            {children}
        </SocketContext.Provider>
    );
}; export { SocketContext, SocketProvider };
