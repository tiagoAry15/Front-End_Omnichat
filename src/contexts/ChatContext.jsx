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

  const [search_Menu, setSearch_Menu] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [ChatBoxUsername, setChatBoxUsername] = useState("");
  const [Chat_Box_User_Status, setChatBoxUserStatus] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState("");
  const [currentChat, setCurrentChat] = useState(null)
  const [isSendingMessage, setIsSendingMessage] = useState(false)
  const { chats, displayErrorToast } = useContext(SocketContext);
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.Login.user);

  const selectError = createSelector(
    state => state.chat.error,
    error => error
  );

  const selectIsLoading = createSelector(
    state => state.chat.loading,
    loading => loading
  );
  const selectIsLoadingMessages = createSelector(
    state => state.chat.loading_message,
    loading_message => loading_message
  )

  const social_icons = {
    whatsapp: whatsappIcon,
    instagram: instagramIcon,
    messenger: facebookIcon,
  }

  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  const isLoadingMessages = useSelector(selectIsLoadingMessages);

  useEffect(() => {
    // Encontra a conversa com o phoneNumber correspondente
    //const currentChat = chats.find(chat => chat.phoneNumber === currentPhoneNumber);
    if (currentChat) {
      console.log(currentChat);
      if (currentChat.unreadMessages && currentChat.unreadMessages > 0) {
        dispatch(onUpdateChat({ phoneNumber: currentChat.phoneNumber, unreadMessages: 0 }));

      }
    }
  }, [chats]);

  useEffect(() => {
    if (chats && currentPhoneNumber) {
      const updatedCurrentChat = chats.find(chat => chat.phoneNumber === currentPhoneNumber);
      setCurrentChat(updatedCurrentChat);
    }
  }, [chats, currentPhoneNumber]);

  useEffect(() => {

    if (currentChat && currentChat.messagePot && currentChat.messagePot.length > 0) scrollToBottom();
  }, [chats]);

  useEffect(() => {
    if (error && error.message) {
      displayErrorToast(error.message);
    }
  }, [error]);



  const userChatOpen = (chat) => {
    setCurrentPhoneNumber(chat.phoneNumber);
    setCurrentChat(chat)

    if (chat.unreadMessages && chat.unreadMessages > 0) {

      chat.unreadMessages = 0;

      dispatch(onUpdateChat({ phoneNumber: chat.phoneNumber, unreadMessages: 0 }))
    }

  };


  const sendMessageToUser = () => {

    if (currentUser) {
      const message = {
        id: _.uniqueId(),
        phoneNumber: currentChat.phoneNumber,
        sender: currentUser.email.split('@')[0],
        body: currentMessage,
        from: currentChat.from[0],
      };
      try {
        console.log(message)
        dispatch(onAddMessage(message));
        setCurrentMessage("");
      } catch (err) {
        console.log(err);
      }
    }

  }
  const scrollToBottom = () => {
    if (messageBox) {
      messageBox.scrollTop = messageBox.scrollHeight + 1000;
      console.log('scrow')
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
    currentChat,
    userChatOpen,
    onKeyPress,
    social_icons,
    messages,
    isLoading,
    isLoadingMessages,
    sendMessageToUser
  }


  return (
    <ChatContext.Provider value={chatContextValue}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
