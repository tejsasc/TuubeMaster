import React from "react";
import { Form } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";
// import { useSelector } from "react-redux";
// import axios from "axios";

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

const FileUpload = (props) => {
  // console.log(props.afile);
  // const [file, setFile] = useState(null);
  // const handleChange = (file) => {
  //   setFile(file);
  // };
  // const authData = useSelector((state) => state.authStore);
  const fileName =
    props.isEdit && !(props.afile instanceof File)
      ? props.afile
        ? props.afile.split("/").reduce((acc, path) => {
            return path;
          }, "")
        : "No file uploaded yet"
      : props.afile
      ? `File name: ${props.afile.name}`
      : "No files uploaded yet";
  // console.log("filee name is", fileName);
  const imgSource =
    props.afile instanceof File
      ? URL.createObjectURL(props.afile)
      : props.afile;
  return (
    <>
      <div class="row">
        <Form.Group controlId={props.groupId} className={props.groupClassName}>
          <Form.Label className="reesumeLabel">{props.label}</Form.Label>

          <FileUploader
            handleChange={props.onChange}
            // handleChange={onChangeFile}
            onDrop={(file) => {
              // console.log("file is", file);
            }}
            onSelect={(file) => {
              // console.log("file is", file);
            }}
            name={props.fieldName}
            types={fileTypes}
            hoverTitle={props.title}
            minSize={props.minUploadSize}
            maxSize={props.maxUploadSize}
          />
          <p>{fileName}</p>
        </Form.Group>
        <div className="col-md-6 preview">
          {imgSource ? (
            props.afile instanceof File ? (
              <img src={imgSource} alt="TTD" />
            ) : (
              <a href={imgSource}>
                <img src={imgSource} alt="TTD" />
              </a>
            )
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default FileUpload;
