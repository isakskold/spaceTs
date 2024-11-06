var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchCelestialBodies } from "./api.js";
// Save the celestial body to local storage when visited
const saveToLocalStorage = (body) => {
    const visitedBodies = JSON.parse(localStorage.getItem("visitedBodies") || "[]");
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
const displayCelestialBodies = (bodies) => {
    const resultsContainer = document.getElementById("resultsContainer");
    if (resultsContainer) {
        resultsContainer.innerHTML = ""; // Clear previous results
        bodies.forEach((body) => {
            const bodyElement = document.createElement("div");
            bodyElement.textContent = body.name; // Display the name of the celestial body
            const inputElement = document.getElementById("searchInput");
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
const renderBodyDetails = (body) => {
    const detailsContainer = document.getElementById("detailsContainer");
    if (detailsContainer) {
        detailsContainer.innerHTML = ""; // Clear previous details
        // Create and append elements to display body details
        const descElement = document.createElement("div");
        descElement.textContent = body.desc;
        const nameElement = document.createElement("h2");
        nameElement.textContent = body.name;
        const typeElement = document.createElement("p");
        const typeLabel = document.createElement("span");
        typeLabel.textContent = "Type: ";
        typeLabel.classList.add("property"); // Apply the property class
        const typeValue = document.createElement("span");
        typeValue.textContent = body.type;
        typeValue.classList.add("value"); // Apply the value class
        typeElement.appendChild(typeLabel);
        typeElement.appendChild(typeValue);
        const rotationElement = document.createElement("p");
        const rotationLabel = document.createElement("span");
        rotationLabel.textContent = "Rotation: ";
        rotationLabel.classList.add("property"); // Apply the property class
        const rotationValue = document.createElement("span");
        rotationValue.textContent = `${body.rotation} hours`;
        rotationValue.classList.add("value"); // Apply the value class
        rotationElement.appendChild(rotationLabel);
        rotationElement.appendChild(rotationValue);
        const circumferenceElement = document.createElement("p");
        const circumferenceLabel = document.createElement("span");
        circumferenceLabel.textContent = "Circumference: ";
        circumferenceLabel.classList.add("property"); // Apply the property class
        const circumferenceValue = document.createElement("span");
        circumferenceValue.textContent = `${body.circumference} km`;
        circumferenceValue.classList.add("value"); // Apply the value class
        circumferenceElement.appendChild(circumferenceLabel);
        circumferenceElement.appendChild(circumferenceValue);
        const tempElement = document.createElement("p");
        const tempLabel = document.createElement("span");
        tempLabel.textContent = "Temperature: ";
        tempLabel.classList.add("property"); // Apply the property class
        const tempValue = document.createElement("span");
        tempValue.textContent = `Day ${body.temp.day}°C, Night ${body.temp.night}°C`;
        tempValue.classList.add("value"); // Apply the value class
        tempElement.appendChild(tempLabel);
        tempElement.appendChild(tempValue);
        const distanceElement = document.createElement("p");
        const distanceLabel = document.createElement("span");
        distanceLabel.textContent = "Distance from Sun: ";
        distanceLabel.classList.add("property"); // Apply the property class
        const distanceValue = document.createElement("span");
        distanceValue.textContent = `${body.distance} km`;
        distanceValue.classList.add("value"); // Apply the value class
        distanceElement.appendChild(distanceLabel);
        distanceElement.appendChild(distanceValue);
        const orbitalPeriodElement = document.createElement("p");
        const orbitalPeriodLabel = document.createElement("span");
        orbitalPeriodLabel.textContent = "Orbital Period: ";
        orbitalPeriodLabel.classList.add("property"); // Apply the property class
        const orbitalPeriodValue = document.createElement("span");
        orbitalPeriodValue.textContent = `${body.orbitalPeriod} days`;
        orbitalPeriodValue.classList.add("value"); // Apply the value class
        orbitalPeriodElement.appendChild(orbitalPeriodLabel);
        orbitalPeriodElement.appendChild(orbitalPeriodValue);
        const moonsElement = document.createElement("p");
        const moonsLabel = document.createElement("span");
        moonsLabel.textContent = "Moons: ";
        moonsLabel.classList.add("property"); // Apply the property class
        const moonsValue = document.createElement("span");
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
const searchCelestialBodies = (bodies, query) => {
    const lowerCaseQuery = query.toLowerCase();
    return bodies.filter((body) => body.name.toLowerCase().includes(lowerCaseQuery));
};
// Show last visited celestial bodies
const lastVisitedBodies = () => {
    const visitedBodies = JSON.parse(localStorage.getItem("visitedBodies") || "[]");
    const lastVisitedContainer = document.getElementById("lastVisitedContainer");
    // Clear the container before rendering the updated list
    if (lastVisitedContainer) {
        lastVisitedContainer.innerHTML = ""; // Clear any existing content
    }
    visitedBodies.forEach((body) => {
        const bodyElement = document.createElement("div");
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
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const celestialBodies = yield fetchCelestialBodies();
    const searchInput = document.getElementById("searchInput");
    lastVisitedBodies();
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const query = searchInput.value;
            // Check if the query length is greater than 0
            if (query.length > 0) {
                const filteredBodies = searchCelestialBodies(celestialBodies, query);
                displayCelestialBodies(filteredBodies);
            }
            else {
                // If the query is empty, clear the results
                displayCelestialBodies([]); // or you can choose to do nothing
            }
        });
    }
});
main();
