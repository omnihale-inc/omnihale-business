'use client';

import { useState } from 'react';

import SignUp from '@/components/SignUp';
import Login from '@/components/Login';
import { redirect } from 'next/navigation';

export default function AuthPage() {
  const [signUp, setSignUp] = useState<object>({
    name: '',
    address: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [login, setLogin] = useState<object>({
    email: '',
    password: '',
  });
  const [isUserSignUp, setIsUserSignUp] = useState(false);
  const isUserLogin = false;
  return isUserLogin ? (
    redirect('/')
  ) : !isUserSignUp ? (
    <SignUp
      fields={signUp}
      setFields={setSignUp}
      onUserSignUp={setIsUserSignUp}
    />
  ) : (
    <Login fields={login} setFields={setLogin} onUserSignUp={setIsUserSignUp} />
  );
}
