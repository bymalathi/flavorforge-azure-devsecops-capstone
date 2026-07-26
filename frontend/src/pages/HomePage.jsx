import { useEffect, useState } from "react";

import Hero from "../components/Hero/Hero";
import Features from "../components/Features/Features";

import { getHealthStatus } from "../services/healthService";

import BackendStatus from "../components/BackendStatus/BackendStatus";

function HomePage() {
  const [health, setHealth] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadHealth() {
      try {
        const data = await getHealthStatus();
        setHealth(data);
      } catch (err) {
        setError(err.message);
      }
    }

    loadHealth();
  }, []);

  return (
  <>
    <Hero />

    <Features />

    <BackendStatus
      health={health}
      error={error}
    />
  </>
);
}

export default HomePage;