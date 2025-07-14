import React, { useState } from 'react'

const RateLimitedUI = () => {
  const [showPopup, setShowPopup] = useState(true); // Set to true for demo, set to false to hide by default

  return (
    <div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-pink-50 border border-pink-200 rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
            <h2 className="text-xl font-bold text-pink-400 mb-2">Rate Limit Reached</h2>
            <p className="text-pink-500 mb-4">You have made too many requests. Please wait a moment before trying again.</p>
            <button
              className="mt-2 px-4 py-2 bg-sky-100 text-sky-400 rounded hover:bg-sky-200"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RateLimitedUI
