import { FC } from 'react';

export const CategoriesSidebar: FC = () => (
  <div className="mt-8">
    <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
      Categories
    </h3>
    <div className="mt-1 space-y-1" role="group">
      <a href="/" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50">
        <span className="bg-pink-600 w-2.5 h-2.5 mr-4 rounded-full" aria-hidden="true" />
        <span className="truncate">
          Stocks
        </span>
        <span className="ml-auto text-xs">123</span>
      </a>
      <a href="/" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50">
        <span className="bg-pink-600 w-2.5 h-2.5 mr-4 rounded-full" aria-hidden="true" />
        <span className="truncate">
          Stocks
        </span>
        <span className="ml-auto text-xs">123</span>
      </a>
    </div>
  </div>
);
