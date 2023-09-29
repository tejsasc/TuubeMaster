import React, { useEffect, useState } from "react";
import { Card, Tab, Tabs } from "react-bootstrap";
import SelectSearch from "react-select-search";
import { ajaxCall } from "../../helpers/ajaxCall";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import TTDDatatable from "../../components/TTD/TTDDatatable";
import BDDDataTable from "../../components/BDD/BDDDataTable";
import CalibrationRackDataTable from "../../components/calibrationRack/CalibrationRackDataTable";
import SwabMasterDatabTable from "../../components/swabMaster/SwabmasterDataTable";
import AirHoseDatabTable from "../../components/Parts/AirHose/AirHoseDataTable";
import AllGeneralPartDatabTable from "../../components/Parts/AllGeneralParts/AllGeneralPartDataTable";
import BDDTSRDatabTable from "../../components/Parts/BddTsr/BDDTSRDataTable";
import CODatabTable from "../../components/Parts/CalibrationOrifice/CODataTable";
import DHDatabTable from "../../components/Parts/DeviceHose/DHDataTable";
import PSDatabTable from "../../components/Parts/PressureSensors/PSDataTable";
import SMTSRDatabTable from "../../components/Parts/SMTSR/SMTSRDataTable";
import SODatabTable from "../../components/Parts/SupplyOrifices/SODataTable";
import TTDTSRDatabTable from "../../components/Parts/TTDTSR/TTDTSRDataTable";
import AllEquip from "../../components/All/AllEquip";
import AllParts from "../../components/All/AllPart";
import AddEquipPart from "../../components/Warehouse/AddEquipPart";
import countryList from "react-select-country-list";

const WareHouseDashBoard = () => {
  const [wareHouseInfo, setWareHouseInfo] = useState();
  const authData = useSelector((state) => state.authStore);
  // const [updatewarehouse, setUpdateWareHouse] = useState(false);
  const [selectOptions, setSelectionOptions] = useState({
    equip: "All",
    equipSoon: "All",
    parts: "All",
    partsSoon: "All",
  });
  const [key, setKey] = useState("equip");
  // for data table
  const [refreshTable, setRefreshTable] = useState(false);
  const param = useParams();
  // const equipParts = useRef();

  const getWareHouseInfo = async function (id) {
    const response = await ajaxCall(
      `/wa/?slug=${id}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authData.accessToken}`,
        },
        method: "GET",
        // signal,
      },
      8000
      // timeOutFunction
    );
    if (response.status !== 200) {
      // setIsLoadingData(false);
      // setWarehouses([]);
      // setFetchErr("Some Problem Occured Please try again");
      return;
    }

    const data = response.data[0];
    const freePart =
      data.general_part_data.will_be_free +
      data.general_part_data.not_assigned_to_any_project +
      data.supply_orifice.will_be_free +
      data.supply_orifice.not_assigned_to_any_project +
      data.pressure_sensor.will_be_free +
      data.pressure_sensor.not_assigned_to_any_project +
      data.calibration_orifice.will_be_free +
      data.calibration_orifice.not_assigned_to_any_project +
      data.swabmasterTSR.will_be_free +
      data.swabmasterTSR.not_assigned_to_any_project +
      data.devicehose.will_be_free +
      data.devicehose.not_assigned_to_any_project +
      data.airhose.will_be_free +
      data.airhose.not_assigned_to_any_project +
      data.ttd_rack.not_used +
      data.bdd_rack.not_used;

    const totalPart =
      data.general_part_data.total +
      data.supply_orifice.total +
      data.pressure_sensor.total +
      data.calibration_orifice.total +
      data.swabmasterTSR.total +
      data.devicehose.total +
      data.airhose.total +
      data.ttd_rack.total +
      data.bdd_rack.total;

    const totalEquip =
      data.ttd.total +
      data.bdd.total +
      data.calibration_stand.total +
      data.swabmaster.total;

    const freeEquip =
      data.ttd.will_be_free +
      data.bdd.will_be_free +
      data.ttd.not_assigned_to_any_project +
      data.bdd.not_assigned_to_any_project +
      data.calibration_stand.will_be_free +
      data.calibration_stand.not_assigned_to_any_project +
      data.swabmaster.will_be_free +
      data.swabmaster.not_assigned_to_any_project;
    setWareHouseInfo({
      ...response.data[0],
      totalPart,
      freePart,
      totalEquip,
      freeEquip,
    });
  };

  useEffect(() => {
    getWareHouseInfo(param.warehouseId);
  }, []);

  // console.log("now it is", key === "inStockEquip");
  const equipData =
    selectOptions.equip === "All" ? (
      <AllEquip
        warehouseNotNeeded={true}
        free={key === "inStockEquip"}
        refreshTable={refreshTable}
        setRefreshTable={(data) => {
          setRefreshTable(data);
        }}
        warehouse={param.warehouseId}
      />
    ) : selectOptions.equip === "ttd" ? (
      <TTDDatatable
        warehouseNotNeeded={true}
        free={key === "inStockEquip"}
        refreshTable={refreshTable}
        setRefreshTable={(data) => {
          setRefreshTable(data);
        }}
        warehouse={param.warehouseId}
      />
    ) : selectOptions.equip === "bdd" ? (
      <BDDDataTable
        warehouseNotNeeded={true}
        free={key === "inStockEquip"}
        refreshTable={refreshTable}
        setRefreshTable={(data) => {
          setRefreshTable(data);
        }}
        warehouse={param.warehouseId}
      />
    ) : selectOptions.equip === "cr" ? (
      <CalibrationRackDataTable
        warehouseNotNeeded={true}
        free={key === "inStockEquip"}
        refreshTable={refreshTable}
        setRefreshTable={(data) => {
          setRefreshTable(data);
        }}
        warehouse={param.warehouseId}
      />
    ) : selectOptions.equip === "sm" ? (
      <SwabMasterDatabTable
        warehouseNotNeeded={true}
        free={key === "inStockEquip"}
        refreshTable={refreshTable}
        setRefreshTable={(data) => {
          setRefreshTable(data);
        }}
        warehouse={param.warehouseId}
      />
    ) : (
      ""
    );

  const partData =
    selectOptions.parts === "All" ? (
      <AllParts
        warehouseNotNeeded={true}
        free={key === "InStockParts"}
        refreshTable={refreshTable}
        setRefreshTable={(data) => {
          setRefreshTable(data);
        }}
        warehouse={param.warehouseId}
      />
    ) : selectOptions.parts === "airhose" ? (
      <AirHoseDatabTable
        warehouseNotNeeded={true}
        free={key === "InStockParts"}
        refreshTable={refreshTable}
        setRefreshTable={(data) => {
          setRefreshTable(data);
        }}
        warehouse={param.warehouseId}
      />
    ) : selectOptions.parts === "generalPart" ? (
      <AllGeneralPartDatabTable
        warehouseNotNeeded={true}
        free={key === "InStockParts"}
        refreshTable={refreshTable}
        setRefreshTable={(data) => {
          setRefreshTable(data);
        }}
        warehouse={param.warehouseId}
      />
    ) : selectOptions.parts === "bddtsr" ? (
      <BDDTSRDatabTable
        warehouseNotNeeded={true}
        free={key === "InStockParts"}
        refreshTable={refreshTable}
        setRefreshTable={(data) => {
          setRefreshTable(data);
        }}
        warehouse={param.warehouseId}
      />
    ) : selectOptions.parts === "co" ? (
      <CODatabTable
        warehouseNotNeeded={true}
        free={key === "InStockParts"}
        refreshTable={refreshTable}
        setRefreshTable={(data) => {
          setRefreshTable(data);
        }}
        warehouse={param.warehouseId}
      />
    ) : selectOptions.parts === "dh" ? (
      <DHDatabTable
        warehouseNotNeeded={true}
        free={key === "InStockParts"}
        refreshTable={refreshTable}
        setRefreshTable={(data) => {
          setRefreshTable(data);
        }}
        warehouse={param.warehouseId}
      />
    ) : selectOptions.parts === "ps" ? (
      <PSDatabTable
        warehouseNotNeeded={true}
        free={key === "InStockParts"}
        refreshTable={refreshTable}
        setRefreshTable={(data) => {
          setRefreshTable(data);
        }}
        warehouse={param.warehouseId}
      />
    ) : selectOptions.parts === "smtsr" ? (
      <SMTSRDatabTable
        warehouseNotNeeded={true}
        free={key === "InStockParts"}
        refreshTable={refreshTable}
        setRefreshTable={(data) => {
          setRefreshTable(data);
        }}
        warehouse={param.warehouseId}
      />
    ) : selectOptions.parts === "so" ? (
      <SODatabTable
        warehouseNotNeeded={true}
        free={key === "InStockParts"}
        refreshTable={refreshTable}
        setRefreshTable={(data) => {
          setRefreshTable(data);
        }}
        warehouse={param.warehouseId}
      />
    ) : selectOptions.parts === "ttdtsr" ? (
      <TTDTSRDatabTable
        warehouseNotNeeded={true}
        free={key === "InStockParts"}
        refreshTable={refreshTable}
        setRefreshTable={(data) => {
          setRefreshTable(data);
        }}
        warehouse={param.warehouseId}
      />
    ) : (
      ""
    );

  return (
    <>
      <Card className="mt-3">
        <Card.Body>
          {/* <Card.Title className="mb-3 text-center">
            <h2>{wareHouseInfo?.warehouse_name}</h2>
          </Card.Title> */}
          <div className="text-center grid2unEven">
            <h2 className="warehouseTitle">{wareHouseInfo?.warehouse_name}</h2>
            <div className="warehouseMetaInfo">
              <p>Warehouse Location : {wareHouseInfo?.warehouse_location}</p>
              <p>Warehouse Contact: {wareHouseInfo?.warehouse_contact}</p>
              <p>Warehouse Email : {wareHouseInfo?.warehouse_email}</p>
              <p>Warehouse Manager : {wareHouseInfo?.warehouse_manager}</p>
              <p>
                Country:{" "}
                {wareHouseInfo?.country
                  ? countryList().getLabel(wareHouseInfo?.country)
                  : "-"}
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>
      <Card className="mt-3">
        <Card.Body>
          <AddEquipPart
            whId={param.warehouseId}
            refreshTable={refreshTable}
            setRefreshTable={() => setRefreshTable(true)}
          />
          {/* <div className="flexJustifySB">
            <h4>
              <span>Total Device Inventory : {wareHouseInfo?.totalEquip}</span>
            </h4>
            <h4>
              <span>
                Total Present Device Inventory : {wareHouseInfo?.freeEquip}
              </span>
            </h4>
          </div>
          <div className="flexJustifySB">
            <h4>Total Part Inventory : {wareHouseInfo?.totalPart}</h4>
            <h4>Total Present Part Inventory : {wareHouseInfo?.freePart}</h4>
          </div> */}

          <Tabs
            defaultActiveKey="equip"
            id="fill-tab-example"
            className="mb-3"
            fill
            activeKey={key}
            onSelect={(k) => {
              setKey(k);
              setSelectionOptions({
                equip: "All",
                equipSoon: "All",
                parts: "All",
                partsSoon: "All",
              });
            }}
          >
            <Tab eventKey="equip" title="Equipments">
              <div className="row">
                <div className="col-md-12 text-center">
                  <div className="">
                    <div className="col-md-3">
                      <SelectSearch
                        options={[
                          { name: "All", value: "All" },
                          { name: "TTD", value: "ttd" },
                          { name: "BDD", value: "bdd" },
                          { name: "Swab Master", value: "sm" },
                          { name: "Calibration Racks", value: "cr" },
                        ]}
                        value={selectOptions.equip}
                        onChange={(val) => {
                          setSelectionOptions((data) => {
                            return {
                              ...data,
                              equip: val,
                            };
                          });
                        }}
                        name="equips"
                        placeholder="Select From Options"
                      />
                    </div>
                    {key === "equip" ? equipData : ""}
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="inStockEquip" title="In Stock Equipment">
              <div className="row">
                <div className="col-md-12 text-center">
                  <div className="">
                    <div className="col-md-3">
                      <SelectSearch
                        options={[
                          { name: "All", value: "All" },
                          { name: "TTD", value: "ttd" },
                          { name: "BDD", value: "bdd" },
                          { name: "Swab Master", value: "sm" },
                          { name: "Calibration Racks", value: "cr" },
                        ]}
                        value={selectOptions.equip}
                        onChange={(val) => {
                          setSelectionOptions((data) => {
                            return {
                              ...data,
                              equip: val,
                            };
                          });
                        }}
                        name="equips"
                        placeholder="Select From Options"
                      />
                    </div>
                    {key === "inStockEquip" ? equipData : ""}
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="parts" title="Parts">
              <div className="row">
                <div className="col-md-12 text-center">
                  <div className="">
                    <div className="col-md-3">
                      <SelectSearch
                        options={[
                          { name: "All", value: "All" },
                          { name: "Air Hose", value: "airhose" },
                          { name: "BDD Tubeseal Rack", value: "bddtsr" },
                          { name: "Calibration Orifice", value: "co" },
                          { name: "Device Hose", value: "dh" },
                          { name: "Pressure Sensor", value: "ps" },
                          { name: "Supply Orifice", value: "so" },
                          { name: "SM Tube Seal Racks", value: "smtsr" },
                          { name: "TTD Tube Seal Racks", value: "ttdtsr" },
                        ]}
                        value={selectOptions.parts}
                        onChange={(val) => {
                          setSelectionOptions((data) => {
                            return {
                              ...data,
                              parts: val,
                            };
                          });
                        }}
                        name="parts"
                      />
                    </div>
                  </div>
                  {key === "parts" ? partData : ""}
                </div>
              </div>
            </Tab>
            <Tab eventKey="InStockParts" title="In Stock Parts">
              <div className="row">
                <div className="col-md-12 text-center">
                  <div className="">
                    <div className="col-md-3">
                      <SelectSearch
                        options={[
                          { name: "All", value: "All" },
                          { name: "Air Hose", value: "airhose" },
                          { name: "BDD Tubeseal Rack", value: "bddtsr" },
                          { name: "Calibration Orifice", value: "co" },
                          { name: "Device Hose", value: "dh" },
                          { name: "Pressure Sensor", value: "ps" },
                          { name: "Supply Orifice", value: "so" },
                          { name: "SM Tube Seal Racks", value: "smtsr" },
                          { name: "TTD Tube Seal Racks", value: "ttdtsr" },
                        ]}
                        value={selectOptions.parts}
                        onChange={(val) => {
                          setSelectionOptions((data) => {
                            return {
                              ...data,
                              parts: val,
                            };
                          });
                        }}
                        name="parts"
                      />
                    </div>
                  </div>
                  {key === "InStockParts" ? partData : ""}
                </div>
              </div>
            </Tab>
            <Tab eventKey="allGeneralPart" title="All General Parts">
              <div className="row">
                <div className="col-md-12 text-center">
                  <AllGeneralPartDatabTable
                    warehouseNotNeeded={true}
                    // free={key === "InStockParts"}
                    refreshTable={refreshTable}
                    setRefreshTable={(data) => {
                      setRefreshTable(data);
                    }}
                    warehouse={param.warehouseId}
                  />
                </div>
              </div>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </>
  );
};

export default WareHouseDashBoard;
