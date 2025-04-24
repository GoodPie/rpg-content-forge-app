'use client';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: Readonly<ErrorMessageProps>) {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-md">
      <p className="text-red-600 dark:text-red-400">{message}</p>
    </div>
  );
}