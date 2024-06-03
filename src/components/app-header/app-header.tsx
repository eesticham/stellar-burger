import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUserState } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const userState = useSelector(getUserState);
  return <AppHeaderUI userName={userState.user?.name} />;
};
