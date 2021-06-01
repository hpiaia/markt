import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

interface Props {
  type: string
  name: string,
  labelText: string
}

export const InputBlock: FC<Props> = ({
  type,
  name,
  labelText,
}) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {labelText}
      </label>
      <div className="mt-1 relative rounded-md ">
        <input
          id={name}
          type={type}
          {...register(name)}
          className={
            errors[name]
              ? 'appearance-none block w-full px-3 py-2 border rounded-md focus:outline-none sm:text-sm border-red-300  placeholder-red-300 focus:ring-red-500 focus:border-red-500 text-red-900'
              : 'appearance-none block w-full px-3 py-2 border rounded-md focus:outline-none sm:text-sm border-gray-300 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 '
          }
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          {errors[name] && <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />}
        </div>
      </div>
      {errors[name] && <p className="mt-1 text-sm text-red-600" id={`${name}-error`}>{errors[name]?.message}</p>}
    </div>
  );
};
