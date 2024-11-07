import { CelestialBody } from "../api";

// Helper function to render a property (label and value) as a paragraph element
const renderProperty = (
  labelText: string,
  valueText: string
): HTMLParagraphElement => {
  const element: HTMLParagraphElement = document.createElement("p");

  const label: HTMLSpanElement = document.createElement("span");
  label.textContent = labelText;
  label.classList.add("property");

  const value: HTMLSpanElement = document.createElement("span");
  value.textContent = valueText;
  value.classList.add("value");

  element.appendChild(label);
  element.appendChild(value);

  return element;
};

// Function to render detailed information of a celestial body
export const renderBodyDetails = (body: CelestialBody): void => {
  const detailsContainer: HTMLElement | null =
    document.getElementById("detailsContainer");

  if (detailsContainer) {
    detailsContainer.innerHTML = ""; // Clear previous details

    // Create and append elements to display body details

    // Name
    const nameElement: HTMLHeadingElement = document.createElement("h2");
    nameElement.textContent = body.name;

    // Description
    const descElement: HTMLElement = document.createElement("div");
    descElement.textContent = body.desc;

    // Render properties using the helper function
    const typeElement = renderProperty("Type: ", body.type);

    const rotationElement = renderProperty(
      "Rotation: ",
      `${body.rotation} hours`
    );

    const circumferenceElement = renderProperty(
      "Circumference: ",
      `${body.circumference} km`
    );

    const tempElement = renderProperty(
      "Temperature: ",
      `Day ${body.temp.day}°C, Night ${body.temp.night}°C`
    );

    const distanceElement = renderProperty(
      "Distance from Sun: ",
      `${body.distance} km`
    );

    const orbitalPeriodElement = renderProperty(
      "Orbital Period: ",
      `${body.orbitalPeriod} days`
    );

    const moonsElement = renderProperty(
      "Moons: ",
      body.moons.join(", ") || "None"
    );

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
