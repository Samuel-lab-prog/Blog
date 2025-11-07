import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import PostPage from './pages/PostPage';
import AllPostsPage from './pages/AllPostsPage';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import AnimatedOutlet from './components/AnimatedOutlet';
import useIsAdmin from './hooks/useIsAdmin';
import hamburgerIcon from './assets/hamburgerIcon.svg';
import AdminPage from './pages/AdminPage';

export default function App() {
  const isAdmin = useIsAdmin();

  const navbarProps = {
    brandName: 'The blog',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Sobre', to: '/about' },
      { label: 'Posts', to: '/posts' },
      { label: 'Contato', to: '/contact' },
      { label: 'Login', to: '/signin' },
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
        { path: '/admin', element: <AdminPage /> },
        { path: 'posts/:slug', element: <PostPage /> },
        { path: '/signup', element: <SignupPage /> },
        { path: '/signin', element: <SigninPage /> },
        { path: '/posts', element: <AllPostsPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
