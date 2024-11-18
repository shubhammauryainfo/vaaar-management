import React from "react";

const LoginPage = () => {
    
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Vaaar Trust</h1>
          <p className="mt-2 text-sm text-gray-600">
            Empowering communities through education, cleanliness, and awareness.
          </p>
        </div>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300"
          >
            Login
          </button>
        </form>
        <div className="text-sm text-center text-gray-600">
          <p>
            Need help?{" "}
            <a
              href="#"
              className="font-medium text-blue-500 hover:underline"
            >
              Contact Vaaar Trust
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
