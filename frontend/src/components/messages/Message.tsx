import { useAuthContext } from "../../context/AuthContext";
import type { Message as MessageType } from "../../types/types";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../store/useConversation";

interface MessageProps {
  messageData: MessageType;
}

const Message = ({ messageData }: MessageProps) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = messageData.senderId === authUser._id;
  const formattedTime = extractTime(messageData.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;

  // Monochrome styles
  const bubbleBgColor = fromMe ? "bg-gray-800" : "bg-gray-100";
  const bubbleTextColor = fromMe ? "text-gray-50" : "text-gray-900";
  const bubbleBorder = fromMe ? "" : "border border-gray-300";
  const shakeClass = messageData.shouldShake ? "shake" : "";

  const ProfileImage = () => (
    <div className='chat-image avatar'>
      <div className='w-10 rounded-full overflow-hidden border border-gray-300'>
        <img
          alt={fromMe ? 'Your Profile' : 'Profile'}
          src={profilePic}
        />
      </div>
    </div>
  );

  return (
    <div className={`chat ${chatClassName} px-4`}>
      {/* Profile Picture on left for receiver */}
      {!fromMe && <ProfileImage />}

      {/* Message Content Container */}
      <div className="message-content flex flex-col max-w-[70%]">
        <div className={`
          chat-bubble 
          ${bubbleBgColor} 
          ${bubbleTextColor} 
          ${bubbleBorder}
          ${shakeClass} 
          pb-2
          rounded
          shadow-none
          font-normal
          min-w-[60px]
        `}>
          {messageData.message}
        </div>

        {/* Timestamp at bottom of message */}
        <div className={`
          chat-footer 
          text-gray-500 
          text-xs 
          flex 
          gap-1 
          items-center 
          font-medium
          ${fromMe ? 'justify-end' : 'justify-start'}
        `}>
          {formattedTime}
        </div>
      </div>

      {/* Profile Picture on right for sender */}
      {fromMe && <ProfileImage />}
    </div>
  );
};

export default Message;
