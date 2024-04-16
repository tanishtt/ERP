import React, { useState } from 'react'
import './index.css'
import { MdCloudUpload, MdDelete } from 'react-icons/md'
import { AiFillFileImage } from 'react-icons/ai'

function Uploader() {

  const [image, setImage] = useState(null)
  const [fileName, setFileName] = useState("No selected file")
  return (
    <main>
      <form 
      onClick={() => document.querySelector(".input-field").click()}>
        <input type="file" accept='image/*' className='input-field' hidden 
        onChange={({ target: {files}}) => {
          files[0] && setFileName(files[0].name)
          if(files){
            setImage(URL.createObjectURL(files[0]))
          }
        }}/>

        {image ?
        <img src={image} width={50} height={50} alt={fileName} />
        :
        <>
        <MdCloudUpload color='black' size={50} />
        <p style={{ color: 'black' }}>Upload Bill</p>
        </>
      }
      </form>

      <section className='uploaded-row'>
        <AiFillFileImage color='black' />
        <span className='upload-content' style={{ color: 'black' }}>
          {fileName} - 
          <MdDelete 
          onClick={() => {
            setFileName("No selected File")
            setImage(null)
          }}
          />
        </span>
      </section>
    </main>
  )
}

export default Uploader
