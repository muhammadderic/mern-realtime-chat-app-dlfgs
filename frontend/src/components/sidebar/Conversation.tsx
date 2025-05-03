import { useState } from "react";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../store/useConversation";
import type { ConversationUser } from "../../types/types";

interface ConversationProps {
  conversation: ConversationUser;
  lastIdx: boolean;
  emoji: string;
}

const Conversation = ({ conversation, lastIdx, emoji }: ConversationProps) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [imgError, setImgError] = useState(false);

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isSelected ? "bg-sky-500" : ""}`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className='w-12 rounded-full'>
            {imgError ? (
              // Fallback avatar - using user's initials
              <div className='w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold'>
                {conversation.fullName.charAt(0)}
              </div>
            ) : (
              <img
                src={conversation.profilePic}
                alt='user avatar'
                onError={() => setImgError(true)}
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
          </div>
        </div>

        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between'>
            <p className='font-bold'>{conversation.fullName}</p>
            <span className='text-xl'>{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className='divider my-0 py-0 h-1' />}
    </>
  );
};

export default Conversation;