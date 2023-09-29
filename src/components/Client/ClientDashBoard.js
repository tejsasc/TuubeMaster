import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ajaxCall } from "../../helpers/ajaxCall";
import { Card, Tab, Tabs } from "react-bootstrap";
import PlantDatatable from "./Plant/PlantDatatable";
import UnitDatatable from "./Unit/UnitDatatable";
import ReactorDatatable from "./Reactor/ReactorDatatable";

const ClientDashBoard = () => {
  const authData = useSelector((state) => state.authStore);
  const [refreshTable, setRefreshTable] = useState(false);
  const [key, setKey] = useState(0);
  const param = useParams();

  const getClientInfo = async (id) => {
    const response = await ajaxCall(
      `/cl/clientretupddel/?slug=${id}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authData.accessToken}`,
        },
        method: "GET",
      },
      8000
    );
    if (response.status !== 200) {
      // setIsLoadingData(false);
      // setWarehouses([]);
      // setFetchErr("Some Problem Occured Please try again");
      return;
    }
  };

  useEffect(() => {
    getClientInfo(param.clientId);
  }, []);

  return (
    <>
      <Card className="mt-3">
        <Card.Body>
          <div className="text-center grid2unEven">
            <h2 className="warehouseTitle">Jigar Desai</h2>
            <div className="warehouseMetaInfo">
              <p>Common Name : Anant Soft</p>
              <p>Parent Company: Anant Soft Computing</p>
              <p>Former Name : ASC</p>
            </div>
          </div>
        </Card.Body>
      </Card>
      <Card className="mt-3">
        <Card.Body>
          <Tabs
            id="fill-tab-example"
            className="mb-3"
            fill
            activeKey={key}
            onSelect={(k) => {
              setKey(k);
            }}
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
          </Tabs>
        </Card.Body>
      </Card>
    </>
  );
};
export default ClientDashBoard;
