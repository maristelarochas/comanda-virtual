// src/components/Button.tsx
import React from "react";

export function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 20px",
        color: "#000",
        border: "none",
        borderRadius: 6,
        cursor: "pointer"
      }}
    >
      {children}
    </button>
  );
}
