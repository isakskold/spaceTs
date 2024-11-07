import { fetchCelestialBodies, CelestialBody } from "./api.js";
import { lastVisitedBodies } from "./functions/lastVisitedBodies.js";
import { searchCelestialBodies } from "./functions/searchCelestialBodies.js";
import { displayCelestialBodies } from "./functions/displayCelestialBodies.js";

const main = async (): Promise<void> => {
  // Fetch an array where each item uses the CelestialBody interface
  const celestialBodies: CelestialBody[] = await fetchCelestialBodies();

  // Get the user input from search bar
  const searchInput: HTMLInputElement | null = document.getElementById(
    "searchInput"
  ) as HTMLInputElement;

  // Display last visited celestial bodies, fetching from local storage
  lastVisitedBodies();

  // Event listener for input in the search bar
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      // Store input value
      const query: string = searchInput.value;

      // Check if the query length is greater than 0
      if (query.length > 0) {
        // Get search results based on query
        const filteredBodies: CelestialBody[] = searchCelestialBodies(
          celestialBodies,
          query
        );

        // Display the search results
        displayCelestialBodies(filteredBodies);
      } else {
        // If no input is given no results are shown
        displayCelestialBodies([]);
      }
    });
  }
};

// Run main
main();
