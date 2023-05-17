import React, { useRef, useState, useEffect } from "react";
import Button from "./Button";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files || event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(pickedFile, fileIsValid);
  };

  return (
    <div className="flex mt-3 justify-between items-center w-[100%]">
      <label htmlFor="image" className="text-2xl text-[#C75D2C]">
        Profilna slika
      </label>
      <input
        className="ml-4"
        id="image"
        ref={filePickerRef}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
