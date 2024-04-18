import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('photo', file);

    try {
      await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
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

export default App;
