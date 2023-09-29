import React from "react";
// import { ajaxCall } from "../../helpers/ajaxCall";
// import { useSelector } from "react-redux";
// import LoadingData from "../UI/LoadingData";
import Drag from "./Drag";
import Drop from "./Drop";

const DragNDrop = (props) => {
  return (
    <>
      <h2 className="text-center">{props.title}</h2>
      {!props.url?.length ? (
        <div className="text-center">{props.loadMsg}</div>
      ) : (
        <div className="dragNDrop">
          <Drag
            selectedVals={[]}
            url={props.url}
            objKey={props.objKey}
            loadMsg={props.loadMsg}
            isNeed={props.isNeed}
            separator={props.separator}
            paramId={props.paramId}
            paramName={props.paramName}
            epName={props.epName}
            showName={props.showName}
            warehouseData={props.warehouseData}
          />
          <Drop
            idVals={props.idVals}
            value={props.value}
            onSelect={props.onSelect}
            onRemove={props.onRemove}
            title={props.title}
            allEP={props.allEP?.length ? props.allEP : []}
            epName={props.epName}
          />
        </div>
      )}
    </>
  );
};

export default DragNDrop;
