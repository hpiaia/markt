import {
  ArrowNarrowLeftIcon,
} from '@heroicons/react/solid';
import { NextPage } from 'next';
import Link from 'next/link';

interface Props {
  isErrorPage: boolean;
  statusCode?: number;
}

const ErrorPage: NextPage<Props> = ({ statusCode }) => (
  <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center">
    <div className="md:flex items-center">
      <h2 className="md:pr-8 text-6xl font-extrabold text-indigo-600 text-center">
        {statusCode}
      </h2>
      <div className="md:border-l text-xl md:pl-8 py-8 text-gray-500 font-light text-center md:text-left">
        Whoops. <br className="md:hidden" /> Something wrong happened.
      </div>
    </div>
    <Link href="/">
      <a className="mt-8 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <ArrowNarrowLeftIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Go back home
      </a>
    </Link>
  </div>
);

ErrorPage.getInitialProps = async ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { isErrorPage: true, statusCode };
};

export default ErrorPage;
