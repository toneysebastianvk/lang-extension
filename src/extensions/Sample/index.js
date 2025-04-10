// import "./App.css";
import { useState, useEffect } from "react";
import { init } from "dc-extensions-sdk";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

function SampleExtn() {
  const [contentItem, setContentItem] = useState(null);
  const [extension, setExtension] = useState(null);

  useEffect(() => {
    const getContentItem = async () => {
      const response = await extension.field.setValue("1234");
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

  return <>sample extn</>;
}

export default SampleExtn;
