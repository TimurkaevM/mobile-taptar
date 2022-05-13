import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Main from '../../components';
import { auth } from './redux/ducks/user';
import ViewScreen from '../../ViewScreen';

export default function AppRoutes() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const user = useSelector((state) => state.user.currentUser);
  const loadingAuth = useSelector((state) => state.user.loadingAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
  }, [dispatch]);

  let routes;

  if (isAuth && !user.length) {
    routes = (
      <Main />
      // <ViewScreen />
    );
  } else {
    routes = (
      <ViewScreen />
      // <Main />
    );
  }

  // if (loadingAuth) {
  //   return <PreloadAuth />;
  // }

  return (
      routes
  );
}
