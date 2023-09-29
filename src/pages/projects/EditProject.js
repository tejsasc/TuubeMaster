import React from "react";
import ProjectForm from "./ProjectForm";
import { useParams } from "react-router-dom";

function EditProject() {
  const param = useParams();

  return (
    <ProjectForm
      proId={param.projectId}
      isEdit={true}
      title="Edit Project"
      submitBtnTxt="Edit Project"
      submittingBtnTxt="Editing"
    />
  );
}

export default EditProject;
