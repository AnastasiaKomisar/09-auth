'use client';

import { useEffect } from 'react';
import { getMe, checkSession } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  useEffect(() => {
    const fetchUser = async () => {

      const isAuthenticated = await checkSession();
      if (!isAuthenticated) {
        clearIsAuthenticated();
        return;
      } else {
        const user = await getMe();
        if (user) setUser(user);
      }
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated]);


  return <>{children}</>;
};
