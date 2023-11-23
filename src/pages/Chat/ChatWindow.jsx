import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row, Card } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { ChatContext } from "../../contexts/ChatContext";

const ChatWindow = () => {

  let lastDate = null;
  const {
    currentUser,
    currentMessage,
    onKeyPress,
    setCurrentMessage,
    setMessageBox,
    sendMessageToUser,
    currentChat,
    isLoadingMessages
  } = useContext(ChatContext);


  return (
    <div className="w-100 user-chat">
      <Card className="border_rounded">
        <div className="p-4 border-bottom" id='divHeader'>
          {currentChat && (
            <Row className='headerClass'>
              <Col md="4" xs="9">
                <h5 className="font-size-15 mb-1">{currentChat.name}</h5>
                <p className="text-muted mb-0">
                  <i
                    className={
                      currentChat.status === 'Active'
                        ? 'mdi mdi-circle text-success align-middle me-2'
                        : currentChat.status === 'intermediate'
                          ? 'mdi mdi-circle text-warning align-middle me-1'
                          : 'mdi mdi-circle align-middle me-1'
                    }
                  />
                  {currentChat.status}
                </p>
              </Col>
            </Row>
          )}
        </div>
        <div>
          <div className="chat-conversation p-3">
            <ul className="list-unstyled">
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
                              {msgTime}{' '}
                              <i className="bx bx-check-double align-middle me-1"></i>
                            </p>
                          </div>
                        </div>
                      </li>
                    </div>
                  );
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
                  disabled={!currentChat || !currentMessage || isLoadingMessages}
                  onClick={() => sendMessageToUser()}
                  className="btn1 border_rounded"
                >
                  {isLoadingMessages ? (
                    <span className="spinner-border spinner-border-sm"></span>
                  ) : (
                    <>
                      <span className="d-none d-sm-inline-block me-2">Send</span>
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
