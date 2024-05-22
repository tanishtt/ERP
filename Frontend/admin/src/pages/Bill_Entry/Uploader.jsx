import React, { useState } from 'react';
import axios from 'axios';

function Uploader({ updateFormInputs }) {
    // State to manage the selected file
    const [file, setFile] = useState(null);

    // Handle file input change
    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Set the selected file to the state
    };

    // Handle form submission
    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('bill-image', file); // Append the selected file to the form data

        try {
            // Make a POST request to the server with the form data
            const response = await axios.post('http://localhost:3000/admin/bill/upload-and-get-gemini-invoice', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Response from server:', response.data); // Log the response data
            updateFormInputs(response.data); // Update form inputs with response data
            alert('Photo uploaded successfully'); // Alert the user on successful upload
        } catch (error) {
            console.error('Error uploading photo: ', error); // Log any errors that occur during the upload
        }
    };

    return (
        <div className="App">
            <h1>Photo Upload App</h1>
            <input type="file" onChange={handleFileChange} /> {/* File input to select a file */}
            <button onClick={handleSubmit}>Upload Photo</button> {/* Button to submit the form */}
        </div>
    );
}

export default Uploader;
