import dayjs from 'dayjs';
import Link from 'next/link';
import { FC, MouseEventHandler } from 'react';
import Gravatar from 'react-gravatar';

import { Room } from '../types/Room';

interface Props {
  rooms: Room[],
  onCreateClick: () => void
}

export const RoomsTable: FC<Props> = ({
  rooms,
  onCreateClick,
}) => {
  const handleCreateClick: MouseEventHandler = (e) => {
    e.preventDefault();
    onCreateClick();
  };

  return (
    <div className="align-middle inline-block min-w-full">
      <table className="min-w-full border-b border-gray-200">
        <thead>
          <tr className="border-t border-gray-200">
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <span className="lg:pl-2">
                Room
              </span>
            </th>
            <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created At
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {!rooms.length && (
          <tr>
            <td className="px-6 py-3 max-w-0 w-full whitespace-nowrap text-sm text-gray-900" colSpan={2}>
              <div className="flex">
                <span className="truncate ">
                  <div className="font-medium text-gray-500 ml-2">
                    There is no room available, be the one and{' '}
                    <a href="#" onClick={handleCreateClick} className="text-indigo-600 hover:text-indigo-">create the first room</a>!
                  </div>
                </span>
              </div>
            </td>
          </tr>
          )}
          {rooms.map((room) => (
            <tr key={room.id}>
              <td className="px-6 py-3 max-w-0 w-full whitespace-nowrap text-sm text-gray-900">
                <div className="flex items-center space-x-3 lg:pl-2">
                  <Gravatar email={room.owner.email} className="w-8 h-8 rounded-full" alt={room.owner.name} />
                  <Link href={`/room/${room.id}`}>
                    <a className="truncate hover:text-gray-600">
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{room.name}</div>
                        <div className="font-light text-gray-500">{room.description}</div>
                      </div>
                    </a>
                  </Link>
                </div>
              </td>
              <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                <div className="w-40">
                  <span title={dayjs(room.createdAt).format('llll')}>
                    {dayjs(room.createdAt).fromNow()}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!rooms.length && (
      <div className="flex flex-col justify-center items-center mt-32">
        <img src="/empty.svg" alt="No Data" className="max-w-xl" />
      </div>
      )}
    </div>
  );
};
