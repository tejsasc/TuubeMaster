import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const SubMenu = (props) => {
  const [subMenuStatus, setSubMenuStatus] = useState(false);
  const location = useLocation().pathname;

  useEffect(() => {
    // console.log(location);
    // console.log(
    //   props.SubItem.some((item) => location === item.url),
    //   subMenuStatus
    // );
    if (!props.SubItem.some((item) => location === item.url)) {
      if (subMenuStatus) {
        setSubMenuStatus(false);
      }
    }
  }, [location]);

  return (
    <>
      <li>
        <div className="">
          <Link
            className=" flexInSubMenu"
            onClick={() => {
              setSubMenuStatus((status) => !status);
            }}
          >
            {props.spanEle}
            <span className="mr-3">{props.mainName}</span>
            <i class="fa fa-caret-down"></i>
          </Link>
        </div>
        <ul
          className={`collapse list-unstyled ${subMenuStatus ? "show" : ""}`}
          id="homeSubmenu"
        >
          {props.SubItem.map((item) => {
            return (
              <li>
                <NavLink exact to={item.url} activeClassName="activeClicked">
                  {props.subEle} {item.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </li>
    </>
  );
};

export default SubMenu;
