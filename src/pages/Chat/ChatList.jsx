import React, { useContext } from 'react';
import { TabContent, TabPane, Spinner } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ChatItemList from './ChatItemList';
import { ChatContext } from "../../contexts/ChatContext";

const ChatList = (props) => {
  const { activeTab, chats, currentPhoneNumber, userChatOpen, social_icons, isLoading } = useContext(ChatContext);

  return (
    <div className="chat-leftsidebar-nav">
      <TabContent activeTab={activeTab} className="py-4">
        <TabPane tabId="1">
          <div>
            <h5 className="font-size-14 mb-3">{props.t("Recent")}</h5>
            <ul className="list-unstyled chat-list" id="recent-list">
              <PerfectScrollbar style={{ height: "410px" }}>
                {isLoading ? (
                  <div className="loading-container" style={{ display: "flex" }}>
                    <Spinner style={{ width: '1rem', height: '1rem' }} />
                    <p className="loading-container-text">carregando conversas</p>
                  </div>
                ) : !chats ? (
                  <div className="error-message">
                    <p className="error-message-text">An error occurred while loading chats</p>
                  </div>
                ) : chats.length === 0 ? (
                  <p>{props.t("NoChats")}</p>
                ) : (
                  chats.map(chat => {
                    const chat_from = Array.isArray(chat.from) ? chat.from[0].toLowerCase() : chat.from.toLowerCase();

                    return (
                      <li
                        key={chat.id + chat.phoneNumber}
                        className={`li-max-width ${currentPhoneNumber === chat.phoneNumber ? props.t("Active") : ""}`}
                      >
                        <ChatItemList chat={chat} userChatOpen={userChatOpen} t={props.t} from={social_icons[chat_from]} />
                      </li>
                    );
                  })
                )}
              </PerfectScrollbar>
            </ul>
          </div>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default ChatList;
