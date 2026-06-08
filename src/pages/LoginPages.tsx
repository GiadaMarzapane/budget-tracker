import { useAuthActions } from "@convex-dev/auth/react";

export const LoginPage = () => {
  const { signIn } = useAuthActions();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Budget Tracker</h1>
        
        <button
          onClick={() => signIn("google")}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Accedi con Google
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Solo per testing — accedi con la tua email registrata in Google Cloud
        </p>
      </div>
    </div>
  );
};