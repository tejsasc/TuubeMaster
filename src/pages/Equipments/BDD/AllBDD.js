import React, { useEffect, useState } from "react";
// import { Card } from "react-bootstrap";
// import DataTable from "react-data-table-component";
// import { ajaxCall } from "../../../helpers/ajaxCall";
// import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
// import LoadingData from "../../../components/UI/LoadingData";
// import Modal from "../../../components/UI/Modal";
// import { uiAction } from "../../../store/uiStore";

import BDDForm from "../../../components/BDD/BDDForm";
import BDDDataTable from "../../../components/BDD/BDDDataTable";

const createEquipData = {
  submitBtn: "Add BDD",
  submittingBtn: "Adding BDD",
  title: "Add BDD",
  isEdit: false,
  editId: -1,
};

const editEquipData = {
  submitBtn: "Edit BDD",
  submittingBtn: "Editing BDD",
  title: "Edit BDD",
  isEdit: true,
  editId: 0,
};
const AllBDD = () => {
  const param = useParams();
  // console.log("it is", param.bddId);
  const [equipFormData, setEquipFormData] = useState(
    param.bddId ? editEquipData : createEquipData
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
    console.log(param.bddId);
    if (param.bddId) {
      setEquipFormData(editEquipData);
    } else {
      setEquipFormData(createEquipData);
    }
    window.scrollTo(0, 0);
  }, [param.bddId, location]);

  const cancelEdit = function () {
    setEquipFormData(createEquipData);
  };
  return (
    <>
      <BDDForm
        isWhEdit={false}
        refresh={refreshEquip}
        data={equipFormData}
        editId={param.bddId}
        cancelEdit={cancelEdit}
      />
      <BDDDataTable
        editEquip={editEquip}
        refreshTable={refreshTable}
        setRefreshTable={(data) => {
          setRefreshTable(data);
        }}
      />
    </>
  );
};

export default AllBDD;
