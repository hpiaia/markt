import dayjs from 'dayjs';
import { FC } from 'react';
import Gravatar from 'react-gravatar';

import { useAuth } from '../hooks/useAuth';
import { Message } from '../types/Message';

interface Props {
  messages: Message[]
}

const MessageFromBot: FC<{message: Message}> = ({ message }) => (
  <div className="mr-auto my-2 flex items-center">
    <img src="/bot-avatar.png" className="h-10 w-10 rounded-full mr-4" alt="Markt Bot" title="Markt Bot" />
    <div
      className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
    >
      {message.text}
    </div>
  </div>
);

const MessageReceived: FC<{message: Message}> = ({ message }) => (
  <div className="mr-auto my-2 flex items-center">
    <Gravatar email={message.user?.email} className="h-10 w-10 rounded-full mr-4" title={message.user?.name} />
    <div
      className="px-4 py-2 rounded-lg bg-white text-gray-600 shadow-lg"
    >
      {message.text}
    </div>
  </div>
);

const MessageSent: FC<{message: Message}> = ({ message }) => (
  <div className="ml-auto my-2 flex items-center">
    <div
      className="px-4 py-2 rounded-lg bg-indigo-600 text-white shadow-lg"
    >
      {message.text}
    </div>
  </div>
);

const MessageItem = ({ message }: {message: Message}) => {
  const { user } = useAuth();

  if (!message.user) return <MessageFromBot message={message} />;

  return message.user?.email === user?.email
    ? <MessageSent message={message} />
    : <MessageReceived message={message} />;
};

export const MessageBox: FC<Props> = ({
  messages,
}) => (
  <div className="flex flex-1 flex-col-reverse overflow-scroll bg-hero-pattern">
    <div className="p-6 flex flex-col">
      {messages.map((message) => <MessageItem key={message.id} message={message} />)}
    </div>
  </div>
);
