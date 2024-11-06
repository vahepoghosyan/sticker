import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/global.scss";
import Notes from "./components/Notes/Notes.tsx";
import Layout from "./components/Layout/Layout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Layout>
      <Notes />
    </Layout>
  </StrictMode>
);
