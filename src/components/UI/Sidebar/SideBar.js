import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SubMenu from "./SubMenu";
import { useDispatch } from "react-redux";
import { authAction } from "../../../store/authStore";
import { deleteFromLocalStorage } from "../../../helpers/helperFunctions";
// import { Button } from "react-bootstrap";

const SideBar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = function () {
    dispatch(
      authAction.setAuthStatus({
        userName: "",
        loggedIn: false,
        accessToken: null,
        refreshToken: null,
        userId: null,
        user_type: null,
        timeOfLogin: null,
        logInOperation: 0,
      })
    );
    deleteFromLocalStorage("loginInfo");
    navigate(`/`);
  };
  return (
    <nav
      id="sidebar"
      className={`${props.sidebarStatus ? "" : "active"} mainSidebarSticky`}
    >
      <div className="sideMenu">
        <button
          onClick={() => {
            props.setSidebarStatus((status) => !status);
          }}
          type="button"
          id="sidebarCollapse"
          class="btn btn-primary"
        >
          <i class="fa fa-bars"></i>
          <span class="sr-only">Toggle Menu</span>
        </button>
      </div>
      <div class="flexJustifySA alignSC">
        <Link exact to="/" className="navLogoLink">
          <img
            className="navLogo"
            alt="Logo"
            src="http://tubemastercrm.com/static/img/tm_logo.png"
          />
        </Link>
        <span
          onClick={logout}
          class="fa fa-power-off mr-3 cursorPointer"
        ></span>
      </div>
      <div className="">
        <ul class="list-unstyled components mb-5 mt-5 centerWM sideNavBar">
          <li>
            <NavLink exact to="/" activeClassName="activeClicked">
              <span class="fa fa-home mr-3"></span>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/search" activeClassName="activeClicked">
              <span class="fa fa-search mr-3"></span>
              Search
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/client" activeClassName="activeClicked">
              <span class="fa fa-users mr-3"></span>
              Client
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/plant" activeClassName="activeClicked">
              <span class="fa fa-leaf mr-3"></span>
              Plant
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/unit" activeClassName="activeClicked">
              <span class="fa fa-list-alt mr-3"></span>
              Unit
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/reactor" activeClassName="activeClicked">
              <span class="fa fa-list-alt mr-3"></span>
              Reactor
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/warehouse" activeClassName="activeClicked">
              <span class="fa fa-square mr-3"></span>
              WareHouse
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/projects" activeClassName="activeClicked">
              <span class="fa fa-book mr-3"></span>
              Projects
            </NavLink>
          </li>
          <SubMenu
            mainName="Equipment"
            spanEle={<span class="fa fa-book mr-3"></span>}
            subEle={<span class="fa fa-list-alt mr-3"></span>}
            SubItem={[
              { name: "TTD", url: "/ttd" },
              { name: "BDD", url: "/bdd" },
              { name: "Calibration Rack", url: "/calibration-stand" },
              { name: "Swab Master", url: "/swab-master" },
            ]}
          />
          <SubMenu
            mainName="Parts"
            spanEle={<span class="fa fa-th-large mr-3"></span>}
            subEle={<span class="fa fa-list-alt mr-3"></span>}
            SubItem={[
              { name: "Air Hose", url: "/airhose" },
              { name: "BDD Tube Seal Rack", url: "/bdd-tsr" },
              { name: "Calibration Orifice", url: "/calibration-orifices" },
              { name: "Device Hose", url: "/devicehose" },
              { name: "Pressure Sensor", url: "/pressure-sensor" },
              { name: "Supply Orifice", url: "/supply-orifices" },
              { name: "SM Tube Seal Rack", url: "/sm-tsr" },
              { name: "TTD Tube Seal Rack", url: "/tdd-tsr" },
              { name: "All General Parts", url: "/general-parts" },
            ]}
          />
        </ul>
        <div class="footer"></div>
      </div>
    </nav>
  );
};

export default SideBar;
