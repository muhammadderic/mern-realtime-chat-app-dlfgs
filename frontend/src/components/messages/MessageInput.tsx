import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const { loading, sendMessage } = useSendMessage();
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message.trim()) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <form className='px-4 my-3' onSubmit={handleSubmit}>
      <div className='w-full relative'>
        <input
          type='text'
          className={`
        border 
        text-sm 
        rounded 
        block 
        w-full 
        p-2.5  
        pr-10
        bg-white 
        border-gray-300 
        text-gray-900
        font-normal
        focus:outline-none
        focus:border-gray-600
        focus:shadow-sm
        placeholder-gray-500
        transition-colors
      `}
          placeholder='Send a message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          type='submit'
          className={`
        absolute 
        inset-y-0 
        end-0 
        flex 
        items-center 
        pe-3
        ${!message.trim() || loading
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-800 hover:text-gray-900 hover:bg-gray-100'
            }
        w-10
        justify-center
        rounded-r
        transition-all
      `}
          disabled={!message.trim() || loading}
        >
          {loading ? (
            <div className='loading loading-spinner'></div>
          ) : (
            <BsSend className='w-5 h-5' />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;