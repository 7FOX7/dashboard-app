'use client';
  
export default function Error({
  reset,
}: {
  reset: () => void;
}) {
 
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}

/*
   1. Objective: Show the UI friendly error message about 404 (non-existing material)

   Procedure: 
      - Find ALL the places in your code where the '404' Error might be thrown;
      |
      | -- One such potential place is inside the function 'fetchInvoiceById' 
      |
      | -- If the user is trying to access non-existing info, the function for handling '404' Error will be thrown, and 'fetchInvoiceById' is one of the potential places where this might happen (like what happens, when the user is searching an invoice of the user which does not exist?)
*/