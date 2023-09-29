import React, { useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { ajaxCall } from "../../helpers/ajaxCall";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import ShowProject from "../../components/projects/ShowProject";
import LoadingData from "../../components/UI/LoadingData";
// import Modal from "../../components/UI/Modal";
// import { uiAction } from "../../store/uiStore";
import WareHouseForm from "./WareHouseForm";
import countryList from "react-select-country-list";
import useDTColumns from "../../hooks/useDTTable";

const createWareHouseData = {
  submitBtn: "Add Warehouse",
  submittingBtn: "Adding Warehouse",
  title: "Add Warehouse",
  isEdit: false,
  editId: -1,
};

const editWareHouseData = {
  submitBtn: "Edit Warehouse",
  submittingBtn: "Editing Warehouse",
  title: "Edit Warehouse",
  isEdit: true,
  editId: 0,
};

const AllWarehouses = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [refreshTable, setRefreshTable] = useState(true);
  const refreshWarehouses = function () {
    setRefreshTable(true);
  };
  const [warehouseFormData, setWarehouseFormData] =
    useState(createWareHouseData);
  const authData = useSelector((state) => state.authStore);
  const [pageNo, setPageNo] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [isLoadingData, setIsLoadingData] = useState(false);
  // const [err, setErr] = useState();
  // const deleteEntryDetails = useRef({});
  // const [promptStatus, setPromptStatus] = useState(false);
  const totalRows = useRef(0);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [isFetchErr, setFetchErr] = useState(null);

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
  //         heading: "Project",
  //         msg: `Warehouse ${deleteEntryDetails.current.name} Deleted Successfully`,
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

  //   getWarehouses();
  //   // setEnqData([]);
  // };

  const editWareHouse = function (editId) {
    window.scrollTo(0, 0);
    setWarehouseFormData({ ...editWareHouseData, editId: editId });
  };

  const getWarehouses = async () => {
    setIsLoadingData(true);
    const response = await ajaxCall(
      `/get/warehouse/?ordering=-created_at&p=${pageNo}&records=${perPage}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authData.accessToken}`,
        },
        method: "GET",

        // signal,
      },
      8000
      // timeOutFunction
    );
    if (response.status !== 200) {
      setIsLoadingData(false);
      setWarehouses([]);
      setFetchErr("Some Problem Occured Please try again");
      return;
    }
    // console.log(response);
    // if (response.status === 200) {
    //   // throw new Error("API call failed with status code " + response.status);
    //   setErr("API call failed with status code ");
    // }
    totalRows.current = response.data?.count;
    setWarehouses(response.data.results);
    setIsLoadingData(false);
    setRefreshTable(false);
  };

  useEffect(() => {
    console.log("---1-->", refreshTable);
    if (refreshTable) console.log("---2-->");
    getWarehouses();
  }, [refreshTable, perPage, pageNo]);

  const columns = [
    {
      cell: (row) => (
        <>
          <Link
            className="projectAction"
            title="Warehouse Dashboard"
            to={`./${row.slug}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-eye"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </Link>
          <button
            className="projectAction"
            title="Edit Warehouse"
            onClick={editWareHouse.bind(null, row.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-edit-2 p-1 br-8 mb-1"
            >
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
            </svg>
          </button>
          {/* <button
            className="projectAction"
            title="Delete Warehouse"
            onClick={() => {
              promptDelete(row.projectName, row.id);
              // deleteEnquiry(row.id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-trash p-1 br-8 mb-1"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button> */}
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "Name",
      selector: (row) => row.warehouse_name,
      sortable: true,
      //   omit: columnData.name,    selector: (row) => row.student_email, grow: 1,
    },
    {
      name: "Location",
      selector: (row) => row.warehouse_location,
      sortable: true,
      //   omit: columnData.name,    selector: (row) => row.student_email, grow: 1,
    },
    {
      name: "Contact Number",
      selector: (row) => row.warehouse_contact,
      sortable: true,
    },
    {
      name: "Email Id",
      selector: (row) => row.warehouse_email,
      sortable: true,
    },
    {
      name: "Manager",
      selector: (row) => row.warehouse_manager,
    },
    {
      name: "Country",
      selector: (row) => countryList().getLabel(row.country),
    },
  ];

  const [cols, setCols, changeCols, renderColBtns] = useDTColumns(columns);

  const cancelEdit = function () {
    setWarehouseFormData(createWareHouseData);
  };
  if (isFetchErr) {
    return (
      <>
        <WareHouseForm
          refresh={refreshWarehouses}
          data={warehouseFormData}
          cancelEdit={cancelEdit}
        />
        <Card className="mt-3 col-md-12">
          <Card.Body>
            <p className="text-center dangour">{isFetchErr}</p>
          </Card.Body>
        </Card>
      </>
    );
  } else
    return (
      <>
        <WareHouseForm
          refresh={refreshWarehouses}
          data={warehouseFormData}
          cancelEdit={cancelEdit}
        />
        <Card className="mt-3 col-md-12">
          <Card.Body>
            <Card.Title className="mb-3">All Warehouses</Card.Title>
            <div>
              {renderColBtns()}
              <DataTable
                paginationRowsPerPageOptions={[10, 30, 50, 75, 100, 125]}
                paginationPerPage={10}
                onChangePage={(page) => {
                  setPageNo(page);
                  setWarehouses([]);
                }}
                columns={cols}
                data={warehouses}
                onChangeRowsPerPage={(newPerPage, page) => {
                  setPerPage(newPerPage);
                  setPageNo(page);
                }}
                pagination
                paginationServer
                progressPending={isLoadingData}
                progressComponent={
                  <LoadingData className="loading-spinner-flex" />
                }
                paginationTotalRows={totalRows.current}
                key={totalRows.current}
              />
            </div>
          </Card.Body>
        </Card>
      </>
    );
};

export default AllWarehouses;
