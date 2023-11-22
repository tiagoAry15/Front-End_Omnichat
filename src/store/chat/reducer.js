import {
  GET_GROUPS_SUCCESS,
  GET_CHATS_SUCCESS,
  GET_GROUPS_FAIL,
  GET_CHATS_FAIL,
  GET_CONTACTS_SUCCESS,
  GET_CONTACTS_FAIL,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL,
  POST_ADD_MESSAGE_SUCCESS,
  POST_ADD_MESSAGE_FAIL,
  RECEIVE_MESSAGE_SUCCESS,
  RECEIVE_MESSAGE_FAIL,
  POST_ADD_CHAT_SUCCESS,
  POST_ADD_CHAT_FAIL,
  PUT_UPDATE_CHAT_SUCCESS,
  PUT_UPDATE_CHAT_FAIL
} from "./actionTypes"

const INIT_STATE = {
  chats: [],
  groups: [],
  contacts: [],
  messages: [],
  error: [],
  loading: true,
  
}

const convertToDateTime = (str) => {
  // Converte a string "21-Nov-2023 23:45" em um objeto Date
  const parts = str.match(/(\d+)-(\w+)-(\d+)\s(\d+:\d+)/);
  const months = {
    'Jan': 'January', 'Fev': 'February', 'Mar': 'March', 'Abr': 'April', 'Mai': 'May', 'Jun': 'June',
    'Jul': 'July', 'Ago': 'August', 'Set': 'September', 'Out': 'October', 'Nov': 'November', 'Dez': 'December'
  };
  const month = months[parts[2]] || parts[2]; // Converte o mês para inglês, se necessário
  
  let date = new Date(`${month} ${parts[1]}, ${parts[3]} ${parts[4]}`);
  console.log(date)
  return new Date(`${month} ${parts[1]}, ${parts[3]} ${parts[4]}`);
}

const orderChatsByDate = (chats) =>  {
  return chats.sort((a, b) => convertToDateTime(b.lastMessage_timestamp) - convertToDateTime(a.lastMessage_timestamp));
}


const Calendar = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CHATS_SUCCESS:
  
      return {
        ...state,
        chats: orderChatsByDate(action.payload),
        loading: false,
      }

    case GET_CHATS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case GET_GROUPS_SUCCESS:
      return {
        ...state,
        groups: action.payload,
        
      }

    case GET_GROUPS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: action.payload,
      }

    case GET_CONTACTS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.payload,

      }

    case GET_MESSAGES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case POST_ADD_MESSAGE_SUCCESS: {
  // Cria uma cópia do array de chats
  const updatedChats = state.chats.map(chat => {
    // Encontra o chat correspondente e atualiza seu messagePot
    if (chat.phoneNumber === action.payload.phoneNumber) {
      return {
        ...chat,
        messagePot: [...chat.messagePot, action.payload]
      };
    }
    return chat;
  });

  // Retorna o estado atualizado
  return {
    ...state,
    chats: orderChatsByDate(updatedChats)
  };
}

    
    case POST_ADD_CHAT_SUCCESS: {
      
      for (const chatId in state.chats) {
        if (state.chats.hasOwnProperty(chatId)) {
          if (state.chats[chatId].phoneNumber == action.payload.phoneNumber) {
            console.log('mensagem nova em chat ', action.payload)
            state.chats[chatId].messagePot = [...action.payload.messagePot]
            state.chats[chatId].unreadMessages = action.payload.unreadMessages
            return {
              ...state,
              chats:orderChatsByDate([...state.chats])
            }
          }
        }
      }

      return {
        ...state,
        chats: orderChatsByDate([...state.chats , action.payload])

      }
    }
    case POST_ADD_CHAT_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case POST_ADD_MESSAGE_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    
    case PUT_UPDATE_CHAT_SUCCESS: { 
      const updatedChat = action.payload
      for (const chatId in state.chats) {
        if (state.chats.hasOwnProperty(chatId)) {
          if (state.chats[chatId].phoneNumber == updatedChat.phoneNumber) {
           state.chats[chatId] = {
                    ...state.chats[chatId], // mantém os campos existentes
                    ...updatedChat         // sobrescreve com os novos campos de updatedChat
                };
          }
  }
}
    const chats = [...state.chats]       
      return {
       
      
        ...state,
        chats: orderChatsByDate(chats)
      }
  }
    case PUT_UPDATE_CHAT_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case RECEIVE_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: [state.messages, action.payload]

      };
    
    case RECEIVE_MESSAGE_FAIL:
      return {
        ...state,
        error: action.payload
      };
    default:
      return {...state}
  }
}

export default Calendar
