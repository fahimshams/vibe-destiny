export interface ItineraryDay {
    day: number;
    activities: string[];
  }
  
  export interface MoodResponse {
    moodMessage: string;
    city: string;
    song: string;
    itinerary: ItineraryDay[];
  }
  