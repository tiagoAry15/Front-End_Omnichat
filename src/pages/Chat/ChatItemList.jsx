import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router
import whatsappIcon from "../../assets/images/chat/whatsappIcon.png";
import instagramIcon from "../../assets/images/chat/MenssagerIcon.png";
const ChatItemList = (props) => {
  const { chat, userChatOpen, t } = props;
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
              src={chat.from === 'whatsapp' ? whatsappIcon : instagramIcon}
              className="rounded-circle avatar-xs"
              alt=""
            />
          </div>
        )}

        <div className="flex-grow-1 overflow-hidden">
          <h5 className="text-truncate font-size-14 mb-1">
            {chat.name} {chat.phoneNummber}
          </h5>

          {chat.messagePot && (
            <p className="text-truncate mb-0">
              {chat.messagePot[chat.messagePot.length -1].sender}: {chat.messagePot[chat.messagePot.length -1].body}
            </p>
          )}
        </div>
        <div className="flex overflow-hidden">
          {chat.messagePot && (
            <div className="font-size-11">{chat.messagePot[chat.messagePot.length -1].time}</div>
          )}
          {chat.unreadMessages != 0 && (
            <div className="unread-message-count">
              {chat.unreadMessages}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ChatItemList;
