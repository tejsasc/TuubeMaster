import React from "react";
// import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const SiteBreadCrumb = () => {
  const location = useLocation().pathname;

  // if (location === "/projects") {
  //   alert("yes");
  // }
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  const breadcrumb = () => {
    if (location === "/")
      return (
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          Dashboard{" "}
        </Breadcrumb.Item>
      );
    let currentLink = "";
    const path = location
      .split("/")
      .filter((path) => path.length !== 0)
      .map((crumb, index) => {
        let newCrumb;
        if (index > 0)
          newCrumb = `${crumb[0].toUpperCase() + crumb.substring(1)}`;
        else newCrumb = crumb[0].toUpperCase() + crumb.substring(1);
        currentLink += `/${crumb}`;
        return (
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: currentLink }}>
            {newCrumb}
          </Breadcrumb.Item>
        );
      });
    path.unshift(
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
        Dashboard
      </Breadcrumb.Item>
    );
    return path;
  };
  // console.log("bread is", breadcrumb());

  return (
    <>
      <Breadcrumb>{breadcrumb()}</Breadcrumb>
      {location === "/projects" ? (
        <Link to="/project/create" className="btn btn-primary mla">
          Add Project
        </Link>
      ) : (
        ""
      )}
    </>
  );
};

export default SiteBreadCrumb;
