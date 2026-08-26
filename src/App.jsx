import React, { useState } from "react";
import Premium from "./Premium";

export default function App() {
  const [isPremium, setIsPremium] = useState(() => {
    return localStorage.getItem("lifeos_premium") === "true";
  });

  const handleActivatePremium = (status) => {
    setIsPremium(status);
    localStorage.setItem("lifeos_premium", String(status));
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-logo">
          <span className="app-logo-icon">+</span>
          <span>LifeOS</span>
        </div>
      </header>

      <main className="app-content">
        <Premium
          isPremium={isPremium}
          onActivate={handleActivatePremium}
        />
      </main>
    </div>
  );
}
