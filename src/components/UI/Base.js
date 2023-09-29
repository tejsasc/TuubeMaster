import React, { useState } from "react";
// import {
//   Breadcrumb,
//   Container,
//   Row,
//   Toast,
//   ToastContainer,
// } from "react-bootstrap";
// import Header from "./Header";
import { Outlet } from "react-router-dom";
import Popup from "./Popup";
// import ErrorBoundary from "../ErrorClass";
// import Sidebar from "./Sidebar";
// import Tabs from "./Tabs";
import SiteBreadCrumb from "../SiteBreadCrumb";
import SideBar from "./Sidebar/SideBar";

// function Base() {
//   return (
//     <ErrorBoundary>
//       {/* <Header /> */}
//       <Sidebar>
//         <Container fluid className="mainContainer px-md-5">
//           <Row>
//             <SiteBreadCrumb />
//             <Outlet />
//             {/* <Tabs /> */}
//           </Row>
//         </Container>
//         <Popup />
//       </Sidebar>
//     </ErrorBoundary>
//   );
// }

function Base() {
  const [sidebarStatus, setSidebarStatus] = useState(true);
  return (
    <>
      <div class="wrapper d-flex align-items-stretch">
        <SideBar
          setSidebarStatus={setSidebarStatus}
          sidebarStatus={sidebarStatus}
        />
        <div id="content" class="p-4 p-md-5 ms-5 overflow-auto">
          <nav class="navbar navbar-expand-lg navbar-light topBarNav">
            <div class="container-fluid">
              <div className="col-md-12">
                <div className="flexJustifyFS">
                  <button
                    onClick={() => {
                      setSidebarStatus((status) => !status);
                    }}
                    type="button"
                    id="sidebarCollapse"
                    class="btn btn-primary"
                  >
                    <i class="fa fa-bars"></i>
                    <span class="sr-only">Toggle Menu</span>
                  </button>
                  <SiteBreadCrumb />
                </div>
                <hr />
              </div>
            </div>
          </nav>
          <Outlet />
        </div>
      </div>
      <Popup />
    </>
  );
}

export default Base;
