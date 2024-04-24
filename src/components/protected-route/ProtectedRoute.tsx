import { useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Navigate } from 'react-router';
import { Preloader } from '../ui/preloader';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth = false
}: ProtectedRouteProps) => {
  // const location = useLocation();
  // const userData = useSelector((state) => state.userData);

  // if (!userData.isAuthChecked) {
  //   return <Preloader />;
  // }

  // console.log(`user:`, userData);
  // console.log(`onlyUnAuth:`, onlyUnAuth);

  // const isAuthenticated = userData.user.email != "" && userData.user.name != "";

  // if (!onlyUnAuth && !isAuthenticated ) {
  //   return <Navigate replace to='/login' state={{ from: location }} />;
  // }

  // if (onlyUnAuth && userData.user) {
  //   const from = location.state?.from || { pathname: '/' };
  //   return <Navigate replace to={from} />;
  // }
  // console.log(`onlyUnAuth[${onlyUnAuth}] && userData.user[${userData.user}] => ${onlyUnAuth && userData.user}`);

  // return children;
  const isAuthChecked = useSelector((store) => store.userData.isAuthChecked);
  const user = useSelector((store) => store.userData.user);
  const location = useLocation();
  
  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};