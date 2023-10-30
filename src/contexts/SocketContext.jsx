import React, { createContext, useState } from 'react';

;
// Create a new context
const SocketContext = createContext();

const SocektProvider = ({ children }) => {

    const [socket, setSocket] = useState(null)
    const socket_url = import.meta.env.VITE_GCR_SOCKET_URL


    useEffect(() => {

        const socket = io(socket_url, {
            reconnection: false,
            reconnectionAttempts: 10,
            reconnectionDelay: 5000,
        });


        setSocket(socket);

        socket.on('connect', () => {
            console.log('connected');
        });

        socket.on('connect_error', (error) => {
            console.error("Error connecting to socket.io server:", error);
        });

        return () => {
            socket.disconnect();
        };
    }, []);


    const socketContextValue =
    {
        socket,
        setSocket,

    };

    return (
        <SocketContext.Provider value={socketContextValue}>
            {children}
        </SocketContext.Provider>
    );
}; export { SocketContext, SocektProvider };
