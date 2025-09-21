import React from 'react';

interface EditorControlsProps {
  onEdit: () => void;
  onReset: () => void;
  isLoading: boolean;
  hasImage1: boolean;
  hasImage2: boolean;
  error: string | null;
  responseText: string | null;
}

const EditorControls: React.FC<EditorControlsProps> = ({
  onEdit,
  onReset,
  isLoading,
  hasImage1,
  hasImage2,
  error,
  responseText,
}) => {
  return (
    <div className="flex flex-col justify-center items-center text-center space-y-6">
      <div>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-white">Growing Up</h2>
        <p className="text-indigo-100 max-w-md">
          Upload two photos from different times. See them meet in a new, magical memory.
        </p>
      </div>
      
      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-200 p-3 rounded-lg text-sm w-full">
          {error}
        </div>
      )}

      {responseText && (
         <div className="bg-blue-900/50 border border-blue-700 text-blue-100 p-3 rounded-lg text-sm w-full">
          <p className="font-bold mb-1">A note from the AI:</p>
          <p>{responseText}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm pt-4">
        <button
          onClick={onEdit}
          disabled={!hasImage1 || !hasImage2 || isLoading}
          className="flex-1 px-6 py-3 bg-pink-500 text-white font-bold rounded-lg shadow-lg hover:bg-pink-600 transition-all duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
        >
          {isLoading ? 'Generating...' : 'Combine Images ✨'}
        </button>
        <button
          onClick={onReset}
          disabled={isLoading}
          className="flex-1 px-6 py-3 bg-white/20 text-white font-bold rounded-lg hover:bg-white/30 transition-colors duration-200 disabled:opacity-50"
        >
          Start Over
        </button>
      </div>
    </div>
  );
};

export default EditorControls;
