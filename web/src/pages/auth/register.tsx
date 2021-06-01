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
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string
}

interface RegisterResponse {
  token: string
  user: {
    name: string
    email: string
  }
}

const formSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  passwordConfirmation: yup.string().label('password confirmation').required().oneOf([yup.ref('password'), null], 'password does not match its confirmation'),
});

export default function LoginPage() {
  const { signIn } = useAuth();
  const router = useRouter();

  const form = useForm<FormValues>({ resolver: yupResolver(formSchema) });
  const [errorMessages, setErrorMessages] = useState([]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const { token, user } = await api.post<RegisterResponse>('/auth/register', data)
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
          Join the chat
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link href="/auth/login">
            <a className="font-medium text-indigo-600 hover:text-indigo-500">
              sign in
            </a>
          </Link>
          {' '}if you have an account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <ErrorMessagesAlert messages={errorMessages} />

              <InputBlock labelText="Name" type="text" name="name" />
              <InputBlock labelText="Email address" type="email" name="email" />
              <InputBlock labelText="Password" type="password" name="password" />
              <InputBlock labelText="Password Confirmation" type="password" name="passwordConfirmation" />

              <SubmitButton isLoading={form.formState.isSubmitting} text="Create account" loadingText="Creating account" />
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
}
