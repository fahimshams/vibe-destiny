import { FaArrowRight } from 'react-icons/fa';

interface InputFormProps {
  mood: string;
  setMood: (mood: string) => void;
  handleGenerate: () => void;
  loading: boolean;
}

export default function InputForm({ mood, setMood, handleGenerate, loading }: InputFormProps) {
  return (
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
      <input
        type="text"
        placeholder="Enter your mood (e.g., 'melancholy')"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:outline-none transition-transform duration-200 transform hover:scale-105"
      />
      <button
        onClick={handleGenerate}
        className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Itinerary'}
        <FaArrowRight />
      </button>
    </div>
  );
}
