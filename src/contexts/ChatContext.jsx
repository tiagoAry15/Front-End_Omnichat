import React, { createContext, useState, useEffect, useContext } from 'react';
import whatsappIcon from "../assets/images/chat/whatsappIcon.png";
import instagramIcon from "../assets/images/chat/instagramIcon.png";
import facebookIcon from "../assets/images/chat/MenssagerIcon.png";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
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
  const [messagesBuffer, setMessagesBuffer] = useState([]);

  const [messages, setMessages] = useState("");
  const { chats, socket, displayErrorToast } = useContext(SocketContext);
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

  const processMessages = () => {
    // Processa as mensagens acumuladas no buffer
    messagesBuffer.forEach(message => {
      handleMessageReceive(message)
    });
    setMessagesBuffer([]); // Limpa o buffer
  };
  const debouncedProcessMessages = _.debounce(processMessages, 500);


  useEffect(() => {
    if (!_.isEmpty(messages)) scrollToBottom();
  }, [chats]);


  const handleMessageReceive = (data) => {
    console.log('message_received:', data);
    socket.emit('message_ack', { id: data.id })
    handleMessage(data.message);
  };

  useEffect(() => {
    if (socket) {



      if (socket) {
        socket.on('message', (data) => {
          setMessagesBuffer(prevMessages => [...prevMessages, data]);
          debouncedProcessMessages();
        });
      }

      // Clean up
      return () => {
        socket.off('message');
      };
    }
  }, [chats, messages, socket, debouncedProcessMessages]);



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
      setMessages([...messages, data]);
    }
  }

  const addNewMessage = (data, chatIndex) => {
    console.log('mensagem nova')
    const updatedChat = { ...chats[chatIndex], messagePot: [...chats[chatIndex].messagePot, data] };
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
    };
    console.log(newChat.from)
    dispatch(onAddChat(newChat));
  }


  const userChatOpen = (chat) => {

    setChatBoxUsername(chat.name);
    setChatBoxUserStatus(chat.status)
    setCurrentPhoneNumber(chat.phoneNumber);


    if (chat.unreadMessages && chat.unreadMessages > 0) {

      chat.unreadMessages = 0;

      dispatch(onUpdateChat({ phoneNumber: chat.phoneNumber, unreadMessages: 0 }))
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
