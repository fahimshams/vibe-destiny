import React, { useEffect, useState } from 'react';
import AudioPlayer from './AudioPlayer';

interface ResultCardProps {
  results: {
    itinerary: {
      [key: string]: string;
    };
    other_content: string;
  };
}

const ResultCard: React.FC<ResultCardProps> = ({ results }) => {
  const { itinerary, other_content } = results;
  const [songUrl, setSongUrl] = useState<string | null>(null);

  // Extract other content details
  const moodMessage = other_content.match(/Mood Message: (.*)/)?.[1];
  const city = other_content.match(/City: (.*)/)?.[1];
  const song = other_content.match(/Song: (.*)/)?.[1];

  useEffect(() => {
    if (song) {
      fetch(`http://127.0.0.1:5000/api/youtube-search?query=${encodeURIComponent(song)}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.video_url) {
            setSongUrl(data.video_url);
          }
        })
        .catch((error) => {
          console.error('Error fetching song URL:', error);
        });
    }
  }, [song]);

  return (
    <div className="w-full max-w-2xl p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg mt-8">
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-yellow-300">Mood Boosters! 🌟</h3>
        <p className="text-white">{moodMessage}</p>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-yellow-300">Destination: Where Magic Happens! ✨</h3>
        <p className="text-white">{city}</p>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-yellow-300">Jamming to: 🎶</h3>
        {songUrl ? (
          <AudioPlayer src={songUrl} title={song || 'Unknown Song'} />
        ) : (
          <p className="text-white">Loading song... ⏳</p>
        )}
      </div>
      <div className="mt-4" /> {/* Add a space here */}
      <h2 className="text-3xl font-bold mb-6 text-yellow-100">Your Mood Itinerary ✈️</h2>

      {['Morning', 'Lunch', 'Afternoon', 'Dinner'].map((timeOfDay, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-xl font-semibold text-yellow-300 mb-2">{timeOfDay} Adventures 🕶️</h3>
          <div className="bg-white p-4 rounded-lg shadow-inner space-y-2">
            {Object.entries(itinerary).map(([day, activities], idx) => {
              const activitiesList = activities.split('\n');
              const filteredActivities = activitiesList.filter((activity) =>
                activity.toLowerCase().includes(timeOfDay.toLowerCase())
              );

              return (
                filteredActivities.length > 0 && (
                  <div key={idx}>
                    <h4 className="text-lg font-semibold text-purple-700">{day}</h4>
                    <p className="text-gray-700">
                      {filteredActivities
                        .map((activity) => activity.replace(/^- (morning|afternoon|lunch|dinner): /i, '')) // Remove the prefixes
                        .join(' | ')}
                    </p>
                  </div>
                )
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultCard;
