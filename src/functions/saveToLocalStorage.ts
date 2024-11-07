import { CelestialBody } from "../api";

// Save the celestial body to local storage when visited
export const saveToLocalStorage = (body: CelestialBody): void => {
  const visitedBodies: CelestialBody[] = JSON.parse(
    localStorage.getItem("visitedBodies") || "[]"
  );

  // Avoid duplicates by checking if the body is already in the array
  if (!visitedBodies.some((visitedBody) => visitedBody.name === body.name)) {
    visitedBodies.push(body);

    // Ensure only 3 items are stored, remove the oldest if there are more than 3
    if (visitedBodies.length > 3) {
      visitedBodies.shift(); // Remove the first (oldest) item
    }

    // Save the updated list of bodies
    localStorage.setItem("visitedBodies", JSON.stringify(visitedBodies));
  }
};
