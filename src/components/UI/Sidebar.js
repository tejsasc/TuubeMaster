import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";

const Sidebar = (props) => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "scroll initial",
      }}
    >
      {/* <div className="mainSidebar"> */}
      <CDBSidebar
        textColor="#fff"
        backgroundColor="#006738"
        className="mainSidebar"
      >
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <img
            alt="Tube Master Logo"
            className="navLogo"
            src="http://tubemastercrm.com/static/img/tm_logo.png"
          />
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <NavLink exact to="/" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/warehouse" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="columns">WareHouse</CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/projects" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="columns">Projects</CDBSidebarMenuItem>
          </NavLink>
          Devices
          <CDBSidebarMenu>
            <NavLink exact to="/ttd" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">TTD</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/bdd" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">BDD</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/swab-master" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Swab Master</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/calibration-stand"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="chart-line">
                Calibration Racks
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/geeneral-parts" activeClassName="activeClicked">
              Parts
            </NavLink>
            <NavLink exact to="/airhose" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="exclamation-circle">
                Air Hoses
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/bdd-tsr" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="exclamation-circle">
                BDD Tube Seal Racks
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/calibration-orifices"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="exclamation-circle">
                Calibration Orifice
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/devicehose" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="exclamation-circle">
                Device Hoses
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/pressure-sensor"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="exclamation-circle">
                Pressure Sensors
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/supply-orifices"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="exclamation-circle">
                Supply Orifices
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/sm-tsr" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="exclamation-circle">
                SM Tube Seal Racks
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/tdd-tsr" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="exclamation-circle">
                TTD Tube Seal Racks
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
          <NavLink exact to="/general-parts" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="exclamation-circle">
              All General Parts
            </CDBSidebarMenuItem>
          </NavLink>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          {/* <div
            style={{
              padding: "20px 5px",
            }}
          >
            Sidebar Footer
          </div> */}
        </CDBSidebarFooter>
      </CDBSidebar>
      {props.children}
    </div>
  );
};

export default Sidebar;
