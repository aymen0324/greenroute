// src/components/Optimizer.tsx
import { useState } from "react";

export default function Optimizer() {
  const [locations, setLocations] = useState(["Valencia", "Madrid", "Barcelona"]);
  const [result, setResult] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);

  const optimizeRoute = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locations }),
      });

      const data = await response.json();
      setResult(data.optimized_route);
    } catch (error) {
      alert("Error al optimizar ruta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#121212] rounded-2xl p-6 shadow-2xl border border-[#2a2a2a] w-full max-w-2xl">
      <h2 className="text-2xl font-semibold mb-4 text-white">Optimizar Ruta</h2>
      <ul className="mb-4 text-gray-300 list-disc list-inside">
        {locations.map((loc, i) => (
          <li key={i}>{loc}</li>
        ))}
      </ul>
      <button
        onClick={optimizeRoute}
        className="bg-gradient-to-r from-green-400 to-lime-500 text-black font-bold py-2 px-6 rounded-full hover:from-green-300 hover:to-lime-400 transition"
      >
        {loading ? "Optimizando..." : "Optimizar"}
      </button>

      {result && (
        <div className="mt-6 text-white">
          <h3 className="font-medium text-lg mb-2">Ruta Optimizada:</h3>
          <p className="text-lime-400">{result.join(" → ")}</p>
        </div>
      )}
    </div>
  );
}
