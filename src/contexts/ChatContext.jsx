import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import whatsappIcon from "../assets/images/chat/whatsappIcon.png";
import instagramIcon from "../assets/images/chat/instagramIcon.png";
import facebookIcon from "../assets/images/chat/MenssagerIcon.png";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { createSelector } from 'reselect';
import {
  addMessage as onAddMessage,
  updateChat as onUpdateChat,
} from "/src/store/actions";
import { SocketContext } from "./SocketContext";

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
  const [messages, setMessages] = useState("");
  const { chats, displayErrorToast, receivedMessage, setReceivedMessage } = useContext(SocketContext);
  const dispatch = useDispatch();


  const selectError = createSelector(
    state => state.chat.error,
    error => error
  );

  const selectIsLoading = createSelector(
    state => state.chat.loading,
    loading => loading
  );

  const social_icons = {
    whatsapp: whatsappIcon,
    instagram: instagramIcon,
    messenger: facebookIcon,
  }

  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);


  useEffect(() => {
    // Encontra a conversa com o phoneNumber correspondente
    const currentChat = chats.find(chat => chat.phoneNumber === currentPhoneNumber);
    if (currentChat) {
      console.log(currentChat);
      if (currentChat.unreadMessages && currentChat.unreadMessages > 0) {
        dispatch(onUpdateChat({ phoneNumber: currentPhoneNumber, unreadMessages: 0 }));
      }
      setMessages(prevMessages => [...prevMessages, currentChat.messagePot[currentChat.messagePot.length - 1]]);
    }
  }, [chats, currentPhoneNumber]);



  useEffect(() => {
    if (messages.length > 0) scrollToBottom();
  }, [chats]);

  useEffect(() => {
    if (error && error.message) {
      displayErrorToast(error.message);
    }
  }, [error]);



  const userChatOpen = (chat) => {

    setChatBoxUsername(chat.name);
    setChatBoxUserStatus(chat.status)
    setCurrentPhoneNumber(chat.phoneNumber);


    if (chat.unreadMessages && chat.unreadMessages > 0) {

      chat.unreadMessages = 0;

      dispatch(onUpdateChat({ phoneNumber: chat.phoneNumber, unreadMessages: 0 }))
    }

    setMessages(chat.messagePot);

  };


  const sendMessageToUser = () => {

    console.log(currentPhoneNumber);

    const message = {
      id: _.uniqueId(),
      phoneNumber: currentPhoneNumber,
      sender: "Bot",
      body: currentMessage,
    };
    try {
      console.log(message)
      dispatch(onAddMessage(message));
      receivedMessage(message);
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
      // setcurrentMessage(value);
      // addMessage(currentPhoneNumber, currentUser.name, value);
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
    userChatOpen,
    onKeyPress,
    social_icons,
    messages,
    isLoading,
    sendMessageToUser
  }


  return (
    <ChatContext.Provider value={chatContextValue}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
