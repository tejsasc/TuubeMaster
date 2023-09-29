import React, { useEffect, useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import SelectSearch from "react-select-search";
import { ajaxCall } from "../helpers/ajaxCall";
import { useDispatch, useSelector } from "react-redux";
import { uiAction } from "../store/uiStore";
import LoadingData from "./UI/LoadingData";

const PopOverPMstatus = (props) => {
  const [pmStatus, setPMStatus] = useState(props.pm_status);
  const [sendingReq, setSendingReq] = useState(false);
  const authData = useSelector((state) => state.authStore);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pmStatus !== props.pm_status) {
      setSendingReq(true);
      changePMStatus(props.id);
    }
  }, [pmStatus]);

  const changePMStatus = async function (id) {
    let method = "PATCH";
    const data = new FormData();
    data.append("pm_status", pmStatus);
    const response = await ajaxCall(
      props.url,
      {
        headers: {
          Authorization: `Bearer ${authData.accessToken}`,
        },
        method,
        body: data,
        // signal,
      },
      8000
      // timeoutfun
    );
    console.log(response);
    if (response.status === 200) {
      dispatch(
        uiAction.setNotification({
          show: true,
          heading: props.name,
          msg: `PM Status Updated from ${props.pm_status} to ${pmStatus}`,
        })
      );
      props.setRefreshTable(true);
      setSendingReq(false);
    }
  };
  const popover = (
    <Popover id="popoverUni">
      <Popover.Body>
        {!sendingReq ? (
          <SelectSearch
            options={[
              { name: "RED", value: "RED" },
              { name: "BLUE", value: "BLUE" },
              { name: "GREEN", value: "GREEN" },
            ]}
            placeholder="Choose from options"
            value={pmStatus}
            onChange={(val) => {
              setPMStatus(val);
            }}
            name="pm_status"
          />
        ) : (
          <LoadingData />
        )}
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger
      placement="bottom"
      trigger="click"
      overlay={popover}
      rootClose
    >
      <span>{props.pm_status}</span>
    </OverlayTrigger>
  );
};

export default PopOverPMstatus;
