import React, { useEffect, useState } from "react";
// import { ajaxCall } from "../../../helpers/ajaxCall";
// import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
// import { uiAction } from "../../../store/uiStore";
import TTDTSRForm from "../../../components/Parts/TTDTSR/TTDTSRFORM";
import TTDTSRDatabTable from "../../../components/Parts/TTDTSR/TTDTSRDataTable";

const createEquipData = {
  submitBtn: "Add TTD TSR",
  submittingBtn: "Adding TTD TSR",
  title: "Add TTD Tube Seal Rack",
  isEdit: false,
  editId: -1,
};

const editEquipData = {
  submitBtn: "Edit TTD TSR",
  submittingBtn: "Editing TTD TSR",
  title: "Edit TTD Tube Seal Rack",
  isEdit: true,
  editId: 0,
};

const AllTTDTSR = () => {
  const param = useParams();
  // console.log("it is", param.partId);
  const [equipFormData, setEquipFormData] = useState(
    param.partId ? editEquipData : createEquipData
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
  //         heading: "Air Hose",
  //         msg: `Air Hose ${deleteEntryDetails.current.name} Deleted Successfully`,
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
    if (param.partId) {
      setEquipFormData(editEquipData);
    } else {
      setEquipFormData(createEquipData);
    }
    window.scrollTo(0, 0);
  }, [param.partId, location]);

  const cancelEdit = function () {
    setEquipFormData(createEquipData);
  };

  return (
    <>
      <TTDTSRForm
        isWhEdit={false}
        refresh={refreshEquip}
        data={equipFormData}
        editId={param.partId}
        cancelEdit={cancelEdit}
      />
      <TTDTSRDatabTable
        editEquip={editEquip}
        refreshTable={refreshTable}
        setRefreshTable={(data) => {
          setRefreshTable(data);
        }}
      />
    </>
  );
};

export default AllTTDTSR;
