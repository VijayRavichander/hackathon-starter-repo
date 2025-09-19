import { tool } from "ai";
import { z } from "zod";

const getWeather = tool({
    description: "Get the current weather for a location.", 
    inputSchema: z.object({
        location: z.string().describe("City or location name, e.g., 'San Francisco'"),
        unit: z.enum(["c", "f"]).default("c").describe("Temperature unit"),
    }),
    execute: async ({ location, unit }) => {
        const temperatureCelsius = 30;
        const temperatureFahrenheit = Math.round((temperatureCelsius * 9) / 5 + 32);
        const temperature = unit === "f" ? `${temperatureFahrenheit} °F` : `${temperatureCelsius} °C`;
        return {
            location,
            unit,
            temperature,
            message: `The weather in ${location} is ${temperature}`
        };
    },
});

export { getWeather };