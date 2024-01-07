import { useMutation } from '@tanstack/react-query';
import { Button, FloatingLabel } from 'flowbite-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import authApi from 'src/apis/auth.api';
import UITBackground from 'src/assets/imgs/uit-background.jpg';
import { useAppContext } from 'src/contexts/app.contexts';
import { setAccessTokenToLS, setProfileToLS } from './../../utils/auth';

interface Props {
  userRole: string;
}
export default function Login({ userRole }: Props) {
  const [username, setUsername] = useState(
    userRole === 'nv' ? 'admin' : '4825a65737'
  );
  const [password, setPassword] = useState(
    userRole === 'nv' ? 'admin' : '2c5c4aec05'
  );
  const { setIsAuthenticated } = useAppContext();

  const loginMutation = useMutation({
    mutationFn: () => authApi.login(username, password, userRole),
    onSuccess: data => {
      console.log(data);
      setAccessTokenToLS(data.data.accessToken);
      setProfileToLS({ userId: data.data.userId, role: userRole });
      setIsAuthenticated(true);
      toast.success('Đăng nhập thành công');
    },
    onError: () => {
      toast.error('Đăng nhập thất bại');
    }
  });

  const handleLogin = () => {
    loginMutation.mutate();
  };
  return (
    <form className='flex flex-col bg-sidebar lg:flex-row'>
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
            <FloatingLabel
              variant='outlined'
              value={username}
              onChange={e => setUsername(e.target.value)}
              label='Tên đăng nhập'
            />
          </div>
          <div className='mt-4'>
            <FloatingLabel
              variant='outlined'
              value={password}
              type='password'
              onChange={e => setPassword(e.target.value)}
              label='Mật khẩu'
            />
          </div>
          <div id='btnLoginContainer' className='mt-4 text-center'>
            <Button fullSized color='failure' onClick={handleLogin}>
              Đăng nhập
            </Button>
          </div>
          <a href='forgotPass' className='small m-0 mt-3 block text-center'>
            Quên mật khẩu ?
          </a>
        </div>
      </div>
    </form>
  );
}
