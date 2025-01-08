import { useState } from 'react';
import { MoodResponse } from '@/types/api';

interface ResultCardProps {
  results: MoodResponse;
}

export default function ResultCard({ results }: ResultCardProps) {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const toggleDay = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md max-w-3xl w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Generated Results</h2>
      <p className="mb-2">
        <strong>Mood Message:</strong> {results.moodMessage}
      </p>
      <p className="mb-2">
        <strong>City:</strong> {results.city}
      </p>
      <p className="mb-2">
        <strong>Song:</strong> {results.song}
      </p>
      <div>
        <h3 className="text-lg font-bold mb-2">Itinerary:</h3>
        {results.itinerary.map((day, index) => (
          <div key={index} className="mb-4">
            <button
              onClick={() => toggleDay(day.day)}
              className="w-full bg-indigo-500 text-white py-2 rounded-lg text-left px-4 focus:outline-none focus:ring focus:ring-indigo-300 hover:bg-indigo-600"
            >
              {`Day ${day.day}: ${expandedDay === day.day ? 'Hide' : 'View'} Activities`}
            </button>
            {expandedDay === day.day && (
              <ul className="list-disc list-inside text-gray-600 mt-2">
                {day.activities.map((activity, idx) => (
                  <li key={idx} className="py-1 hover:text-indigo-500 transition-colors">
                    {activity}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
