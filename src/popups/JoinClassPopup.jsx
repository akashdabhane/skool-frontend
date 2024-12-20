import React from "react";

const JoinClassPopup = ({ closePopup }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md mx-auto rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Join class</h2>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            You're currently signed in as
          </p>
          <div className="flex items-center mt-2">
            <div className="w-8 h-8 bg-purple-600 text-white flex items-center justify-center rounded-full">
              A
            </div>
            <div className="ml-2">
              <p className="font-semibold">Akash Dabhane</p>
              <p className="text-xs text-gray-500">
                akashdabhane10@gmail.com
              </p>
            </div>
            <button className="ml-auto text-blue-500 text-sm">
              Switch account
            </button>
          </div>
        </div>
        <InputField
          label="Class code"
          placeholder="Enter class code"
          info="Ask your teacher for the class code, then enter it here."
        />
        <div className="text-sm text-gray-600 mt-4">
          <p>To sign in with a class code:</p>
          <ul className="list-disc list-inside">
            <li>Use an authorized account</li>
            <li>Use a class code with 5-7 letters or numbers, and no spaces or symbols</li>
          </ul>
        </div>
        <div className="flex justify-end mt-4 space-x-4">
          <button
            onClick={closePopup}
            className="py-2 px-4 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinClassPopup;


const InputField = ({ label, placeholder, info }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
      {info && <p className="text-xs text-gray-500 mt-1">{info}</p>}
    </div>
  );
};

