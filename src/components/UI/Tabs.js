import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { FaRegWindowClose } from "react-icons/fa";

const AllTabs = () => {
  const [key, setKey] = useState("home");
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab
        eventKey="home"
        title={
          <>
            <span>Tab1</span>
            {/* <FontAwesomeIcon icon="fa-solid fa-xmark" />
             */}
            <FaRegWindowClose onClick={() => {}} />
            {/* <i class="fa-solid fa-xmark"></i> */}
          </>
        }
      >
        Tab content for Home
      </Tab>
      <Tab eventKey="profile" title="Profile">
        Tab content for Profile
      </Tab>
      <Tab eventKey="contact" title="Contact">
        Tab content for Contact
      </Tab>
    </Tabs>
  );
};

export default AllTabs;
