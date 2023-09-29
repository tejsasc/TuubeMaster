import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingData from "../UI/LoadingData";
import { ajaxCall } from "../../helpers/ajaxCall";
import { Form } from "react-bootstrap";
// import SingleSelection from "../UI/Form/SingleSelection";
import SelectSearch from "react-select-search";

const Drag = (props) => {
  const [allItems, setAllItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authData = useSelector((state) => state.authStore);
  const [allDataInfo, setAllDataInfo] = useState({
    pageNo: 1,
    totalPage: 0,
    totalData: 0,
  });
  const [search, setSearch] = useState("");
  const [warehouse, setWarehouse] = useState();
  // getTotalPages();
  const data = async (url, signal) => {
    setIsLoading(true);
    // let url = props.url;
    if (props?.isNeed) {
      url += `${props.separator}${props.paramName}=${props.paramId}`;
    }

    const response = await ajaxCall(
      url,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authData.accessToken}`,
        },
        method: "GET",
        signal: signal,
      },
      8000
    );
    // console.log(response.data);
    const allObj = response.data.results.map((option) => {
      let name = "";
      props.objKey.forEach((key, index, arr) => {
        if (index !== 0) name += " - ";
        // console.log(option);
        if (Array.isArray(key) && option[key[0]]) {
          // console.log(option[key[0]][key[1]]);
          name += option[key[0]][key[1]];
        } else {
          name += option[key];
        }
      });
      return {
        id: option.id,
        name,
        type: props.epName,
        showName: props.showName,
      };
    });
    setAllDataInfo({
      pageNo: 1,
      totalData: response.data.count,
      totalPage: response.data.count ? Math.ceil(response.data.count / 10) : 0,
    });

    setAllItems(allObj);
    setIsLoading(false);
  };

  const itemsPerPage = 10;
  const maxPageNumbersToShow = 2;
  const [currentPage, setCurrentPage] = useState(1);

  const handleDragStart = (event, item) => {
    event.dataTransfer.setData("text/plain", JSON.stringify(item));
    // console.log("sending item", JSON.stringify(item));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    let url = props.url + `&p=${currentPage}&records=${10}`;
    if (search) {
      url += `&search=${search}`;
    }
    if (warehouse) {
      url += `&warehouse=${warehouse}`;
    }

    const controller = new AbortController();
    // signal to pass to fetch
    const signal = controller.signal;
    data(url, signal);
    return () => {
      controller.abort();
    };
  }, [
    props.url,
    props.isEditLoading,
    props.isEdit,
    currentPage,
    search,
    warehouse,
  ]);

  const getPageNumbersToShow = () => {
    const totalPages = allDataInfo.totalPage;
    const pageNumbers = [];
    if (totalPages <= maxPageNumbersToShow) {
      // If total pages is less than or equal to the max page numbers to show, show all page numbers
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const halfMaxPageNumbers = Math.floor(maxPageNumbersToShow / 2);

      let startPage = currentPage - halfMaxPageNumbers;
      let endPage = currentPage + halfMaxPageNumbers;

      if (startPage <= 0) {
        // Adjust startPage if it goes below 1
        startPage = 1;
        endPage = maxPageNumbersToShow;
      }

      if (endPage > totalPages) {
        // Adjust endPage if it goes above the total number of pages
        endPage = totalPages;
        startPage = totalPages - maxPageNumbersToShow + 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (startPage > 1) {
        // Add ellipsis and first page if startPage is greater than 1
        pageNumbers.unshift("...");
        pageNumbers.unshift(1);
      }

      if (endPage < totalPages) {
        // Add ellipsis and last page if endPage is less than totalPages
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };
  const pageNumbersToShow = getPageNumbersToShow();
  if (!props.url?.length) {
    return <div className="text-center">{props.loadMsg}</div>;
  }
  // if (isLoading) {
  //   return <LoadingData />;
  // }
  return (
    <div className="flexDR">
      <SelectSearch
        options={props.warehouseData}
        placeholder="Sort By Warehouse"
        value={warehouse}
        onChange={(val) => {
          setWarehouse(val);
          setCurrentPage(1);
        }}
        name="contract"
      />
      <Form.Group className="mb-3 " controlId="formGroupEquipRemark">
        <Form.Label className="text-center disBlock"></Form.Label>
        <Form.Control
          placeholder="Search"
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </Form.Group>
      <div className="box drag">
        {isLoading ? (
          <LoadingData className="text-center" />
        ) : (
          <div className="dragItems">
            {allItems.map((item, index) => (
              <div
                key={index}
                draggable
                onDragStart={(event) => handleDragStart(event, item)}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}

        <div className="pagination">
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {pageNumbersToShow.map((pageNumber, index) => (
            <button
              type="button"
              key={index}
              onClick={() => handlePageChange(pageNumber)}
              className={currentPage === pageNumber ? "active" : ""}
            >
              {pageNumber}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={
              currentPage === allDataInfo.totalPage ||
              allDataInfo.totalData === 0
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Drag;
