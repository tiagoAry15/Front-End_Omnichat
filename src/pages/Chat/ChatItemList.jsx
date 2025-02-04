import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router
import PropTypes from 'prop-types';
const ChatItemList = (props) => {
  const { chat, userChatOpen, t, from } = props;
  return (

    <Link
      to="#"
      onClick={() => {
        userChatOpen(chat);
      }}
    >
      <div className="d-flex down">
        <div className="align-self-center me-3">
          <i
            className={
              chat.status === t("Active")
                ? "mdi mdi-circle text-success font-size-10"
                : chat.status === "intermediate"
                  ? "mdi mdi-circle text-warning font-size-10"
                  : "mdi mdi-circle font-size-10"
            }
          />
        </div>
        {chat.isImg ? (
          <div className="avatar-xs align-self-center me-3">
            <span className="avatar-title rounded-circle bg-primary bg-soft text-primary">
              {chat.profile}
            </span>
          </div>
        ) : (
          <div className="align-self-center me-3">
            <img
              src={from}
              className="rounded-circle avatar-xs"
              alt=""
            />
          </div>
        )}

        <div className="flex-grow-1 overflow-hidden">
          <div className="d-flex justify-content-between">
            <h5 className="text-truncate font-size-14 mb-1">
              {chat.name}
            </h5>
            {chat.messagePot && chat.messagePot.length > 0 && (

              <div className="font-size-11">{chat.lastMessage_timestamp.split(":").slice(0, 2).join(":")}</div>
            )}
          </div>

          {chat.messagePot && chat.messagePot.length > 0 && (
            <div className="d-flex justify-content-between">
              <p className="text-truncate mb-0">
                {chat.messagePot[chat.messagePot.length - 1].sender}: {chat.messagePot[chat.messagePot.length - 1].body}
              </p>
              {!chat.unreadMessages || chat.unreadMessages != 0 && (
                <div className="unread-message-count">
                  {chat.unreadMessages}
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </Link>
  );


};

ChatItemList.propTypes = {
  chat: PropTypes.shape({
    status: PropTypes.string.isRequired,
    isImg: PropTypes.bool,
    profile: PropTypes.string,
    name: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string,
    messagePot: PropTypes.arrayOf(PropTypes.shape({
      sender: PropTypes.string,
      body: PropTypes.string,
    })),
    lastMessage_timestamp: PropTypes.string,
    unreadMessages: PropTypes.number,
  }),
  userChatOpen: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  from: PropTypes.string,
};
export default ChatItemList;
