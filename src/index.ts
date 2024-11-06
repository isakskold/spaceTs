import { fetchCelestialBodies, CelestialBody } from "./api.js";

// Save the celestial body to local storage when visited
const saveToLocalStorage = (body: CelestialBody): void => {
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

// Function to display celestial bodies as search results
const displayCelestialBodies = (bodies: CelestialBody[]): void => {
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
        // Save the body name to local storage
        saveToLocalStorage(body);
        renderBodyDetails(body); // Render the details of the clicked body
      });

      resultsContainer.appendChild(bodyElement);
    });
  }
};

// Function to render detailed information of a celestial body
const renderBodyDetails = (body: CelestialBody): void => {
  const detailsContainer: HTMLElement | null =
    document.getElementById("detailsContainer");
  if (detailsContainer) {
    detailsContainer.innerHTML = ""; // Clear previous details

    // Create and append elements to display body details

    const descElement: HTMLElement = document.createElement("div");
    descElement.textContent = body.desc;

    const nameElement: HTMLHeadingElement = document.createElement("h2");
    nameElement.textContent = body.name;

    const typeElement: HTMLElement = document.createElement("p");
    const typeLabel: HTMLSpanElement = document.createElement("span");
    typeLabel.textContent = "Type: ";
    typeLabel.classList.add("property"); // Apply the property class
    const typeValue: HTMLSpanElement = document.createElement("span");
    typeValue.textContent = body.type;
    typeValue.classList.add("value"); // Apply the value class
    typeElement.appendChild(typeLabel);
    typeElement.appendChild(typeValue);

    const rotationElement: HTMLParagraphElement = document.createElement("p");
    const rotationLabel: HTMLSpanElement = document.createElement("span");
    rotationLabel.textContent = "Rotation: ";
    rotationLabel.classList.add("property"); // Apply the property class
    const rotationValue: HTMLSpanElement = document.createElement("span");
    rotationValue.textContent = `${body.rotation} hours`;
    rotationValue.classList.add("value"); // Apply the value class
    rotationElement.appendChild(rotationLabel);
    rotationElement.appendChild(rotationValue);

    const circumferenceElement: HTMLParagraphElement =
      document.createElement("p");
    const circumferenceLabel: HTMLSpanElement = document.createElement("span");
    circumferenceLabel.textContent = "Circumference: ";
    circumferenceLabel.classList.add("property"); // Apply the property class
    const circumferenceValue: HTMLSpanElement = document.createElement("span");
    circumferenceValue.textContent = `${body.circumference} km`;
    circumferenceValue.classList.add("value"); // Apply the value class
    circumferenceElement.appendChild(circumferenceLabel);
    circumferenceElement.appendChild(circumferenceValue);

    const tempElement: HTMLParagraphElement = document.createElement("p");
    const tempLabel: HTMLSpanElement = document.createElement("span");
    tempLabel.textContent = "Temperature: ";
    tempLabel.classList.add("property"); // Apply the property class
    const tempValue: HTMLSpanElement = document.createElement("span");
    tempValue.textContent = `Day ${body.temp.day}°C, Night ${body.temp.night}°C`;
    tempValue.classList.add("value"); // Apply the value class
    tempElement.appendChild(tempLabel);
    tempElement.appendChild(tempValue);

    const distanceElement: HTMLParagraphElement = document.createElement("p");
    const distanceLabel: HTMLSpanElement = document.createElement("span");
    distanceLabel.textContent = "Distance from Sun: ";
    distanceLabel.classList.add("property"); // Apply the property class
    const distanceValue: HTMLSpanElement = document.createElement("span");
    distanceValue.textContent = `${body.distance} km`;
    distanceValue.classList.add("value"); // Apply the value class
    distanceElement.appendChild(distanceLabel);
    distanceElement.appendChild(distanceValue);

    const orbitalPeriodElement: HTMLParagraphElement =
      document.createElement("p");
    const orbitalPeriodLabel: HTMLSpanElement = document.createElement("span");
    orbitalPeriodLabel.textContent = "Orbital Period: ";
    orbitalPeriodLabel.classList.add("property"); // Apply the property class
    const orbitalPeriodValue: HTMLSpanElement = document.createElement("span");
    orbitalPeriodValue.textContent = `${body.orbitalPeriod} days`;
    orbitalPeriodValue.classList.add("value"); // Apply the value class
    orbitalPeriodElement.appendChild(orbitalPeriodLabel);
    orbitalPeriodElement.appendChild(orbitalPeriodValue);

    const moonsElement: HTMLParagraphElement = document.createElement("p");
    const moonsLabel: HTMLSpanElement = document.createElement("span");
    moonsLabel.textContent = "Moons: ";
    moonsLabel.classList.add("property"); // Apply the property class
    const moonsValue: HTMLSpanElement = document.createElement("span");
    moonsValue.textContent = body.moons.join(", ") || "None";
    moonsValue.classList.add("value"); // Apply the value class
    moonsElement.appendChild(moonsLabel);
    moonsElement.appendChild(moonsValue);

    // Append all elements to the details container
    detailsContainer.appendChild(nameElement);
    detailsContainer.appendChild(descElement);
    detailsContainer.appendChild(typeElement);
    detailsContainer.appendChild(rotationElement);
    detailsContainer.appendChild(circumferenceElement);
    detailsContainer.appendChild(tempElement);
    detailsContainer.appendChild(distanceElement);
    detailsContainer.appendChild(orbitalPeriodElement);
    detailsContainer.appendChild(moonsElement);
  }
};

// Search functionality
const searchCelestialBodies = (
  bodies: CelestialBody[],
  query: string
): CelestialBody[] => {
  const lowerCaseQuery: string = query.toLowerCase();
  return bodies.filter((body: CelestialBody) =>
    body.name.toLowerCase().includes(lowerCaseQuery)
  );
};

// Show last visited celestial bodies
const lastVisitedBodies = (): void => {
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
      renderBodyDetails(body); // Directly pass the full body object
    });

    if (lastVisitedContainer) {
      lastVisitedContainer.appendChild(bodyElement);
    }
  });
};

const main = async (): Promise<void> => {
  const celestialBodies: CelestialBody[] = await fetchCelestialBodies();

  const searchInput: HTMLInputElement | null = document.getElementById(
    "searchInput"
  ) as HTMLInputElement;

  lastVisitedBodies();

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query: string = searchInput.value;

      // Check if the query length is greater than 0
      if (query.length > 0) {
        const filteredBodies: CelestialBody[] = searchCelestialBodies(
          celestialBodies,
          query
        );
        displayCelestialBodies(filteredBodies);
      } else {
        // If the query is empty, clear the results
        displayCelestialBodies([]); // or you can choose to do nothing
      }
    });
  }
};

main();
