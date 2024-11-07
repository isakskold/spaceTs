import { CelestialBody } from "../api";
import { renderBodyDetails } from "./renderBodyDetails";

// Show last visited celestial bodies
export const lastVisitedBodies = (): void => {
  const visitedBodies: CelestialBody[] = JSON.parse(
    localStorage.getItem("visitedBodies") || "[]"
  );
  const lastVisitedContainer: HTMLElement | null = document.getElementById(
    "lastVisitedContainer"
  );

  // Clear the container before rendering the updated list
  if (lastVisitedContainer) {
    lastVisitedContainer.innerHTML = ""; // Clear any existing content
  }

  visitedBodies.forEach((body: CelestialBody) => {
    const bodyElement: HTMLDivElement = document.createElement("div");
    bodyElement.textContent = body.name; // Display the body name

    // Add click event to render details for the clicked body
    bodyElement.addEventListener("click", () => {
      renderBodyDetails(body);
    });

    if (lastVisitedContainer) {
      lastVisitedContainer.appendChild(bodyElement);
    }
  });
};
