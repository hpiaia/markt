import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Gravatar from 'react-gravatar';

import { MessageBox } from '../../components/MessageBox';
import { SendMessageInput } from '../../components/SendMessageInput';
import { useFetch } from '../../hooks/useFetch';
import { Message } from '../../types/Message';
import { Room } from '../../types/Room';

export default function RoomPage() {
  const router = useRouter();

  const { id } = router.query;

  const { data: room } = useFetch<Room>(`/rooms/${id}`);
  const { data: messages, revalidate } = useFetch<Message[]>(`/rooms/${id}/messages`);

  if (!room || !messages) return <div>Loading...</div>;

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

      <SendMessageInput roomId={Number(id)} onSend={revalidate} />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => ({
  props: {},
});
