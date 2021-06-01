import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { ErrorMessagesAlert } from '../../components/ErrorMessagesAlert';
import { InputBlock } from '../../components/InputBlock';
import { SubmitButton } from '../../components/LoadingButton';
import { Logo } from '../../components/Logo';
import { useAuth } from '../../hooks/useAuth';
import api from '../../lib/api';

interface FormValues {
  email: string;
  password: string;
  remember: boolean;
}

interface LoginResponse {
  token: string
  user: {
    name: string
    email: string
  }
}

const formSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

export default function LoginPage() {
  const { signIn } = useAuth();
  const router = useRouter();

  const form = useForm<FormValues>({ resolver: yupResolver(formSchema) });
  const [errorMessages, setErrorMessages] = useState([]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const { token, user } = await api.post<LoginResponse>('/auth/login', data)
        .then((response) => response.data);

      signIn(token, user);
      router.push('/');
    } catch (e) {
      setErrorMessages(e.response?.data?.message || []);
    }
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Logo />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to talk
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link href="/auth/register">
            <a className="font-medium text-indigo-600 hover:text-indigo-500">
              create an account
            </a>
          </Link>{' '}
          if you are new here
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <ErrorMessagesAlert messages={errorMessages} />

              <InputBlock labelText="Email address" type="email" name="email" />
              <InputBlock labelText="Password" type="password" name="password" />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    {...form.register('remember')}
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">Remember me</label>
                </div>
              </div>

              <div className="w-full">
                <SubmitButton isLoading={form.formState.isSubmitting} text="Sign in" loadingText="Signing in" />
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
}
