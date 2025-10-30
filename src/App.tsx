import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import AnimatedOutlet from './components/AnimatedOutlet';
import hamburgerIcon from './assets/hamburgerIcon.svg';

const navbarProps = {
  brandName: 'The blog',
  links: [
    { label: 'Home', to: '/' }, 
    { label: 'About Me', to: '/about' },
    { label: 'Posts', to: '/posts' },
    { label: 'Contact Me', to: '/contact' },
    { label: 'Login', to: '/signin' },
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
      {
        index: true,
        element: <HomePage />,
      },

    ],
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/signin',
    element: <SigninPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
