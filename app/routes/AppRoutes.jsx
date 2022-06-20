import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../redux/ducks/user';
import EntranceRoutes from './EntranceRoutes';
import ContentRoutes from './ContentRoutes';

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
    routes = <ContentRoutes />;
  } else {
    routes = <EntranceRoutes />;
  }

  // if (loadingAuth) {
  //   return <PreloadAuth />;
  // }

  return routes;
}
