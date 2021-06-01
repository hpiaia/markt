import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Gravatar from 'react-gravatar';

import { MessageBox } from '../../components/MessageBox';
import { SendMessageInput } from '../../components/SendMessageInput';
import { useFetch } from '../../hooks/useFetch';
import { useIsMounted } from '../../hooks/useIsMounted';
import { useSocket } from '../../hooks/useSocket';
import { Message } from '../../types/Message';
import { Room } from '../../types/Room';

export default function RoomPage() {
  const { query } = useRouter();
  const isMounted = useIsMounted();

  const { socket } = useSocket();

  const { data: room } = useFetch<Room>(`/rooms/${query.id}`);

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.emit('joinRoom', Number(query.id));

    if (isMounted) {
      socket.on('messages', (data: Message[]) => {
        setMessages(data);
      });
    }

    return () => {
      socket.emit('leaveRoom', Number(query.id));
    };
  }, [isMounted]);

  useEffect(() => {
    socket.off('newMessage').on('newMessage', (data: Message) => {
      setMessages([...messages, data]);
    });
  }, [messages]);

  if (!room) return <div>Loading...</div>;

  return (
    <main className="flex flex-col h-full">
      <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
            {room.name}
          </h1>
          <div className="flex items-center text-sm text-gray-500">
            {room.description}
          </div>
        </div>
        <div className="flex hidden md:block">
          <div className="flex items-center space-x-2">
            <div className="flex flex-shrink-0 -space-x-3">
              <Gravatar
                email={room.owner.email}
                className="max-w-none h-10 w-10 rounded-full ring-4 ring-white"
                title={room.owner.name}
              />
            </div>
            <span className="flex-shrink-0 leading-5 font-medium">
              +1
            </span>
          </div>
        </div>
      </div>

      <MessageBox messages={messages} />

      <SendMessageInput roomId={Number(query.id)} />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => ({
  props: {},
});
