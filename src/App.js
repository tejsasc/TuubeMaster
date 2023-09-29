import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  // createHashRouter,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Base from "./components/UI/Base";
import "./assets/css/base.scss";
import CreateProject from "./pages/projects/CreateProject";
import Projects from "./pages/projects/Projects";
import Error from "./components/Error";
import ProtectedRoute from "./components/ProtectedRoute";
import EditProject from "./pages/projects/EditProject";
import HomePage from "./pages/HomePage";
// import BDD from "./components/equipForm/BDD";
// import CalibrationRacks from "./components/equipForm/CalibrationRacks";
// import SwabMaster from "./components/equipForm/SwabMasters";
// import AirHose from "./components/partForm/AirHose";
// import BddTubeSealRacks from "./components/partForm/BddTubeSealRacks";
// import CalibrationOrifices from "./components/partForm/CalibrationOrifices";
// import DeviceHose from "./components/partForm/DeviceHose";
// import PressureSensors from "./components/partForm/PressureSensors";
// import SupplyOrifices from "./components/partForm/SupplyOrifices";
// import SwabMasterTubeSealRacks from "./components/partForm/SwabMasterTubeSealRacks";
// import TDDTSR from "./components/partForm/TDDTSR";

import AllWarehouses from "./pages/WareHouse/AllWarehouses";
// import AddWareHouse from "./pages/WareHouse/WareHouseForm";
import WareHouseDashBoard from "./pages/WareHouse/WareHouseDashBoard";
import AllTTD from "./pages/Equipments/TTD/AllTTD";
import AllBDD from "./pages/Equipments/BDD/AllBDD";
import AllCalibrationRack from "./pages/Equipments/CalibrationRack/AllCalibrationRack";
import AllSwabMaster from "./pages/Equipments/SwabMaster/AllSwabMaster";
import AllAirHose from "./pages/Parts/AirHose/AllAirHose";
import AllBddTsr from "./pages/Parts/BddTsr/AllBddTsr";
import AllCalibrationOrifices from "./pages/Parts/CalibrationOrifice/AllCalibrationOrifices";
import AllDeviceHose from "./pages/Parts/DeviceHose/AllDeviceHose";
import AllPressureSensor from "./pages/Parts/PressureSensors/AllPressureSensor";
import AllSMTSR from "./pages/Parts/SMTSR/AllSMTSR";
import AllTTDTSR from "./pages/Parts/TTDTSR/AllTTDTSR";
import AllSupplyOrifice from "./pages/Parts/SupplyOrifices/AllSupplyOrifice";
import AllGeneralParts from "./pages/Parts/AllGeneralParts/AllGeneralParts";
import Search from "./pages/Search";
import Client from "./components/Client/Client";
import ClientDashBoard from "./components/Client/ClientDashBoard";
import PlantDatatable from "./components/Client/Plant/PlantDatatable";
import UnitDatatable from "./components/Client/Unit/UnitDatatable";
import ReactorDatatable from "./components/Client/Reactor/ReactorDatatable";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Base />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/client",
        element: <Client />,
      },
      {
        path: "/plant",
        element: <PlantDatatable />,
      },
      {
        path: "/unit",
        element: <UnitDatatable />,
      },
      {
        path: "/reactor",
        element: <ReactorDatatable />,
      },
      {
        path: "client/:clientId",
        element: <ClientDashBoard />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "project",
        element: <Navigate to="/projects" replace />,
      },
      {
        path: "project/edit",
        element: <Navigate to="/projects" replace />,
      },
      {
        path: "project/create",
        element: <CreateProject />,
      },
      {
        path: "project/edit/:projectId",
        element: <EditProject />,
      },
      {
        path: "user-profile",
        element: "",
      },
      {
        path: "ttd",
        element: <AllTTD />,
        children: [
          {
            path: "edit/:ttdId",
            element: <AllTTD />,
          },
        ],
      },
      {
        path: "ttd/edit",
        element: <Navigate to="/ttd" />,
      },
      {
        path: "bdd",
        element: <AllBDD />,
        children: [
          {
            path: "edit/:bddId",
            element: <AllBDD />,
          },
        ],
      },
      {
        path: "bdd/edit",
        element: <Navigate to="/bdd" />,
      },
      {
        path: "calibration-stand",
        element: <AllCalibrationRack />,
        children: [
          {
            path: "edit/:csId",
            element: <AllCalibrationRack />,
          },
        ],
      },
      {
        path: "calibration-stand/edit",
        element: <Navigate to="/calibration-stand" />,
      },
      {
        path: "swab-master",
        element: <AllSwabMaster />,
        children: [
          {
            path: "edit/:smId",
            element: <AllSwabMaster />,
          },
        ],
      },
      {
        path: "swab-master/edit",
        element: <Navigate to="/swab-master" />,
      },
      {
        path: "airhose",
        element: <AllAirHose />,
        children: [
          {
            path: "edit/:airhoseId",
            element: <AllAirHose />,
          },
        ],
      },
      {
        path: "airhose/edit",
        element: <Navigate to="/airhose" />,
      },
      {
        path: "bdd-tsr",
        element: <AllBddTsr />,
        children: [
          {
            path: "edit/:partId",
            element: <AllBddTsr />,
          },
        ],
      },
      {
        path: "bdd-tsr/edit",
        element: <Navigate to="/bdd-tsr" />,
      },
      {
        path: "calibration-orifices",
        element: <AllCalibrationOrifices />,
        children: [
          {
            path: "edit/:partId",
            element: <AllCalibrationOrifices />,
          },
        ],
      },
      {
        path: "calibration-orifices/edit",
        element: <Navigate to="/calibration-orifices" />,
      },
      {
        path: "devicehose",
        element: <AllDeviceHose />,
        children: [
          {
            path: "edit/:partId",
            element: <AllDeviceHose />,
          },
        ],
      },
      {
        path: "devicehose/edit",
        element: <Navigate to="/devicehose" />,
      },
      {
        path: "pressure-sensor",
        element: <AllPressureSensor />,
        children: [
          {
            path: "edit/:partId",
            element: <AllPressureSensor />,
          },
        ],
      },
      {
        path: "pressure-sensor/edit",
        element: <Navigate to="/pressure-sensor" />,
      },
      {
        path: "supply-orifices",
        element: <AllSupplyOrifice />,
        children: [
          {
            path: "edit/:partId",
            element: <AllSupplyOrifice />,
          },
        ],
      },
      {
        path: "supply-orifices/edit",
        element: <Navigate to="/supply-orifices" />,
      },
      {
        path: "sm-tsr",
        element: <AllSMTSR />,
        children: [
          {
            path: "edit/:partId",
            element: <AllSMTSR />,
          },
        ],
      },
      {
        path: "sm-tsr/edit",
        element: <Navigate to="/sm-tsr" />,
      },
      {
        path: "tdd-tsr",
        element: <AllTTDTSR />,
        children: [
          {
            path: "edit/:partId",
            element: <AllTTDTSR />,
          },
        ],
      },
      {
        path: "tdd-tsr/edit",
        element: <Navigate to="/tdd-tsr" />,
      },
      {
        path: "general-parts",
        element: <AllGeneralParts />,
        children: [
          {
            path: "edit/:partId",
            element: <AllSupplyOrifice />,
          },
        ],
      },
      {
        path: "general-parts/edit",
        element: <Navigate to="/general-parts" />,
      },
      {
        path: "warehouse",
        element: <AllWarehouses />,
        children: [],
      },
      {
        path: "warehouse/:warehouseId",
        element: <WareHouseDashBoard />,
      },
      {
        path: "create-warehouse",
        element: "",
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: "",
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
