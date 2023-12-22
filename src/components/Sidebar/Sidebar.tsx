import { Link } from 'react-router-dom';
import logo from 'src/assets/icons/UITLogo.svg';
import hamburger from 'src/assets/icons/hamburger.svg';
import arrowRight from 'src/assets/icons/arrow-right.svg';
import SidebarItem from './SidebarItem/SidebarItem';
interface SidebarProp {
  isAdmin: boolean;
}

const Sidebar: React.FC<SidebarProp> = ({ isAdmin = false }) => {
  return (
    <div className='fixed bottom-0 left-0 top-0 w-24 bg-sidebar shadow lg:w-40'>
      <div className='flex flex-col items-center justify-center'>
        <div className='flex w-full justify-between bg-gray-300 pb-2 pt-2 '>
          <img src={logo} alt='logo' className='ml-3 h-[2.5rem] w-[2.5rem]' />
          <button>
            <img
              src={hamburger}
              alt='hamburger'
              className='mr-3 h-[1rem] w-[1rem]'
            />
          </button>
        </div>
        <ul className='flex flex-col gap-[0.1rem] space-y-2 text-white'>
          <SidebarItem
            iconSrc={hamburger}
            label='Bảng điều khiển'
            isDropdown={false}
          ></SidebarItem>
          <SidebarItem
            iconSrc={hamburger}
            label='Sinh viên'
            isDropdown={true}
          ></SidebarItem>
          <SidebarItem
            iconSrc={hamburger}
            label='Giảng viên'
            isDropdown={true}
          ></SidebarItem>
          <SidebarItem
            iconSrc={hamburger}
            label='Môn học'
            isDropdown={true}
          ></SidebarItem>
          <SidebarItem
            iconSrc={hamburger}
            label='Tùy chỉnh'
            isDropdown={true}
          ></SidebarItem>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
