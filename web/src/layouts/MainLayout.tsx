import { Dialog, Transition } from '@headlessui/react';
import {
  CogIcon,
  HomeIcon, LogoutIcon,
  MenuAlt1Icon, UserIcon,
  XIcon,
} from '@heroicons/react/outline';
import {
  SearchIcon,
} from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Fragment, MouseEventHandler, ReactNode, useState,
} from 'react';
import Gravatar from 'react-gravatar';

import { CategoriesSidebar } from '../components/CategoriesSidebar';
import { LoadingScreen } from '../components/LoadingScreen';
import { useAuth } from '../hooks/useAuth';

interface LayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: LayoutProps) {
  const { user, signOut } = useAuth();
  const router = useRouter();

  if (!user) {
    router.replace('/auth/login');
    return <LoadingScreen />;
  }

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut: MouseEventHandler = (e) => {
    e.preventDefault();

    signOut();
    router.push('/auth/login');
  };

  return (
    <div className="absolute inset-0 md:h-full flex overflow-hidden bg-white">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 flex z-40 lg:hidden"
          open={sidebarOpen}
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-4">
                <img
                  className="h-8 w-auto"
                  src="/logo.svg"
                  alt="Markt"
                />
                <h1 className="ml-4 text-2xl font-extrabold text-gray-700">
                  Markt<span className="text-indigo-600">.</span>Chat
                </h1>
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <div className="px-4 mt-3 relative inline-block text-left">
                  <span className="flex w-full justify-between items-center">
                    <span className="flex min-w-0 items-center justify-between space-x-3">
                      <Gravatar email={user.email} className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" />
                      <span className="flex-1 flex flex-col min-w-0">
                        <span className="text-gray-900 text-sm font-medium truncate">
                          {user.name}
                        </span>
                        <span className="text-gray-500 text-sm truncate">
                          {user.email}
                        </span>
                      </span>
                    </span>
                  </span>
                </div>
                <nav className="px-2 mt-4">
                  <div className="space-y-1">
                    <Link href="/">
                      <a className={router.asPath === '/' ? 'bg-gray-100 text-gray-900 group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md'}>
                        <HomeIcon className={router.asPath === '/' ? 'text-gray-500 mr-3 flex-shrink-0 h-6 w-6' : 'text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6'} />
                        Home
                      </a>
                    </Link>
                    <Link href="/profile">
                      <a className={router.asPath === '/profile' ? 'bg-gray-100 text-gray-900 group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md'}>
                        <UserIcon className={router.asPath === '/profile' ? 'text-gray-500 mr-3 flex-shrink-0 h-6 w-6' : 'text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6'} />
                        Profile
                      </a>
                    </Link>
                    <Link href="/settings">
                      <a className={router.asPath === '/settings' ? 'bg-gray-100 text-gray-900 group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md'}>
                        <CogIcon className={router.asPath === '/settings' ? 'text-gray-500 mr-3 flex-shrink-0 h-6 w-6' : 'text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6'} />
                        Settings
                      </a>
                    </Link>
                    <a href="#" onClick={handleSignOut} className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md">
                      <LogoutIcon className="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6" />
                      Sign Out
                    </a>
                  </div>
                  <CategoriesSidebar />
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true" />
        </Dialog>
      </Transition.Root>
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 pt-5 pb-4 bg-gray-100">
          <div className="flex items-center flex-shrink-0 px-6">
            <img
              className="h-8 w-auto"
              src="/logo.svg"
              alt="Markt"
            />
            <h1 className="ml-4 text-2xl font-extrabold text-gray-700">
              Markt<span className="text-indigo-600">.</span>Chat
            </h1>
          </div>
          <div className="h-0 flex-1 flex flex-col overflow-y-auto">
            <div className="px-6 mt-8 relative inline-block text-left">
              <span className="flex w-full justify-between items-center">
                <span className="flex min-w-0 items-center justify-between space-x-3">
                  <Gravatar email={user.email} className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" />
                  <span className="flex-1 flex flex-col min-w-0">
                    <span className="text-gray-900 text-sm font-medium truncate">
                      {user.name}
                    </span>
                    <span className="text-gray-500 text-sm truncate">
                      {user.email}
                    </span>
                  </span>
                </span>
              </span>
            </div>
            <div className="px-3 mt-6">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  aria-hidden="true"
                >
                  <SearchIcon className="mr-3 h-4 w-4 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-9 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search"
                />
              </div>
            </div>
            <nav className="px-3 mt-6">
              <div className="space-y-1">
                <Link href="/">
                  <a className={router.asPath === '/' ? 'bg-gray-200 text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md'}>
                    <HomeIcon className={router.asPath === '/' ? 'text-gray-500 mr-3 flex-shrink-0 h-6 w-6' : 'text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6'} />
                    Home
                  </a>
                </Link>
                <Link href="/profile">
                  <a className={router.asPath === '/profile' ? 'bg-gray-200 text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md'}>
                    <UserIcon className={router.asPath === '/profile' ? 'text-gray-500 mr-3 flex-shrink-0 h-6 w-6' : 'text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6'} />
                    Profile
                  </a>
                </Link>
                <Link href="/settings">
                  <a className={router.asPath === '/settings' ? 'bg-gray-200 text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md'}>
                    <CogIcon className={router.asPath === '/settings' ? 'text-gray-500 mr-3 flex-shrink-0 h-6 w-6' : 'text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6'} />
                    Settings
                  </a>
                </Link>
                <a href="#" onClick={handleSignOut} className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                  <LogoutIcon className="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6" />
                  Sign Out
                </a>
              </div>
              <CategoriesSidebar />
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex-1 flex">
              <form className="w-full flex md:ml-0" action="#" method="GET">
                <label htmlFor="search_field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <input
                    id="search_field"
                    name="search_field"
                    className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:text-sm"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          {children}
        </div>
      </div>
    </div>
  );
}
