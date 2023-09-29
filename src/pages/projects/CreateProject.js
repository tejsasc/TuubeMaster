import React from "react";
import ProjectForm from "./ProjectForm";
// import { ajaxCall } from "../../helpers/ajaxCall";

const CreateProject = () => {
  // useEffect(() => {
  //   const ajax = async () => {
  //     await ajaxCall("https://stackoverflow.com/rrwsfdsfs");

  //     // console.log(ajax);
  //   };
  //   // ajax();
  // }, []);

  return (
    <ProjectForm
      isEdit={false}
      title="Create Project"
      submitBtnTxt="Create Project"
      submittingBtnTxt="Creating"
    />
  );
};

export default CreateProject;
