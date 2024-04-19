import React, { useState } from 'react';
import axios from 'axios';

function Uploader({ updateFormInputs }) {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('bill-image', file);

        try {
            const response = await axios.post('http://localhost:3000/admin/bill/upload-and-get-gemini-invoice', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Response from server:', response.data); // Log the response data
            updateFormInputs(response.data); // Update form inputs with response data
            alert('Photo uploaded successfully');
        } catch (error) {
            console.error('Error uploading photo: ', error);
        }
    };

    return (
        <div className="App">
            <h1>Photo Upload App</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleSubmit}>Upload Photo</button>
        </div>
    );
}

export default Uploader;
