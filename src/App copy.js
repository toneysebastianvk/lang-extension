import "./App.css";
import { useState, useEffect } from "react";
import { init } from "dc-extensions-sdk";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

function App() {
  const [searchParam, setSearchParam] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [contentFieldExtension, setContentFieldExtension] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [contentTypeValue, setContentTypeValue] = useState("");
  const [url, setUrl] = useState("");
  const [marketingprojectasset, setMarketingprojectasset] = useState("");
  const [marketingGlobalResources, setMarketingGlobalResources] = useState("");
  const [assetName, setAssetName] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const URL =
    "https://content-extension-backend-8c85lzecj-aswini-k-valsans-projects.vercel.app/api/v1/assets";
  useEffect(() => {
    const initializeExtension = async () => {
      try {
        const extension = await init();
        setContentFieldExtension(extension);
        extension.frame.startAutoResizer();
        const savedValue = await extension.field.getValue();
        console.log("savedValue", savedValue);
        if (savedValue !== undefined) {
          setAssetName(savedValue["name"]);
          /* setMarketingprojectasset(
            savedValue["dam:marketingprojectasset"]
              ? savedValue["dam:marketingprojectasset"]
              : ""
          ); */
          /* setMarketingGlobalResources(
            savedValue["dam:marketingGlobalResources"]
              ? savedValue["dam:marketingGlobalResources"]
              : ""
          ); */
          setImageSrc(savedValue["Dynamic Media Scene 7 URL"]);
        }
      } catch (error) {
        console.log("Failed to initialize extension:", error.message);
      }
    };

    initializeExtension();
  }, []);

  useEffect(() => {
    const setFiedExtension = async () => {
      if (contentFieldExtension) {
        try {
          const response = await contentFieldExtension.field.setValue({
            name: assetName,
            "Dynamic Media Scene 7 URL": imageSrc,
            /*  [marketingprojectasset
            ? "dam:marketingprojectasset"
            : "dam:marketingGlobalResources"]:
            marketingprojectasset !== ""
              ? marketingprojectasset
              : marketingGlobalResources, */
          });
        } catch (err) {
          console.log("Error setting field value:", err.message);
        }
      }
    };
    console.log(assetName, imageSrc);
    setFiedExtension();
  }, [assetName, imageSrc]);
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchParam(value);
    setError(null);
  };
  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };
  const handleImageSelectSubmit = async (e) => {
    setIsModalOpen(false);
    setImageSrc("");
    setAssetName("");
    setMarketingGlobalResources("");
    setMarketingprojectasset("");
    setContentTypeValue("");
    // const value = e.target.src;
    console.log("selectedImage", selectedImage);
    setImageSrc(selectedImage["Dynamic Media Scene 7 URL"]);
    setAssetName(selectedImage.name);
    /* setMarketingprojectasset(
      selectedImage["dam:marketingprojectasset"]
        ? selectedImage["dam:marketingprojectasset"]
        : ""
    );
    setMarketingGlobalResources(
      selectedImage["dam:marketingGlobalResources"] != ""
        ? selectedImage["dam:marketingGlobalResources"]
        : ""
    ); */
    setContentTypeValue(selectedImage);
  };
  const handleSubmit = async (event) => {
    setImageUrls([]);
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${URL}/searchAssets`, {
        params: {
          materialCode: searchParam,
        },
      });
      setImageUrls(response.data[0].results);
      setLoading(false);
    } catch (err) {
      setError("Error fetching images. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  const handleReset = async () => {
    setImageUrls([]);
    setSearchParam("");
    fetchImages();
  };

  const fetchImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${URL}/getModifiedAssets`, {
        params: {
          lastModified: 14,
        },
      });
      setImageUrls(response.data[0].results);
      setLoading(false);
    } catch (err) {
      setError("Error fetching images. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = async () => {
    setIsModalOpen(true);
    await fetchImages();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="App">
      <div className="ampx-input__container ampx-input__container--disabled">
        <label className="ampx-input__label">Name</label>
        <input className="ampx-input" type="text" value={assetName} />
      </div>
      {/*  <div className="ampx-input__container ampx-input__container--disabled">
        <label className="ampx-input__label">Asset Type</label>
        <input
          className="ampx-input"
          type="text"
          value={
            marketingprojectasset
              ? marketingprojectasset
              : marketingGlobalResources
          }
        />
      </div> */}
      <div className="image-grid-container">
        {!imageSrc ? (
          <button onClick={openModal} className="add-image-button">
            +
          </button>
        ) : (
          <div className="image-tile">
            <img
              src={imageSrc}
              //onClick={handleClick}
              alt={imageSrc.split("/").pop()}
            />
            <div className="button-container">
              <button className="button" onClick={openModal}>
                Edit
              </button>
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <div className="modal-content">
          <h2>Select an Image</h2>
          <button onClick={closeModal} className="close-modal-button">
            X
          </button>
          {
            <button
              onClick={handleImageSelectSubmit}
              className="select-image-button"
            >
              Select Image
            </button>
          }
          {/*  <div class="search-container">
            <input
              className="search-box"
              type="text"
              placeholder="Search by Material Code"
              value={searchParam}
              onChange={handleInputChange}
            />
            <button className="search-btn" onClick={handleSubmit}>
              Search
            </button>
            <button className="reset-btn" onClick={handleReset}>
              Reset
            </button>
          </div> */}
          {loading && (
            <p className=".ampx-input__container--disabled">
              Loading images...
            </p>
          )}
          {error && (
            <p className=".ampx-input__container--error .ampx-input__description">
              {error}
            </p>
          )}

          {imageUrls && imageUrls.length > 0 ? (
            <div className="image-grid-container">
              {imageUrls.map((imageSrc, index) => (
                <div key={index} className="image-tile">
                  {imageSrc && (
                    <img
                      src={imageSrc["Dynamic Media Scene 7 URL"]}
                      // onClick={handleClick}
                      alt={imageSrc["Dynamic Media Scene 7 URL"]
                        .split("/")
                        .pop()}
                    />
                  )}
                  <input
                    type="radio"
                    name="selected-image"
                    checked={selectedImage?.name === imageSrc.name}
                    onChange={() => handleImageSelect(imageSrc)}
                    className="select-image-checkbox"
                  />
                  {/* <div className="filename">{imageSrc.split("/").pop()}</div> */}
                  {/*   <div className="button-container">
            <button className="button">Edit</button>
            <button className="button">Delete</button>
          </div> */}
                </div>
              ))}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default App;
