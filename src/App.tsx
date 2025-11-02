import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import PostSubmitPage from './pages/PostSubmitPage';
import PostPage from './pages/PostPage';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import AnimatedOutlet from './components/AnimatedOutlet';
import useIsAdmin from './hooks/useIsAdmin';
import hamburgerIcon from './assets/hamburgerIcon.svg';

export default function App() {
  const isAdmin = useIsAdmin();

  const navbarProps = {
    brandName: 'The blog',
    links: [
      { label: 'Home', to: '/' },
      { label: 'About', to: '/about' },
      { label: 'Posts', to: '/posts' },
      { label: 'Contact', to: '/contact' },
      { label: 'Login', to: '/signin' },
      ...(isAdmin ? [{ label: 'Submit', to: '/submit' }] : []),
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
        { path: '/submit', element: <PostSubmitPage /> },
        { path: 'posts/:slug', element: <PostPage /> },
      ],
    },
    { path: '/signup', element: <SignupPage /> },
    { path: '/signin', element: <SigninPage /> },
  ]);

  return <RouterProvider router={router} />;
}
