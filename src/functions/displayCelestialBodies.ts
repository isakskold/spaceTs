import { saveToLocalStorage } from "./saveToLocalStorage";
import { renderBodyDetails } from "./renderBodyDetails";
import { CelestialBody } from "../api";

// Function to display celestial bodies as search results
export const displayCelestialBodies = (bodies: CelestialBody[]): void => {
  const resultsContainer: HTMLElement | null =
    document.getElementById("resultsContainer");
  if (resultsContainer) {
    resultsContainer.innerHTML = ""; // Clear previous results

    bodies.forEach((body: CelestialBody) => {
      const bodyElement: HTMLDivElement = document.createElement("div");
      bodyElement.textContent = body.name; // Display the name of the celestial body

      const inputElement: HTMLInputElement | null = document.getElementById(
        "searchInput"
      ) as HTMLInputElement;

      // Add click event listener to each body element
      bodyElement.addEventListener("click", () => {
        inputElement.value = "";
        resultsContainer.innerHTML = "";
        // Save the body to local storage
        saveToLocalStorage(body);
        renderBodyDetails(body); // Render the details of the clicked body
      });

      resultsContainer.appendChild(bodyElement);
    });
  }
};
