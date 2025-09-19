"use client";

import { useState } from "react";

export function ShowReasoning({ reasoning }: { reasoning: string }) {
  const [showReasoning, setShowReasoning] = useState<boolean>(false);

  return (
    <div
      onClick={() => setShowReasoning(!showReasoning)}
      className=" rounded-lg p-2 text-xs cursor-pointer"
    >
      <div className="font-light">Thinking...</div>
      <div className={`${showReasoning ? "block" : "hidden"}`}>{reasoning}</div>
    </div>
  );
}

export function ShowWeatherTool({ weather }: { weather: string }) {
  const [showWeather, setShowWeather] = useState<boolean>(false);

  return (
    <div
      onClick={() => setShowWeather(!showWeather)}
      className="rounded-lg p-2 text-xs cursor-pointer"
    >
      <div className="font-light">Tool Call: Weather Tool</div>
      <div className={`${showWeather ? "block" : "hidden"}`}>
        Weather: {weather}
      </div>
    </div>
  );
}
