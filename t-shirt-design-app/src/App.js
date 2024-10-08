import React, { useState, useRef } from 'react';
import htmlToImage from 'html-to-image';
import './App.css'; // For styling

function App() {
  const [image, setImage] = useState(null); // Store the uploaded image
  const tshirtRef = useRef(null); // Ref to capture T-shirt preview

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set uploaded image as base64
      };
      reader.readAsDataURL(file);
    }
  };

  // Download the T-shirt preview as an image
  const handleDownload = () => {
    if (tshirtRef.current) {
      htmlToImage.toPng(tshirtRef.current)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'tshirt-design.png'; // Download the preview
          link.click();
        })
        .catch((error) => {
          console.error('Error generating image', error);
        });
    }
  };

  return (
    <div className="App">
      <h1>Design Your T-shirt</h1>

      {/* Upload Design */}
      <input type="file" onChange={handleImageUpload} accept="image/*" />
      
      {/* T-shirt Preview */}
      <div className="tshirt-preview" ref={tshirtRef}>
        <img src="/tshirt.png" alt="T-shirt" className="tshirt-base" /> {/* T-shirt image */}
        {image && <img src={image} alt="Design" className="uploaded-design" />} {/* Design overlay */}
      </div>

      {/* Download Button */}
      <button onClick={handleDownload}>Download T-shirt Preview</button>
    </div>
  );
}

export default App;
