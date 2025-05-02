const Conversation = () => {
  return (
    <>
      <div className={"flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer"}>
        <div className={`avatar`}>
          <div className='w-12 rounded-full'>
            picture
          </div>
        </div>

        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between'>
            <p className='font-bold text-gray-200'>fullname</p>
            <span className='text-xl'>emoji</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Conversation;