import Conversations from "./Conversations";
import LogoutButton from "./LogoutBtn";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  return (
    <div className='border border-gray-300 p-4 flex flex-col bg-gray-50 h-full'>
      <SearchInput />
      <div className='divider h-px bg-gray-300 my-4'></div>
      <Conversations />
      <LogoutButton />
    </div>
  );
};
export default Sidebar;