// src/api.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Function to fetch celestial bodies data
export const fetchCelestialBodies = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = "https://santosnr6.github.io/Data/space.json";
    try {
        const response = yield fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        return data;
    }
    catch (error) {
        // Specify the type for the error
        if (error instanceof Error) {
            console.error("Error fetching data:", error.message);
        }
        else {
            console.error("Unexpected error:", error);
        }
        return []; // Return an empty array on error
    }
});
