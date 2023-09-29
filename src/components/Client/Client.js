import { useState } from "react";
// import { Tabs, Tab } from "react-bootstrap";
// import PlantDatatable from "./Plant/PlantDatatable";
// import UnitDatatable from "./Unit/UnitDatatable";
// import ReactorDatatable from "./Reactor/ReactorDatatable";
import AllClients from "./AllClients";

const Client = () => {
  // const [key, setKey] = useState(0);
  const [refreshTable, setRefreshTable] = useState(true);

  return (
    <div>
      <AllClients
        refreshTable={refreshTable}
        setRefreshTable={setRefreshTable}
      />
      {/* <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => {
          setKey(+k);
        }}
        className="mb-3"
      >
        <Tab eventKey={0} title="Plants">
          <PlantDatatable
            refreshTable={refreshTable}
            setRefreshTable={setRefreshTable}
          />
        </Tab>
        <Tab eventKey={1} title="Units">
          <UnitDatatable
            refreshTable={refreshTable}
            setRefreshTable={setRefreshTable}
          />
        </Tab>
        <Tab eventKey={2} title="Reactors">
          <ReactorDatatable
            refreshTable={refreshTable}
            setRefreshTable={setRefreshTable}
          />
        </Tab>
      </Tabs> */}
    </div>
  );
};
export default Client;
