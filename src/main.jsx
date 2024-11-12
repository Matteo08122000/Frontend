import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BookProvider } from "./contexts/bookcontexts.jsx";
import { DarkModeContextProvider } from "./contexts/DarkModeContext.jsx";
import { SelectedCommentProvider } from "./contexts/SelectedComment.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SelectedCommentProvider>
      <DarkModeContextProvider>
        <BookProvider>
          <App />
        </BookProvider>
      </DarkModeContextProvider>
    </SelectedCommentProvider>
  </StrictMode>
);
