import { useState } from 'react';

import { RoomPanel } from '../../components/RoomPanel';
import { RoomsTable } from '../../components/RoomsTable';
import { useFetch } from '../../hooks/useFetch';
import { Room } from '../../types/Room';

export default function HomePage() {
  const { data } = useFetch<Room[]>('/rooms');

  const [createPanelOpen, setCreatePanelOpen] = useState(false);

  return (
    <main>
      <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
            Home
          </h1>
        </div>
        <div className="mt-4 flex sm:mt-0 sm:ml-4">
          <button
            type="button"
            className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
            onClick={() => setCreatePanelOpen(true)}
          >
            Create Room
          </button>
        </div>
      </div>

      <div className="px-4 mt-6 sm:px-6 lg:px-8">
        <h2 className="text-xl font-medium leading-tight text-gray-800">
          All rooms
        </h2>
      </div>

      <div className="mt-6">
        <RoomsTable rooms={data || []} />
      </div>

      <RoomPanel isOpen={createPanelOpen} onClose={() => setCreatePanelOpen(false)} />
    </main>
  );
}
