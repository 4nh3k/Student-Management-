import UITBackground from 'src/assets/imgs/uit-background.jpg';
import Button from 'src/components/Button';
import Input from 'src/components/Input/Input';
export default function Login() {
  return (
    <div className='flex bg-sidebar'>
      <div id='background-container' className='w-1/3'>
        <img
          src={UITBackground}
          className='h-screen w-full'
          alt='uni-background'
        ></img>
      </div>
      <div
        id='login-form'
        className='mb-auto ml-auto mr-auto mt-auto flex flex-col space-y-5'
      >
        <span className='title text-center text-white'>Login</span>
        <div id='login-container' className='rounded-xl bg-white px-10 py-10'>
          <Input placeholder='Nhập tên đăng nhập'></Input>
          <Input placeholder='Nhập mật khẩu'></Input>
          <div id='btnLoginContainer' className='mt-0 text-center'>
            <Button children={<span>Đăng nhập</span>}></Button>
          </div>
          <a href='forgotPass' className='small m-0 mt-3 block text-center'>
            Quên mật khẩu ?
          </a>
        </div>
      </div>
    </div>
  );
}
