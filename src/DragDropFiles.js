import { useState, useRef, useEffect } from "react";
import React from 'react'
import ReactPlayer from 'react-player'
import axios from "axios";
const DragDropFiles = () => {
  const [files, setFiles] = useState(null);
  const [videoFile,setVideoFile]=useState(null)
    const inputRef = useRef();
  const [upload,setUpload]=useState(null)
   const setData = (event) => {
    setFiles(URL.createObjectURL(event.target.files[0]))
    setVideoFile(event.target.files[0])

  }
    const handleDragOver = (event) => {
        event.preventDefault();
  };

  const handleDrop = (event) => {
      event.preventDefault();
      setFiles(URL.createObjectURL(event.target.files[0]))
      setVideoFile(event.target.files[0])
      
  };



  useEffect(() => {
    if (videoFile)
    {
      handleUpload()
    }
    
  },videoFile)

  // send files to the server // learn from my other video
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", videoFile);
    await axios.post("https://adorable-waistcoat-cow.cyclic.app/upload", formData, {
      onUploadProgress: (data) => {
        setUpload(Math.floor((data.loaded / data.total) * 100));
      },
    })
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  
  if (files) return (
    <div className="main">
        <div className="uploads">
             <div className="dropzone">
             <ReactPlayer url={files} width="100%" height="100%" controls={true} />
            </div>
      </div> 
      <div className="demo-css">
          <div className="progress">
          <div className="progress-wrapper" >
            <div className="progress-inner" style={{ width: `${upload}%` }} ></div>
          </div>
          <div className="progress-info" >{upload}%</div>
        </div>
      </div> 
     </div>  
    
  )

  return (
    <>
      <div className="dropMain">
         <div 
            className="dropzone"
            onDragOver={handleDragOver}
            onDrop={handleDrop}>
          <h3>Drag and Drop Files to Upload</h3>
          <h3>Or</h3>
          <input 
            type="file"
            multiple
            onChange={(event) => setData(event)}
            hidden
            accept="video/*"
            ref={inputRef}
          />
          <button onClick={() => inputRef.current.click()}>Select Files</button>
      </div>
      </div>
        
      



    </>
  );
};

export default DragDropFiles;

 