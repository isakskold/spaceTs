// src/api.ts

// Define an interface for the response data
export interface CelestialBody {
  id: number;
  type: string;
  name: string;
  latinName: string;
  rotation: number;
  circumference: number;
  temp: {
    day: number;
    night: number;
  };
  distance: number;
  orbitalPeriod: number;
  desc: string;
  moons: string[];
}

// Function to fetch celestial bodies data
export const fetchCelestialBodies = async (): Promise<CelestialBody[]> => {
  const url: string = "https://santosnr6.github.io/Data/space.json";

  try {
    const response: Response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: CelestialBody[] = await response.json();
    return data;
  } catch (error: unknown) {
    // Specify the type for the error
    if (error instanceof Error) {
      console.error("Error fetching data:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return []; // Return an empty array on error
  }
};
