import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/LoginPage';
import PostPage from './pages/PostPage';
import AllPostsPage from './pages/AllPostsPage';
import AdminPage from './pages/AdminPage';

import Navbar from './components/Navbar';
import useIsAdmin from './hooks/useIsAdmin';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import AnimatedOutlet from './components/AnimatedOutlet';
import hamburgerIcon from './assets/hamburgerIcon.svg';

export default function App() {
  const isAdmin = useIsAdmin();

  const navbarProps = {
    brandName: 'The blog',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Posts', to: '/posts' },
      { label: 'Login', to: '/login' },
      ...(isAdmin ? [{ label: 'Admin', to: '/admin' }] : []),
    ],
    dropdownIconSrc: hamburgerIcon,
  };

  const router = createBrowserRouter([
    {
      path: '/',
      errorElement: <ErrorPage />,
      element: (
        <>
          <Navbar {...navbarProps} />
          <ScrollToTop />
          <AnimatedOutlet />
        </>
      ),
      children: [
        { index: true, element: <HomePage /> },
        { path: 'posts/:slug', element: <PostPage /> },
        { path: 'signup', element: <SignupPage /> },
        { path: 'login', element: <SigninPage /> },
        { path: 'posts', element: <AllPostsPage /> },
        {
          path: 'admin',
          element: <ProtectedRoute />,
          children: [{ index: true, element: <AdminPage /> }],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
