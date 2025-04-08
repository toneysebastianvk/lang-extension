import "./App.css";
import { useState, useEffect } from "react";
import { init } from "dc-extensions-sdk";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

function App() {
  useEffect(() => {
    const initializeExtension = async () => {
      try {
        console.log("enter initializeExtension")
        const sdk = await init();
        console.log("sdksdk= ", sdk)
        const contentItem = await sdk.contentItem.getCurrent();

        console.log("contentItemcontentItem= ", contentItem)

      } catch (error) {
        console.log("Failed to initialize extension:", error.message);
      }
    };

    initializeExtension();
  }, []);

  return (
    <>hiiii</>
  );
}

export default App;
