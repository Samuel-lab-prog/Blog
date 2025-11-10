import { useEffect, useState } from 'react';
const API_URL = import.meta.env.VITE_API_URL;

export default function useIsAdmin() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  useEffect(() => {
    let canceled = false;

    async function checkAdmin() {
      try {
        const res = await fetch(`${API_URL}/users/auth`, {
          credentials: 'include',
        });
        const data = await res.json().catch(() => ({}));
        console.log('Dados recebidos:', data.isAdmin);

        if (!canceled) {
          setIsAdmin(Boolean(data.isAdmin));
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        if (!canceled) setIsAdmin(false);
      }
    }

    checkAdmin();

    return () => {
      canceled = true;
    };
  }, []);

  return isAdmin;
}
