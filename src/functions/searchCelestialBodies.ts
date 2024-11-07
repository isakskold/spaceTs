import { CelestialBody } from "../api";

// Search functionality
export const searchCelestialBodies = (
  bodies: CelestialBody[],
  query: string
): CelestialBody[] => {
  const lowerCaseQuery: string = query.toLowerCase();
  return bodies.filter((body: CelestialBody) =>
    body.name.toLowerCase().includes(lowerCaseQuery)
  );
};
