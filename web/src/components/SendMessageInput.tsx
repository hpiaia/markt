import { FC } from 'react';
import Gravatar from 'react-gravatar';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAuth } from '../hooks/useAuth';
import api from '../lib/api';
import { SubmitButton } from './LoadingButton';

interface FormValues {
  messageText: string
}

interface SendMessageResponse {}

interface Props {
  roomId: number;
  onSend: () => void;
}

export const SendMessageInput: FC<Props> = ({
  roomId,
  onSend,
}) => {
  const { user } = useAuth();

  const form = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!data.messageText) {
      form.setFocus('messageText');
      return;
    }

    const response = await api.post(`/rooms/${roomId}/messages`, { text: data.messageText }).then((res) => res.data);

    console.log(response);

    form.reset();
    form.setFocus('messageText');

    onSend();
  };

  return (
    <div className="border-t mt-auto bg-gray-50 px-4 py-6 sm:px-6">
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center space-x-3 h-full">
        <div className="flex-shrink-0">
          <Gravatar email={user?.email} className="h-10 w-10 rounded-full" />
        </div>
        <div className="min-w-0 flex-1">
          <div>
            <label htmlFor="messageText" className="sr-only">Type a message</label>
            <input
              type="text"
              id="messageText"
              className="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              placeholder="Type a message"
              {...form.register('messageText')}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-24 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            )}
            {!form.formState.isSubmitting && 'Send'}
          </button>
        </div>
      </form>
    </div>

  );
};
