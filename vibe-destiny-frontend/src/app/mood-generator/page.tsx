'use client';

import { useState } from 'react';
import InputForm from '@/components/InputForm';
import ResultCard from '@/components/ResultCard';
import Loader from '@/components/Loader';
import { MoodResponse } from '@/types/api';

export default function MoodGenerator() {
  const [mood, setMood] = useState<string>('');
  const [results, setResults] = useState<MoodResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResults(null);

    try {
      const response = await fetch('/api/generate-mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood }),
      });
      const data: MoodResponse = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error generating mood:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-600 flex flex-col items-center py-8 px-4">
      <h1 className="text-4xl font-extrabold text-white mb-4 animate-bounce">
        Mood Itinerary Generator
      </h1>
      <p className="text-gray-100 mb-8 text-center max-w-2xl">
        Enter your mood, and we'll create a personalized experience for you.
      </p>
      <InputForm
        mood={mood}
        setMood={setMood}
        handleGenerate={handleGenerate}
        loading={loading}
      />
      {loading && <Loader />}
      {results && <ResultCard results={results} />}
    </div>
  );
}
