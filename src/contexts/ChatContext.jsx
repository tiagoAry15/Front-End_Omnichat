import React, { createContext, useState, useEffect, useContext } from 'react';
import whatsappIcon from "../assets/images/chat/whatsappIcon.png";
import instagramIcon from "../assets/images/chat/instagramIcon.png";
import facebookIcon from "../assets/images/chat/MenssagerIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";

import {
  addMessage as onAddMessage,
  addChat as onAddChat,
  getChats as onGetChats,
  updateChat as onUpdateChat,
} from "/src/store/actions";
import { SocketContext } from "./SocketContext";
const ChatContext = createContext();


const ChatProvider = ({ children }) => {

  const booleanName = {
    true: "Ativado",
    false: "Desativado",
  };

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

  const [messages, setMessages] = useState("");
  const { socket, displayErrorToast } = useContext(SocketContext);
  const dispatch = useDispatch();


  const social_icons = {
    whatsapp: whatsappIcon,
    instagram: instagramIcon,
    messenger: facebookIcon,
  }


  const { chats, error, isLoading, message } = useSelector(state => ({
    chats: state.chat.chats,
    error: state.chat.error,
    isLoading: state.chat.loading
  }));
  useEffect(() => {

    dispatch(onGetChats())

    if (currentPhoneNumber) { set }
  }, [dispatch]);


  useEffect(() => {
    if (!isEmpty(messages)) scrollToBottom();
  }, [chats]);


  useEffect(() => {
    if (socket) {

      const handleMessageReceive = (data) => {
        console.log('message_received:', data);
        handleMessage(data);
      };
      socket.on('message', handleMessageReceive);

      // Clean up
      return () => {
        socket.off('message', handleMessageReceive);
      };
    }
  }, [socket]);








  useEffect(() => {
    if (error && error.message) {
      displayErrorToast(error.message);
    }
  }, [error]);


  const handleMessage = (message) => {

    dispatch(onAddChat(message));
    if (message.phoneNumber === currentPhoneNumber) {
      dispatch(onUpdateChat({ phoneNumber: message.phoneNumber, unreadMessages: 0 }));
    }
  }
  const userChatOpen = (chat) => {
    setChatBoxUsername(chat.name);
    console.log(chat.name);
    setChatBoxUserStatus(chat.status);
    console.log(chat.status);
    setCurrentPhoneNumber(chat.phoneNumber);
    console.log(chat.phoneNumber);

    if (chat.unreadMessages && chat.unreadMessages > 0) {

      chat.unreadMessages = 0;

      dispatch(onUpdateChat(chat))
    }
    console.log(chat.messagePot);
    setMessages(chat.messagePot);
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
    chats,
    handleMessage,
    userChatOpen,
    onKeyPress,
    social_icons,
    messages,
    isLoading
  };



  return (
    <ChatContext.Provider value={chatContextValue}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
