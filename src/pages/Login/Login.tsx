import { Button, FloatingLabel } from 'flowbite-react';
import UITBackground from 'src/assets/imgs/uit-background.jpg';
export default function Login() {
  return (
    <div className='flex flex-col bg-sidebar lg:flex-row'>
      <div id='background-container' className='w-full lg:w-1/3'>
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
        <div
          id='login-container'
          className='w-80 rounded-xl bg-white px-10 py-10'
        >
          <div className='mt-2'>
            <FloatingLabel variant='outlined' label='Tên đăng nhập' />
          </div>
          <div className='mt-4'>
            <FloatingLabel variant='outlined' label='Mật khẩu' />
          </div>
          <div id='btnLoginContainer' className='mt-4 text-center'>
            <Button fullSized color='failure'>
              Đăng nhập
            </Button>
          </div>
          <a href='forgotPass' className='small m-0 mt-3 block text-center'>
            Quên mật khẩu ?
          </a>
        </div>
      </div>
    </div>
  );
}
