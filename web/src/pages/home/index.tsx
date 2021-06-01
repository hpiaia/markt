import { useState } from 'react';

import { RoomPanel } from '../../components/RoomPanel';
import { RoomsTable } from '../../components/RoomsTable';

export default function HomePage() {
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
        <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
          Categories
        </h2>
        <ul className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4 mt-3">

          <a href="/">
            <li className="relative col-span-1 flex shadow-sm rounded-md">
              <div className="bg-pink-600 flex-shrink-0 flex items-center justify-center w-16 text-white text-2xl rounded-l-md">
                ST
              </div>
              <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                <div className="flex-1 px-4 py-2 text-sm truncate">
                  <span className="text-gray-900 font-medium hover:text-gray-600">
                    Stocks
                  </span>
                  <p className="text-gray-500">20 Rooms</p>
                </div>
              </div>
            </li>
          </a>

        </ul>
      </div>

      <RoomsTable />

      {/* <RoomPanel
        isOpen={createPanelOpen}
        onClose={() => setCreatePanelOpen(false)}
      /> */}
    </main>
  );
}
