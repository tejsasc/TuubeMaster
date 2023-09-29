import React, { useEffect, useState } from "react";
// import { Card } from "react-bootstrap";
// import DataTable from "react-data-table-component";
// import { ajaxCall } from "../../../helpers/ajaxCall";
// import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
// import LoadingData from "../../../components/UI/LoadingData";
// import Modal from "../../../components/UI/Modal";
// import { uiAction } from "../../../store/uiStore";

import CalibrationRackForm from "../../../components/calibrationRack/CalibrationRackForm";
import CalibrationRackDataTable from "../../../components/calibrationRack/CalibrationRackDataTable";

const createEquipData = {
  submitBtn: "Add Calibration Rack",
  submittingBtn: "Adding Calibration Rack",
  title: "Add Calibration Rack",
  isEdit: false,
  editId: -1,
};

const editEquipData = {
  submitBtn: "Edit Calibration Rack",
  submittingBtn: "Editing Calibration Rack",
  title: "Edit Calibration Rack",
  isEdit: true,
  editId: 0,
};
const AllCalibrationRack = () => {
  const param = useParams();
  // console.log("it is", param.csId);
  const [equipFormData, setEquipFormData] = useState(
    param.csId ? editEquipData : createEquipData
  );
  const [refreshTable, setRefreshTable] = useState(true);
  // const authData = useSelector((state) => state.authStore);
  // const [isLoadingData, setIsLoadingData] = useState(false);
  const refreshEquip = function () {
    setRefreshTable(true);
  };
  // const deleteEntryDetails = useRef({});
  // const [promptStatus, setPromptStatus] = useState(false);
  // const totalRows = useRef(0);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const [isFetchErr, setFetchErr] = useState(null);

  // const promptDelete = (project_name, deleteId) => {
  //   setPromptStatus(true);
  //   deleteEntryDetails.current = { name: project_name, id: deleteId };
  // };

  // const deleteWarehouse = async function (deleteId) {
  //   setIsLoadingData(true);
  //   const response = await ajaxCall(
  //     `/get/warehouse/${deleteId}/`,
  //     {
  //       headers: {
  //         Accept: "application/json",
  //         Authorization: `Bearer ${authData.accessToken}`,
  //       },
  //       method: "DELETE",

  //       // signal,
  //     },
  //     8000
  //   );
  //   if (response.status === 204) {
  //     dispatch(
  //       uiAction.setNotification({
  //         show: true,
  //         heading: "Calibration Rack",
  //         msg: `Calibration Rack ${deleteEntryDetails.current.name} Deleted Successfully`,
  //       })
  //     );
  //   }
  //   console.log("response is ", response);
  //   // if (response !== true) {
  //   //   setThrowErr({ ...response, page: "enquiries" });
  //   //   return;
  //   // }
  //   // dispatch(
  //   //   uiAction.setNotification({
  //   //     show: true,
  //   //     heading: "Enquiry Deleted Successfully",
  //   //     msg: `<strong>${deleteEntryDetails.current.name}</strong> enquiry Deleted successfully`,
  //   //   })
  //   // );
  //   deleteEntryDetails.current = {};

  //   // getEquip();
  //   // setEnqData([]);
  // };

  const editEquip = function (editId) {
    window.scrollTo(0, 0);
    setEquipFormData({ ...editEquipData, editId });
  };

  const location = useLocation();

  useEffect(() => {
    console.log("history changed", location);
    console.log(param.csId);
    if (param.csId) {
      setEquipFormData(editEquipData);
    } else {
      setEquipFormData(createEquipData);
    }
    window.scrollTo(0, 0);
  }, [param.csId, location]);

  const cancelEdit = function () {
    setEquipFormData(createEquipData);
  };
  return (
    <>
      <CalibrationRackForm
        isWhEdit={false}
        refresh={refreshEquip}
        data={equipFormData}
        editId={param.csId}
        cancelEdit={cancelEdit}
      />
      <CalibrationRackDataTable
        editEquip={editEquip}
        refreshTable={refreshTable}
        setRefreshTable={(data) => {
          setRefreshTable(data);
        }}
      />
    </>
  );
};

export default AllCalibrationRack;
