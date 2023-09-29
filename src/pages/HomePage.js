import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
// import DataTable from "react-data-table-component";
// import { useSelector } from "react-redux";
// import { ajaxCall } from "../helpers/ajaxCall";
// import LoadingData from "../components/UI/LoadingData";
// import { Link } from "react-router-dom";
import ProjectDT from "../components/Dashboard/ProjectDT";
// import SelectSearch from "react-select-search";
import Projects from "./projects/Projects";

const HomePage = () => {
  // const [projects, setProjects] = useState([]);
  // const authData = useSelector((state) => state.authStore);
  // const [isLoadingData, setIsLoadingData] = useState(false);
  // const [isFetchErr, setFetchErr] = useState(null);
  const [refreshTable, setRefreshTable] = useState(true);
  const [key, setKey] = useState("onGoingP");
  // const columns = [
  //   {
  //     name: "Project Name",
  //     selector: (row) => (
  //       <Link to={`project/edit/${row.id}`}>
  //         {row.projectName ? row.projectName : "-"}
  //       </Link>
  //     ),
  //     sortable: true,
  //     //   omit: columnData.name,    selector: (row) => row.student_email, grow: 1,
  //   },
  //   {
  //     name: "Client Name",
  //     selector: (row) => (
  //       <Link to={`project/edit/${row.id}`}>
  //         {row.clientName ? row.clientName : "-"}
  //       </Link>
  //     ),
  //     sortable: true,
  //   },
  //   {
  //     name: "Unit Name",
  //     selector: (row) => (
  //       <Link to={`project/edit/${row.id}`}>
  //         {row.unitName ? row.unitName : "-"}
  //       </Link>
  //     ),
  //     sortable: true,
  //   },
  //   {
  //     name: "Project Start",
  //     selector: (row) => (
  //       <Link to={`project/edit/${row.id}`}>
  //         {row.projectStart ? row.projectStart : "-"}
  //       </Link>
  //     ),
  //   },
  //   {
  //     name: "Project End",
  //     selector: (row) => (
  //       <Link to={`project/edit/${row.id}`}>
  //         {row.projectEnd ? row.projectEnd : "-"}
  //       </Link>
  //     ),
  //   },
  // ];

  // const getProjects = async () => {
  //   setIsLoadingData(true);
  //   const response = await ajaxCall(
  //     `/listproject/?ordering=-created_at&records=5`,
  //     {
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${authData.accessToken}`,
  //       },
  //       method: "GET",

  //       // signal,
  //     },
  //     8000
  //     // timeOutFunction
  //   );
  //   if (response.status !== 200) {
  //     setIsLoadingData(false);
  //     setProjects([]);
  //     setFetchErr("Some Problem Occured Please try again");
  //     return;
  //   }
  //   console.log(response);
  //   // if (response.status === 200) {
  //   //   // throw new Error("API call failed with status code " + response.status);
  //   //   setErr("API call failed with status code ");
  //   // }
  //   setProjects(() => {
  //     return response.data?.results.map((data) => {
  //       return {
  //         id: data?.id,
  //         projectNumber: data?.project_number,
  //         projectName: data?.project_name,
  //         clientName: data?.client?.official_name,
  //         projectStart: data?.project_start,
  //         projectEnd: data?.project_end,
  //         unitName: data?.unit?.name_of_unit,
  //         contract: data?.contract,
  //         equipmentDeliveryTM: data?.equipment_delivery_tubemaster,
  //       };
  //     });
  //   });
  //   setIsLoadingData(false);
  // };

  return (
    <>
      <Tabs
        defaultActiveKey="equip"
        id="fill-tab-example"
        className="mb-3"
        fill
        activeKey={key}
        onSelect={(k) => {
          setKey(k);
        }}
      >
        <Tab eventKey="onGoingP" title="Ongoing Projects">
          <ProjectDT
            title="Ongoing Projects"
            setRefreshTable={setRefreshTable}
            refreshTable={refreshTable}
            statusVal={0}
          />
        </Tab>
        <Tab eventKey="upcomingP" title="Upcoming Projects">
          <ProjectDT
            title="Upcoming Projects"
            setRefreshTable={setRefreshTable}
            refreshTable={refreshTable}
            statusVal={1}
          />
        </Tab>
        <Tab eventKey="allP" title="All Projects">
          <Projects
            title="All Projects"
            setRefreshTable={setRefreshTable}
            refreshTable={refreshTable}
            statusVal={1}
          />
        </Tab>
      </Tabs>
    </>
  );
};

export default HomePage;
