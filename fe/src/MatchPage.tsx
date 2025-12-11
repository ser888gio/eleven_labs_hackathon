import React from "react";

const MatchPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Here is your perfect match, find out why
        </h1>

        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <p className="text-gray-800 leading-relaxed text-lg">
              "I am a 64-year-old Native American individual with a urban
              upbringing. I work as a researcher. My height is 5'8, and my
              hobbies include painting, writing, and camping. I value honesty,
              empathy, personal growth, strong communication, emotional
              openness, and trust."
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Why this is a match:
            </h2>
            <p className="text-gray-700 leading-relaxed">
              This candidate shares the same Native American background and
              similar values with the target profile, including honesty,
              empathy, personal growth, and strong communication. Their hobbies
              like painting align well with the target's interests in painting
              and gardening, indicating a compatible lifestyle and emotional
              style.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchPage;
