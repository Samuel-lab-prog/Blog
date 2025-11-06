import { useEffect, useState } from 'react';

export default function useIsAdmin() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  useEffect(() => {
    try {
      fetch('http://localhost:5000/users/auth', {
        method: 'GET',
        credentials: 'include',
      })
        .then((response) => {
          if (response.status === 204) {
            setIsAdmin(true);
          }
        })
        .catch((error) => {
          console.error('Error fetching admin status:', error);
        });
    } catch (error) {
      console.error('Error:', error);
    }
  }, []);
  return isAdmin;
}
