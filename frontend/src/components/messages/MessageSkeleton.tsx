const MessageSkeleton = () => {
  return (
    <>
      {/* Receiver skeleton with bubble */}
      <div className='chat chat-start px-4 mb-4'>
        <div className='chat-image avatar'>
          <div className='skeleton w-10 h-10 rounded-full shrink-0 bg-gray-300 animate-pulse'></div>
        </div>
        <div className='flex flex-col max-w-[70%]'>
          <div className='chat-bubble bg-gray-200 animate-pulse p-3'>
            <div className='skeleton h-4 w-48 bg-gray-300 animate-pulse rounded mb-1'></div>
            <div className='skeleton h-4 w-40 bg-gray-300 animate-pulse rounded'></div>
          </div>
          <div className='skeleton h-3 w-16 bg-gray-200 animate-pulse rounded mt-1'></div>
        </div>
      </div>

      {/* Sender skeleton with bubble */}
      <div className='chat chat-end px-4 mb-4'>
        <div className='flex flex-col max-w-[70%]'>
          <div className='chat-bubble bg-gray-300 animate-pulse p-3'>
            <div className='skeleton h-4 w-44 bg-gray-400 animate-pulse rounded'></div>
          </div>
          <div className='skeleton h-3 w-16 bg-gray-200 animate-pulse rounded mt-1 ml-auto'></div>
        </div>
        <div className='chat-image avatar'>
          <div className='skeleton w-10 h-10 rounded-full shrink-0 bg-gray-300 animate-pulse'></div>
        </div>
      </div>
    </>
  );
};

export default MessageSkeleton;
