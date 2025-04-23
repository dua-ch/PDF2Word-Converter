import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add Remix Icons CSS
const remixIconsLink = document.createElement("link");
remixIconsLink.rel = "stylesheet";
remixIconsLink.href = "https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css";
document.head.appendChild(remixIconsLink);

// Add title
const titleElement = document.createElement("title");
titleElement.textContent = "PDF2Word Converter";
document.head.appendChild(titleElement);

// Add Inter font
const interFontLink = document.createElement("link");
interFontLink.rel = "stylesheet";
interFontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap";
document.head.appendChild(interFontLink);

createRoot(document.getElementById("root")!).render(<App />);
