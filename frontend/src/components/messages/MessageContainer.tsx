import { useEffect } from "react";
import useConversation from "../../store/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    // cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className='md:min-w-[450px] flex flex-col h-full border-l border-gray-200'>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className='bg-gray-50 border border-gray-300 px-4 py-3 mb-4'>
            <div className='flex items-center gap-2'>
              <span className='text-gray-600 font-medium text-sm'>To:</span>
              <span className='text-gray-900 font-semibold'>{selectedConversation.fullName}</span>
            </div>
          </div>
          <div className='flex-1 overflow-y-auto'>
            <Messages />
          </div>
          <div className='border-t border-gray-300'>
            <MessageInput />
          </div>
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className='flex items-center justify-center w-full h-full bg-gray-50 border border-gray-300'>
      <div className='max-w-md px-6 text-center'>
        <div className='mb-6'>
          <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 border border-gray-300 mb-4'>
            <TiMessages className='text-3xl text-gray-600' />
          </div>
          <h3 className='text-gray-900 font-semibold text-xl mb-2'>Welcome back, {authUser.fullName}</h3>
          <p className='text-gray-600 font-normal text-base'>Select a conversation from the sidebar to start messaging</p>
        </div>
        <div className='border-t border-gray-300 pt-6'>
          <p className='text-gray-500 text-sm font-medium'>Messages are end-to-end encrypted</p>
        </div>
      </div>
    </div>
  );
};