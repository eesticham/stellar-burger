import { FC, FormEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { login } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.userData.error);
  const user = useSelector((state) => state.userData.user);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(
      login({
        email: email,
        password: password
      })
    );

    if (!error && user) {
      navigate('/'); // Redirect to home page
    }
  };

  return (
    <LoginUI
      errorText={error!}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
