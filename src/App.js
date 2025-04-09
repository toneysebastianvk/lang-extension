import "./App.css";
import { useState, useEffect } from "react";
import { init } from "dc-extensions-sdk";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

function App() {
  const [contentItem, setContentItem] = useState(null);
  const [extension, setExtension] = useState(null);

  useEffect(() => {
    const setFiedExtension = async () => {
      try {
        const response = await extension.field.setValue(contentItem?.locale);
        console.log("setFiedExtension", {
          locale: contentItem?.locale,
          response,
        });
      } catch (err) {
        console.log("Error setting field value:", err.message);
      }
    };
    if (!!contentItem?.locale && !!extension) {
      setFiedExtension();
    }
  }, [contentItem]);

  useEffect(() => {
    const getContentItem = async () => {
      const contentItem = await extension.contentItem.getCurrent();
      console.log("contentItemcontentItem= ", contentItem);
      setContentItem(contentItem);
    };
    if (!!extension) {
      getContentItem();
    }
  }, [extension]);

  useEffect(() => {
    const initializeExtension = async () => {
      try {
        console.log("enter initializeExtension");
        const sdk = await init();
        console.log("sdksdksdk= ", sdk)
        setExtension(sdk);
      } catch (error) {
        console.log("Failed to initialize extension:", error.message);
      }
    };

    initializeExtension();
  }, []);

  return <>hiiii new4</>;
}

export default App;
