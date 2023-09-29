import React, { useEffect, useState } from "react";
// import { Card } from "react-bootstrap";
// import DataTable from "react-data-table-component";
// import { ajaxCall } from "../../../helpers/ajaxCall";
// import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
// import LoadingData from "../../../components/UI/LoadingData";
// import Modal from "../../../components/UI/Modal";
// import { uiAction } from "../../../store/uiStore";
import SwabMasterForm from "../../../components/swabMaster/SwabMasterForm";
import SwabMasterDatabTable from "../../../components/swabMaster/SwabmasterDataTable";

const createEquipData = {
  submitBtn: "Add SwabMaster",
  submittingBtn: "Adding SwabMaster",
  title: "Add SwabMaster",
  isEdit: false,
  editId: -1,
};

const editEquipData = {
  submitBtn: "Edit SwabMaster",
  submittingBtn: "Editing SwabMaster",
  title: "Edit SwabMaster",
  isEdit: true,
  editId: 0,
};

const AllSwabMaster = () => {
  const param = useParams();
  // console.log("it is", param.smId);
  const [equipFormData, setEquipFormData] = useState(
    param.smId ? editEquipData : createEquipData
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
  //         heading: "TTD",
  //         msg: `TTD ${deleteEntryDetails.current.name} Deleted Successfully`,
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
    console.log(param.smId);
    if (param.smId) {
      setEquipFormData(editEquipData);
    } else {
      setEquipFormData(createEquipData);
    }
    window.scrollTo(0, 0);
  }, [param.smId, location]);

  const cancelEdit = function () {
    setEquipFormData(createEquipData);
  };

  return (
    <>
      <SwabMasterForm
        isWhEdit={false}
        refresh={refreshEquip}
        data={equipFormData}
        editId={param.smId}
        cancelEdit={cancelEdit}
      />
      <SwabMasterDatabTable
        editEquip={editEquip}
        refreshTable={refreshTable}
        setRefreshTable={(data) => {
          setRefreshTable(data);
        }}
      />
    </>
  );
};

export default AllSwabMaster;
