import { AnimatePresence, motion } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';

export default function AnimatedOutlet() {
  const location = useLocation();

  return (
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='relative w-full h-full'
        >
          <Outlet />
        </motion.div >
      </AnimatePresence>
  );
}
