import React, { useEffect, useState } from "react";
// import { Card } from "react-bootstrap";
// import DataTable from "react-data-table-component";
// import { ajaxCall } from "../../../helpers/ajaxCall";
// import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
// import LoadingData from "../../../components/UI/LoadingData";
// import Modal from "../../../components/UI/Modal";
// import { uiActison } from "../../../store/uiStore";
import TTDForm from "../../../components/TTD/TTDForm";
import TTDDatatable from "../../../components/TTD/TTDDatatable";

const createEquipData = {
  submitBtn: "Add TTD",
  submittingBtn: "Adding TTD",
  title: "Add TTD",
  isEdit: false,
  editId: -1,
};

const editEquipData = {
  submitBtn: "Edit TTD",
  submittingBtn: "Editing TTD",
  title: "Edit TTD",
  isEdit: true,
  editId: 0,
};

const AllTTD = () => {
  const param = useParams();
  const [equipFormData, setEquipFormData] = useState(
    param.ttdId ? editEquipData : createEquipData
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
    console.log(param.ttdId);
    if (param.ttdId) {
      setEquipFormData(editEquipData);
    } else {
      setEquipFormData(createEquipData);
    }
    window.scrollTo(0, 0);
  }, [param.ttdId, location]);

  const cancelEdit = function () {
    setEquipFormData(createEquipData);
  };

  return (
    <>
      <div className="col-md-12">
        <TTDForm
          isWhEdit={false}
          refresh={refreshEquip}
          data={equipFormData}
          editId={param.ttdId}
          cancelEdit={cancelEdit}
        />
        <TTDDatatable
          editEquip={editEquip}
          refreshTable={refreshTable}
          setRefreshTable={(data) => {
            setRefreshTable(data);
          }}
        />
      </div>
    </>
  );
};

export default AllTTD;
