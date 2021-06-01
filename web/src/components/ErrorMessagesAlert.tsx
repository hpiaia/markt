import { XCircleIcon } from '@heroicons/react/solid';
import { FC } from 'react';

interface Props {
  messages: string[]
}

export const ErrorMessagesAlert: FC<Props> = ({
  messages,
}) => {
  if (!messages.length) return null;

  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            {messages.length === 1 ? 'There was an error with your submission:' : `There were ${messages.length} errors with your submission:`}
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <ul className="space-y-1">
              {messages.map((message) => <li key={message}>{message}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
