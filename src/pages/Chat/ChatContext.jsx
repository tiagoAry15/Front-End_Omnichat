import React, { createContext, useState, useEffect } from 'react';
import whatsappIcon from "../../assets/images/chat/whatsappIcon.png";
import instagramIcon from "../../assets/images/chat/instagramIcon.png";
import facebookIcon from "../../assets/images/chat/MenssagerIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { io } from 'socket.io-client';
import { isEmpty, last, set } from "lodash";
import { toast, ToastContainer } from 'react-toastify';
import {
  addMessage as onAddMessage,
  addChat as onAddChat,
  getChats as onGetChats,
  updateChat as onUpdateChat,
} from "/src/store/actions";
import { createSelector } from 'reselect';
import { LOCALHOST_API_BASE_URL } from '../../constants/apiUrls';
import { current } from '@reduxjs/toolkit';
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [messageBox, setMessageBox] = useState(null);
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: "Davi Frota",
    isActive: true,
  });
  const [search_Menu, setSearch_Menu] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [ChatBoxUsername, setChatBoxUsername] = useState("");
  const [Chat_Box_User_Status, setChatBoxUserStatus] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isToastActive, setIsToastActive] = useState(false);
  const [messages, setMessages] = useState("");
  const [lastMessage, setLastMessage] = useState("");
  const dispatch = useDispatch();

  const socket_url = import.meta.env.VITE_GCR_SOCKET_URL

  const socket = io(socket_url, {
    reconnection: false,
    reconnectionAttempts: 10,
    reconnectionDelay: 2000,
  });

  const social_icons = {
    whatsapp: whatsappIcon,
    instagram: instagramIcon,
    messenger: facebookIcon,
  }



  const { chats, error } = useSelector(state => ({
    chats: state.chat.chats,
    error: state.chat.error
  }));


  useEffect(() => {
    dispatch(onGetChats());


  }, [dispatch]);


  useEffect(() => {
    if (!isEmpty(messages)) scrollToBottom();
  }, [messages]);


  useEffect(() => {

    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('connect_error', (error) => {
      console.error("Error connecting to socket.io server:", error);
    });

    socket.on('message', (data) => {
      console.log('message_received:', data);
      handleMessage(data)
    });

  }, []);


  useEffect(() => {
    console.log('lastMessage atualizado:', lastMessage);
    console.log('currentPhoneNumber :', currentPhoneNumber);
    if (currentPhoneNumber && lastMessage) {
      if (lastMessage.phoneNumber === currentPhoneNumber) {
        var actualChat = chats.find(chat => chat.phoneNumber === currentPhoneNumber);
        setMessages([...actualChat.messagePot]);
        actualChat.unreadMessages = 0;
        dispatch(onUpdateChat(actualChat));
      }



    }
  }, [lastMessage])


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
    if (error && error.message) {
      displayErrorToast(error.message);
    }
  }, [error]);


  const handleMessage = (message) => {

    dispatch(onAddChat(message));
    setLastMessage(message);
  }

  const userChatOpen = (chat) => {
    setChatBoxUsername(chat.name);
    setChatBoxUserStatus(chat.status)
    setCurrentPhoneNumber(chat.phoneNumber);


    if (chat.unreadMessages && chat.unreadMessages > 0) {

      chat.unreadMessages = 0;

      dispatch(onUpdateChat(chat))
    }

    setMessages(chat.messagePot);
    console.log(messages);
  };

  const addMessage = (messageData) => {

    console.log(currentPhoneNumber);

    const message = {

      phoneNumber: messageData.phoneNumber,
      sender: messageData.sender,
      body: messageData.body,
      time: messageData.time,
    };
    try {
      dispatch(onAddMessage(message));
      return message;
    } catch (err) {
      console.log(err);
    }
  };

  const scrollToBottom = () => {
    if (messageBox) {
      messageBox.scrollTop = messageBox.scrollHeight + 1000;
    }
  };

  const onKeyPress = e => {
    const { key, value } = e;
    if (key === "Enter") {
      setcurrentMessage(value);
      addMessage(currentPhoneNumber, currentUser.name, value);
    }
  };

  const chatContextValue = {
    messageBox,
    setMessageBox,
    currentPhoneNumber,
    setCurrentPhoneNumber,
    currentUser,
    setCurrentUser,
    search_Menu,
    setSearch_Menu,
    activeTab,
    setActiveTab,
    ChatBoxUsername,
    setChatBoxUsername,
    Chat_Box_User_Status,
    setChatBoxUserStatus,
    currentMessage,
    setCurrentMessage,
    isToastActive,
    setIsToastActive,
    chats,
    handleMessage,
    userChatOpen,
    onKeyPress,
    social_icons,
    messages,
  };



  return (
    <ChatContext.Provider value={chatContextValue}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
