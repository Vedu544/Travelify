import React from 'react'
import axios from 'axios'

const PhotosUploader = ({addedPhotos = [],onChange}) => {

    function uploadPhoto(e) {
        const files = e.target.files;
    
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
          data.append("photos", files[i]);
        }
    
        axios
          .post("http://localhost:3000/api/properties/postProperties", data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            const { data: filenames } = response;
            onChange((prevPhotos = []) => [...prevPhotos, ...filenames]); // Ensure prevPhotos is an array
          })
          .catch((error) => {
            console.error("Error uploading files:", error.message);
          });
      }
     
      function removePhoto(e,filename) {
        e.preventDefault();
        onChange([...addedPhotos.filter((photo) => photo !== filename)]);
      }
    
      function selectAsMainPhoto(e,filename) {
        e.preventDefault();
        onChange([filename,...addedPhotos.filter(photo => photo !== filename)]);
      }

  return (
    <>
      <div className="mt-2 relative grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2 ">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link) => (
            <div key={link} className="relative">
              <img
                className="h-60 w-full object-cover rounded-2xl"
                src={"http://localhost:3000/uploads/" + link}
                alt=""
              />
              <button onClick={e => removePhoto(e,link)}
                className="absolute bottom-1 right-1 text-white bg-black bg-opacity-50 rounded-2xl py-1 px-1 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
              <button onClick={e => selectAsMainPhoto(e,link)} className="cursor-pointer absolute bottom-1 left-1 text-white bg-black bg-opacity-50 rounded-2xl py-1 px-1">
                {link === addedPhotos[0] && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                )}
                {link !== addedPhotos[0] && (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                )}
              </button>
            </div>
          ))}
        <label className="flex items-center justify-center gap-1 border bg-transparent rounded-2xl p-4 text-1xl text-grey-600 cursor-pointer">
          <input type="file" multiple className="hidden" onChange={uploadPhoto} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6 6 0 0 0-5.98 6.496A5.25 5.25 0 0 0 6.75 20.25H18a4.5 4.5 0 0 0 2.206-8.423 3.75 3.75 0 0 0-4.133-4.303A6.001 6.001 0 0 0 10.5 3.75Zm2.03 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v4.94a.75.75 0 0 0 1.5 0v-4.94l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
              clipRule="evenodd"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
}

export default PhotosUploader