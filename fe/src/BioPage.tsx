import React from 'react';

const BioPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Here is your perfect Bio and characteristics
        </h1>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
            Your Bio:
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            As an IT professional with a flair for creative problem-solving, I specialize in uncovering the unexpected quirks of technology—like the secret long-distance communication habits of printers. When not optimizing digital systems, I champion practical superpowers (building relocation for perfect feng shui) and passionately defend superior snack choices (Doritos over Pringles, always). My approach to life blends technical curiosity with playful irreverence, turning mundane debates into spirited adventures.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BioPage;
