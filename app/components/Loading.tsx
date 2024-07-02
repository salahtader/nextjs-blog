import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
        <span className="text-lg font-medium text-gray-700">Chargement...</span>
      </div>
    </div>
  );
};

export default Loading;
