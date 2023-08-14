 /*global chrome*/
import React, { useEffect, useState } from "react";

function createButton(text, onClick) {
  return (
    <button
      style={{
        background: "#efefef",
        padding: "18px",
        border: "none",
        cursor: "pointer",
        color: "#000000",
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

function Title({ counter }) {
  return <p style={{ fontSize: "30px", fontWeight: "700" }}>Clicked: {counter} times</p>;
}

function App() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    chrome.storage.local.get("counter", (result) => {
      if (result.counter) {
        setCounter(result.counter);
      }
    });
  }, []);

  const updateCounter = (value) => {
    let newCounter;
    if (value !== 0) {
      newCounter = counter + value;
    } else {
      newCounter = 0;
    }
    setCounter(newCounter);
    chrome.storage.local.set({ counter: newCounter });
  };

  return (
    <div
      style={{
        background: "#fff",
        border: "2px solid #efefef",
        width: "30%",
        height: "100vh",
        padding: "20px",
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: 9999,
        color: "#000000",
      }}
    >
      <Title counter={counter} />
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        {createButton("+", () => updateCounter(1))}
        {createButton("-", () => updateCounter(-1))}
        {createButton("reset", () => updateCounter(0))}
      </div>
    </div>
  );
}

export default App;
