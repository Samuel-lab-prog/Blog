import { useEffect, useState } from 'react';

export default function useIsAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      const userInfoObject = JSON.parse(userInfo);
      if (userInfoObject.user?.id === 1) {
        setIsAdmin(true);
      }
    }
  }, []);
  return isAdmin;
}