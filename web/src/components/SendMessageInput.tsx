import { FC } from 'react';
import Gravatar from 'react-gravatar';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAuth } from '../hooks/useAuth';
import api from '../lib/api';

interface FormValues {
  text: string
}

interface Props {
  roomId: number;
}

export const SendMessageInput: FC<Props> = ({
  roomId,
}) => {
  const { user } = useAuth();

  const form = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async ({ text }) => {
    if (!text) {
      form.setFocus('text');
      return;
    }

    try {
      await api.post('/chat/send-message', { roomId, text });
    } catch (e) {
      // TODO: handle message error
    }

    form.reset();
    form.setFocus('text');
  };

  return (
    <div className="border-t mt-auto bg-gray-50 px-4 py-6 sm:px-6">
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center space-x-3 h-full">
        <div className="flex-shrink-0">
          <Gravatar email={user?.email} className="h-10 w-10 rounded-full" />
        </div>
        <div className="min-w-0 flex-1">
          <div>
            <label htmlFor="text" className="sr-only">Type a message</label>
            <input
              type="text"
              id="text"
              className="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              placeholder="Type a message"
              {...form.register('text')}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-24 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            disabled={form.formState.isSubmitting}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};
