import { useEffect, useRef } from "react";

import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
import Message from "./Message";
import MessageSkeleton from "./MessageSkeleton";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  // Properly type the ref for a DOM element
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!loading && messages.length > 0 && messages.map((message, index) => (
        <div
          key={message._id || `msg-${index}-${message.createdAt}`} // Fallback key
          ref={lastMessageRef}
        >
          <Message messageData={message} />
        </div>
      ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;