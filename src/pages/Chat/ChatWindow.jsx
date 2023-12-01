import React, { useEffect ,useContext, useState } from 'react';
import PropTypes, { func } from 'prop-types';
import { useDispatch, useSelector } from "react-redux";

import { Button, Col, Row, Card } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { ChatContext } from "../../contexts/ChatContext";
import { MenuContext } from "../../contexts/MenuContext";

import { menuAPI, MenuAuthor } from '../../store/menu/api';
import cardapio from '../Menu/cardapio.json'

const ChatWindow = () => {

  const dispatch = useDispatch();
  
  const [cardapioMessage, setCardapioMessage] = useState("");
  const [actualMenu, setActualMenu] = useState("")

  useEffect(() => {
    // apenas carrega se o menu estiver vazio
    getMenuToMessage();

    // Outras possíveis dependências podem ser adicionadas se necessário
  }, []);

  
  const getMenuToMessage = async () => {
    try {
        const headers = {
            'Access-Control-Allow-Origin': '*' // Defina a origem correta
        };

        const response = await menuAPI.get(`/get_menu_by_author/${MenuAuthor}`);
        console.log(response.data);
        setActualMenu(response.data)
        return response.data ? response.data : [];
    } catch (error) {
        error.message = "Erro na comunicação com o servidor ao obter cardápio";
        throw error;
    }
}

const loadMenu = () => {
  dispatch(getMenuToMessage())
  console.log('carregar menu')
}

  function updateMenu() {
    
    const pizzaStrings = actualMenu.Pizzas.map(pizza => `Sabor: ${pizza.nome} - tamanho: ${pizza.tamanho} - preço: ${pizza.preço} \n`);
    setCardapioMessage(pizzaStrings.join('\n'));
  }

  function sendMenu(){
    updateMenu()
    console.log(cardapioMessage)
  }

  let lastDate = null;
  const {
    currentPhoneNumber,
    ChatBoxUsername,
    Chat_Box_User_Status,
    currentUser,
    messages,
    currentMessage,
    onKeyPress,
    setCurrentMessage,
    setMessageBox,
    sendMessageToUser,
    booleanName,
    chatStatus,
    setChatStatus
  } = useContext(ChatContext);



  return (
    <div className="w-100 user-chat">
      <Card className="border_rounded">
        <div className="p-4 border-bottom" id='divHeader'>
        <button onClick={sendMenu}>cardapio</button>
        <p>{cardapioMessage}</p>
          {currentPhoneNumber && (
            <div className='headerClass'>
              <Col md="4" xs="9">
                <h5 className="font-size-15 mb-1">{ChatBoxUsername}</h5>
                <p className="text-muted mb-0">
                  <i
                    className={
                      Chat_Box_User_Status === 'Active'
                        ? 'mdi mdi-circle text-success align-middle me-2'
                        : Chat_Box_User_Status === 'intermediate'
                          ? 'mdi mdi-circle text-warning align-middle me-1'
                          : 'mdi mdi-circle align-middle me-1'
                    }
                  />
                  {Chat_Box_User_Status}
                </p>
              </Col>
              <div className='divChatStatus'>
                <div>
                <h1>Bot status: </h1>
                <h1 className={
                      chatStatus === true
                        ? 'mdi mdi-circle text-success align-middle me-2'
                        :'mdi mdi-circle text-warning align-middle me-1'
                    }>{booleanName[chatStatus]}</h1>
                </div>
                {chatStatus === false ?
                  <Button
                  color="primary"
                  onClick={() => {setChatStatus(true)}}
                  className="btn1 border_rounded"
                >
                  <span className="d-none d-sm-inline-block me-2">Ativar</span>{' '}
                </Button>
                  :
                  <Button
                  color="primary"
                  onClick={() => {setChatStatus(false)}}
                  className="btn1 border_rounded"
                >
                  <span className="d-none d-sm-inline-block me-2">Desativar</span>{' '}
                </Button>
                }


              </div>
            </div>
          )}
        </div>
        <div>
          <div className="chat-conversation p-3">
            <ul className="list-unstyled">
              <PerfectScrollbar
                style={{ height: '55vh' }}
                containerRef={(ref) => setMessageBox(ref)}
              >
                <li>
                  <div className="chat-day-title">
                    <span className="title">Today</span>
                  </div>
                </li>
                {messages &&
                  messages.length > 0 &&
                  messages.map((message) => {
                    if (message.phoneNumber === currentPhoneNumber) {
                      return (
                        <li
                          key={'test_k' + message.id}
                          className={
                            message.sender === currentUser.name ||
                              message.sender === 'ChatBot'
                              ? 'right'
                              : 'left'
                          }
                        >
                          <div className="conversation-list">
                            <div className="ctext-wrap">
                              <div className="conversation-name">
                                {message.sender}
                              </div>
                              <p>{message.body}</p>
                              <p className="chat-time mb-0">
                                {message.time}{' '}
                                <i className="bx bx-check-double align-middle me-1"></i>
                              </p>
                            </div>
                          </div>
                        </li>
                      );
                    } else {
                      return null;
                    }
                  })}
              </PerfectScrollbar>
            </ul>
          </div>
          <div className="p-3 chat-input-section">
            <Row>
              <Col>
                <div className="position-relative">
                  <input
                    type="text"
                    value={currentMessage}
                    onKeyPress={onKeyPress}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    className="form-control chat-input"
                    placeholder="Enter a message"
                  />
                </div>
              </Col>
              <Col className="col-auto">
                <Button
                  color="primary"
                  disabled={!currentPhoneNumber}
                  onClick={() => addMessage(currentMessage)}
                  className="btn1 border_rounded"
                >
                  <span className="d-none d-sm-inline-block me-2">Send</span>{' '}
                  <i className="mdi mdi-send" />
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </Card>
    </div>
  );
};

ChatWindow.propTypes = {
  currentPhoneNumber: PropTypes.string,
  chatBoxUsername: PropTypes.string,
  Chat_Box_User_Status: PropTypes.string,
  currentUser: PropTypes.object,
  messages: PropTypes.array,
  currentMessage: PropTypes.string,
  onKeyPress: PropTypes.func,
  setCurrentMessage: PropTypes.func,
  socket: PropTypes.object,
  addMessage: PropTypes.func,
};

export default ChatWindow;
