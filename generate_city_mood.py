import os
from openai import OpenAI
from dotenv import load_dotenv


# Load the .env file
load_dotenv()

# Load the API key from the environment
openai_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=openai_key)

mood = "Sad"

prompt = """
You are a travel planner specializing in creating mood-based travel experiences. Based on the provided mood:

Generate a short message describing the essence of the mood and how the suggested city aligns with it.
Provide the following details:
City: Suggest a city that reflects the mood.
Song: Recommend a song that complements the mood and the city's vibe.


Output Format:

Mood Message: [A short, evocative message about the mood and its connection to the city.]
City: [City Name, Country]
Song: [Song Name by Artist]
Itinerary:
Based on the mood, create a detailed 3-day itinerary. The itinerary should:

Reflect the mood in every activity.
Be tailored to immerse the traveler in the city's unique atmosphere and culture.
Include meals, experiences, and leisure activities that align with the mood.
Important: Ensure the mood is central to the suggestions and itinerary. Avoid generic or unrelated options.

Mood: """ + mood + """

"""

def generate_response():
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": prompt,
            },
              {
                "role": "user",
                "content": mood,
            },
        ],
 )
    
    return response



def seperate_answers(response):
    # # Extract the generated text and clean it up
    

    itinerary_start = response.find("Itinerary:")
    other_content = response[:itinerary_start].strip()

    # Extract the Itinerary section
    itinerary_text = response[itinerary_start + len("Itinerary:"):].strip()

    # Parse the itinerary into a dictionary
    itinerary = {}
    current_day = None

    for line in itinerary_text.splitlines():
        line = line.strip()
        if line.startswith("Day"):
            current_day = line
            itinerary[current_day] = []
        elif current_day:
            itinerary[current_day].append(line)

    # Create the final structured output
    result = {
        "other_content": other_content,
        "itinerary": {day: "\n".join(activities) for day, activities in itinerary.items()},
    }

    # Example: Display the result
    print("Other Content:")
    print(result["other_content"])
    print("\nItinerary:")
    for day, details in result["itinerary"].items():
        print(f"{day}:\n{details}\n")
    
    return result

print(seperate_answers(generate_response().choices[0].message.content))




