import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Splash from '../screens/Splash';
import TweetDetail from '../components/TweetDetail';
import NotFound from '../components/NotFound';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Splash />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/tweets/:id",
        element: <TweetDetail />,
      },
      {
        path: '*',
        element: <NotFound />
      }
    ],
  },
]);
