import React, { useState } from 'react';
import './index.css';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';

function Uploader() {

  // State to manage the selected image file and its name
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No selected file");

  return (
    <main>
      {/* Form to handle file upload */}
      <form onClick={() => document.querySelector(".input-field").click()}>
        {/* Hidden file input */}
        <input 
          type="file" 
          accept='image/*' 
          className='input-field' 
          hidden 
          onChange={({ target: {files}}) => {
            // Update file name and preview image on file selection
            files[0] && setFileName(files[0].name);
            if (files) {
              setImage(URL.createObjectURL(files[0]));
            }
          }}
        />

        {/* Display the selected image or upload icon */}
        {image ? (
          <img src={image} width={50} height={50} alt={fileName} />
        ) : (
          <>
            <MdCloudUpload color='black' size={50} />
            <p style={{ color: 'black' }}>Browse Files to upload</p>
          </>
        )}
      </form>

      {/* Section to show the uploaded file details and delete option */}
      <section className='uploaded-row'>
        <AiFillFileImage color='black' />
        <span className='upload-content' style={{ color: 'black' }}>
          {fileName} - 
          <MdDelete 
            onClick={() => {
              // Clear the file name and image on delete
              setFileName("No selected File");
              setImage(null);
            }}
          />
        </span>
      </section>
    </main>
  );
}

export default Uploader;
