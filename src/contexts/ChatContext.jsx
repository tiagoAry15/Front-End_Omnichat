import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import whatsappIcon from "../assets/images/chat/whatsappIcon.png";
import instagramIcon from "../assets/images/chat/instagramIcon.png";
import facebookIcon from "../assets/images/chat/MenssagerIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, set } from "lodash";
import { createSelector } from 'reselect';
import {
  addMessage as onAddMessage,
  addChat as onAddChat,
  getChats as onGetChats,
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
  const { socket, displayErrorToast } = useContext(SocketContext);
  const dispatch = useDispatch();

  const selectChats = createSelector(
    state => state.chat.chats,
    chats => chats
  );

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

  const ReduxChats = useSelector(selectChats);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);

  const [chats, setChats] = useState(ReduxChats);



  useEffect(() => {

    console.log('carregando chat')
    dispatch(onGetChats())

  }, [dispatch]);

  useEffect(() => {
    setChats(ReduxChats);
  }, [ReduxChats]);


  useEffect(() => {
    // Agora isso deve mostrar o estado atualizado
  }, [chats]);

  useEffect(() => {
    if (!isEmpty(messages)) scrollToBottom();
  }, [chats]);




  useEffect(() => {
    if (socket) {

      const handleMessageReceive = (data) => {
        console.log('message_received:', data);
        handleMessage(data.message);
      };

      socket.on('message', handleMessageReceive);

      // Clean up
      return () => {
        socket.off('message', handleMessageReceive);
      };
    }
  }, [chats, socket]);



  useEffect(() => {
    if (error && error.message) {
      displayErrorToast(error.message);
    }
  }, [error]);



  const handleMessage = (data) => {
    console.log(chats)
    const chatIndex = chats.findIndex((chat) => chat.phoneNumber === data.phoneNumber);
    if (chatIndex > -1) {
      addNewMessage(data, chatIndex);
    } else {
      addNewChat(data);
    }
    if (data.phoneNumber === currentPhoneNumber) {
      dispatch(onUpdateChat({ phoneNumber: data.phoneNumber, unreadMessages: 0 }));
    }
  }

  const addNewMessage = (data, chatIndex) => {
    console.log('mensagem nova')
    const updatedChat = { ...chats[chatIndex], messagePot: [...chats[chatIndex].messagePot, data] };
    updatedChat.unreadMessages = (updatedChat.unreadMessages || 0) + 1;
    updatedChat.lasMessage_timestamp = data.timestamp;
    setChats([...chats.slice(0, chatIndex), updatedChat, ...chats.slice(chatIndex + 1)]);
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
    };
    console.log(newChat.from)
    setChats([...chats, newChat]);
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

  const sendMessageToUser = () => {

    console.log(currentPhoneNumber);

    const message = {

      phoneNumber: currentPhoneNumber,
      sender: "Bot",
      body: currentMessage,
    };
    try {
      console.log(message)
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
      // setcurrentMessage(value);
      // addMessage(currentPhoneNumber, currentUser.name, value);
    }
  };

  const chatContextValue = useMemo(() => ({
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
    isLoading,
    sendMessageToUser
  }), [chats]);



  return (
    <ChatContext.Provider value={chatContextValue}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
