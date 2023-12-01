import React, { useEffect, useContext, useState } from 'react';
import PropTypes, { func } from 'prop-types';
import { useDispatch, useSelector } from "react-redux";

import { Button, Col, Row, Card } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { ChatContext } from "../../contexts/ChatContext";
import { MenuContext } from "../../contexts/MenuContext";

import { menuAPI, MenuAuthor } from '../../store/menu/api';
import cardapio from '../Menu/cardapio.json'

const ChatWindow = ({ t }) => {

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

  function sendMenu() {
    updateMenu()
    console.log(cardapioMessage)
  }

  let lastDate = null;
  const {
    currentUser,
    messages,
    currentMessage,
    onKeyPress,
    setCurrentMessage,
    setMessageBox,
    sendMessageToUser,
    currentChat,
    isLoadingMessages,
    booleanName,
    chatStatus,
    setChatStatus
  } = useContext(ChatContext);



  return (
    <div className="w-100 user-chat">
      <Card className="border">
        <div className="p-4 border-bottom" id='divHeader'>
          {
            /* 
            <button onClick={sendMenu}>cardapio</button>
            <p>{cardapioMessage}</p> 
            */
          }
          {currentChat && (
            <div className="headerClass">
              <div >
                <h5 className="font-size-15 mb-1">{currentChat.name}</h5>
                <p className="text-muted mb-0 d-flex align-items-center">

                  {currentChat.phoneNumber}
                </p>
              </div>
              <div className="d-flex align-items-center">
                <div className="d-flex flex-column align-items-center me-3">
                  <p className="mb-0">Bot status:</p>
                  <div className="d-flex align-items-center">
                    <i
                      className={
                        currentChat.isBotActive === true
                          ? 'mdi mdi-circle text-success align-middle me-2'
                          : 'mdi mdi-circle text-warning align-middle me-1'
                      }
                    />
                    <p className="mb-0">{t(booleanName[currentChat.isBotActive])}</p>
                  </div>
                </div>
                <Button
                  color="primary"
                  onClick={() => { setChatStatus(!chatStatus) }}

                >
                  {currentChat.isBotActive ? t("deactivate") : t("activate")}
                </Button>
              </div>
            </div>


          )}
        </div>
        <div>
          <div className="chat-conversation p-3">
            <ul className="list-unstyled margin-bottom-0">
              <PerfectScrollbar
                style={{ height: '55vh' }}
                containerRef={(ref) => setMessageBox(ref)}
              >
                {currentChat && currentChat.messagePot && currentChat.messagePot.map((message, index) => {
                  let [msgDate, msgTime] = message.timestamp.split(' ');
                  const messageDate = new Date(msgDate).toDateString();

                  let dateHeader = null;
                  if (index === 0 || messageDate !== lastDate) {
                    dateHeader = (
                      <li key={'date_' + index + message.id}>
                        <div className="chat-day-title">
                          <span className="title">{messageDate}</span>
                        </div>
                      </li>
                    );
                    lastDate = messageDate;
                  }

                  // Atualize a última data conhecida
                  // Supondo que 'lastDate' seja atualizado corretamente

                  return (
                    <div key={'message_body ' + index}>
                      {dateHeader}
                      <li
                        key={'test_k' + index}
                        className={
                          message.sender === currentUser.email.split('@')[0] ||
                            message.sender === 'Bot' ||
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
                              {msgTime.split(":").slice(0, 2).join(":")}{' '}
                              <i className="bx bx-check-double align-middle me-1"></i>
                            </p>
                          </div>
                        </div>
                      </li>
                    </div>
                  );
                  // Certifique-se de que o fechamento das tags está correto
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
                    placeholder={t("EnterMessage")}
                  />
                </div>
              </Col>
              <Col className="col-auto">
                <Button
                  color="primary"
                  disabled={!currentChat || !currentMessage || isLoadingMessages}
                  onClick={() => sendMessageToUser()}
                  className="btn1 border_rounded"
                >
                  {isLoadingMessages ? (
                    <span className="spinner-border spinner-border-sm"></span>
                  ) : (
                    <>
                      <span className="d-none d-sm-inline-block me-2">{t("Send")}</span>
                      <i className="mdi mdi-send" />
                    </>
                  )}

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

  currentUser: PropTypes.object,
  messages: PropTypes.array,
  currentMessage: PropTypes.string,
  onKeyPress: PropTypes.func,
  setCurrentMessage: PropTypes.func,
  socket: PropTypes.object,
  addMessage: PropTypes.func,
};

export default ChatWindow;
