import { useRouter } from 'next/dist/client/router';
import { FC } from 'react';

import { useAuth } from '../hooks/useAuth';

export const SignOutButton: FC = () => {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.push('/auth/login');
  };

  return (
    <button type="button" onClick={handleSignOut}>sair</button>
  );
};
