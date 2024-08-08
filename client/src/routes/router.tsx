import {createBrowserRouter, createRoutesFromElements, Outlet, Route} from 'react-router-dom';

import {EmptyNotFound} from 'components';
import {MainLayout} from 'layouts';

import Login from 'pages/Login/Login';
import Home from 'pages/Home/Home';
import Single from 'pages/Single/Single';
import Write from 'pages/Write/Write';
import Register from 'pages/Register/Register';

import paths from './paths';

const route = createRoutesFromElements(
  <>
    <Route path={paths.login.template} element={<Login />} />
    <Route path={paths.register.template} element={<Register />} />
    <Route
      element={
        <MainLayout>
          <Outlet />
        </MainLayout>
      }
      errorElement={<EmptyNotFound />}
    >
      <Route path={paths.home.template} element={<Home />} />
      <Route path={paths.single.template} element={<Single />} />
      <Route path={paths.write.template} element={<Write />} />
    </Route>
  </>,
);

const router = createBrowserRouter(route);

export default router;
