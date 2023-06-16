import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.js";
import { StateContextProvider } from './context';
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "./styles/globals.css";



const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
  <ThirdwebProvider activeChain={ChainId.Goerli}> 
    <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Router>
  </ThirdwebProvider> 
  </React.StrictMode>
);
