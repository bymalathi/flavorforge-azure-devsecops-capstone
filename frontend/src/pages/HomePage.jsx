import { useEffect, useState } from "react";

import Hero from "../components/Hero/Hero";
import Features from "../components/Features/Features";

import { getHealthStatus } from "../services/healthService";

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

      <section
        style={{
          maxWidth: "1200px",
          margin: "40px auto",
          padding: "20px",
        }}
      >
        <h2>Backend Status</h2>

        {error && <p>❌ {error}</p>}

        {!health && !error && <p>Loading...</p>}

        {health && (
          <div>
            <p>
              <strong>Status:</strong> {health.status}
            </p>

            <p>
              <strong>Application:</strong> {health.application}
            </p>

            <p>
              <strong>Version:</strong> {health.version}
            </p>

            <p>
              <strong>Timestamp:</strong> {health.timestamp}
            </p>
          </div>
        )}
      </section>
    </>
  );
}

export default HomePage;