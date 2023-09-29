import React from "react";

const Drop = (props) => {
  // const [items, setItems] = useState(props.value);
  // const [ids, setIds] = useState(props.idVals);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    const item = JSON.parse(event.dataTransfer.getData("text/plain"));
    props.onSelect(item);
    // setItems((prevItems) => [...prevItems, item]);
    console.log(item);
    // console.log("all items", items);
  };

  const handleRemove = (index, type) => {
    props.onRemove(index, type, `${type}Id`);
  };

  // console.log(props.value);

  return (
    <div className="box drop">
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{ minHeight: "100%", width: "auto" }}
      >
        {props.allEP.map((item, index) => (
          <div className="flexJustifyFS">
            <button
              className="removeBtn"
              type="button"
              onClick={() => handleRemove(item.id, item.type)}
            >
              Remove
            </button>
            <div key={index}>
              {item.name} - <span className="tBold">{item.showName}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Drop;
