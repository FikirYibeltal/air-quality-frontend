/* eslint-disable @typescript-eslint/no-explicit-any */
export const ErrorAlert = ({ errorMessage, onRefresh }: any) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-red-100 border border-red-400 text-red-700 p-4 rounded-md">
      <p className="text-lg font-semibold">Error: {errorMessage || 'An error occurred'}</p>
      <button
        onClick={onRefresh}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      >
        Refresh
      </button>
    </div>
  );
};
