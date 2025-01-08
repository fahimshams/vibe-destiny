import { NextResponse } from 'next/server';
import { MoodResponse } from '@/types/api';

export async function POST(req: Request) {
  const { mood }: { mood: string } = await req.json();

  // Simulated AI-generated data (replace this with actual API call)
  const mockData: MoodResponse = {
    moodMessage: `Sometimes in the quiet depths of ${mood}, we find a melancholic beauty that resonates with the soul.`,
    city: 'Paris, France',
    song: '"Hurt" by Johnny Cash',
    itinerary: [
      {
        day: 1,
        activities: [
          'Visit the iconic Notre Dame Cathedral.',
          'Enjoy a meal at a cozy café in Montmartre.',
          'Stroll along the Seine River.',
          'Dine at a traditional French bistro.',
        ],
      },
      {
        day: 2,
        activities: [
          'Explore the haunting beauty of Père Lachaise Cemetery.',
          'Visit the Musée d\'Orsay to see poignant artworks.',
          'Attend a classical music concert at Palais Garnier.',
        ],
      },
      {
        day: 3,
        activities: [
          'Take a walk through Luxembourg Gardens.',
          'Relax at a traditional tearoom.',
        ],
      },
    ],
  };

  return NextResponse.json(mockData);
}
