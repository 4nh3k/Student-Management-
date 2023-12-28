import { Avatar, Dropdown } from 'flowbite-react';

interface HeaderProps {
  user_img?: string;
  user_name?: string;
}

const Header = ({ user_img, user_name }: HeaderProps) => {
  return (
    <div className='flex items-center justify-end bg-white pb-4 pr-2 pt-4 align-middle shadow-lg'>
      <Dropdown
        label={<Avatar img={user_img} alt={`avatar of ${user_name}`} rounded />}
        inline
      >
        <Dropdown.Item>Dashboard</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Earnings</Dropdown.Item>
        <Dropdown.Item>Sign out</Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default Header;
