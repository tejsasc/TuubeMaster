import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const DateFilter = () => {
  let clss = "col-md-4";
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  const [searchDate, setSearchDate] = useState(
    `${year}-${String(month).padStart(2, 0)}-${day}`
  );

  useEffect(() => {
    let url = "";
    if (searchDate) url = `&date=${searchDate}`;
  }, [searchDate]);

  const clearFilter = () => {
    setSearchDate("");
  };

  return (
    <>
      {searchDate ? (
        <button onClick={clearFilter} className="btn btn-secondary">
          Clear Filter
        </button>
      ) : (
        ""
      )}
      <Form.Group controlId="formGroupEquipPrepDate" className={`mb-3 ${clss}`}>
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
      </Form.Group>
    </>
  );
};

export default DateFilter;
