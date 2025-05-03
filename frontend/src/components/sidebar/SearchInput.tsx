import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import useConversation from "../../store/useConversation";
import useGetConversations from "../../hooks/useGetConversations";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("No such user found!");
  };

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
      <input
        type='text'
        placeholder='Search conversations…'
        className='
      flex-1 
      px-4 
      py-2 
      text-sm 
      border 
      border-gray-300 
      rounded-full 
      bg-white 
      text-gray-900 
      placeholder-gray-500
      focus:outline-none 
      focus:border-gray-500 
      focus:ring-1 
      focus:ring-gray-400
      transition-colors
    '
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        type='submit'
        className='
      w-10 
      h-10 
      flex 
      items-center 
      justify-center 
      rounded-full 
      border 
      border-gray-300 
      bg-gray-800 
      text-gray-50
      hover:bg-gray-900
      transition-colors
      focus:outline-none 
      focus:ring-1 
      focus:ring-gray-400
    '
      >
        <IoSearchSharp className='w-5 h-5 cursor-pointer' />
      </button>
    </form>
  );
};

export default SearchInput;