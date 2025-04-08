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
        const response = await extension.field.setValue(
          contentItem?.locale
        );
        console.log("setFiedExtension", response);
      } catch (err) {
        console.log("Error setting field value:", err.message);
      }
    };
    if (contentItem?.locale) {
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
        setExtension(sdk);
      } catch (error) {
        console.log("Failed to initialize extension:", error.message);
      }
    };

    initializeExtension();
  }, []);

  return <>hiiii new1</>;
}

export default App;
