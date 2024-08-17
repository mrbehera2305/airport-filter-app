import React, { useState, useEffect } from "react";
import airportsData from "../../data/airports.json";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import "./AirportTable.css";

const AirportTable = ({ filters, searchQuery, itemsPerPage }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let data = airportsData;

    // Filter by type
    if (filters.length > 0) {
      data = data.filter((airport) => filters.includes(airport.type));
    }

    // Filter by search query
    if (searchQuery) {
      data = data.filter((airport) =>
        Object.values(airport).some((value) =>
          value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    setFilteredData(data);
  }, [filters, searchQuery, itemsPerPage, currentPage]);

  const totalResults = filteredData.length;
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalResults);

  if (paginatedData.length === 0) {
    return <p>Airport Not Found</p>;
  }
  return (
    <div className="table-container">
      {" "}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>ICAO</th>
            <th>IATA</th>
            <th>Elev.</th>
            <th>Lat.</th>
            <th>Long.</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((airport) => (
            <tr key={airport.id}>
              <td>
                {airport.name.length > 15
                  ? airport.name.substring(0, 15) + "..."
                  : airport.name || "N/A"}
              </td>
              <td>{airport.icao || "N/A"}</td>
              <td>{airport.iata || "N/A"}</td>
              <td>{airport.elevation + " ft" || "N/A"}</td>
              <td>{airport.latitude.toString().slice(0, 8) + "..."}</td>
              <td> {airport.longitude.toString().slice(0, 8) + "..."}</td>
              <td>{airport.type || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <FaArrowLeft />
        </button>
        <span>
          Showing {startIndex} - {endIndex} of {totalResults} results
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(totalResults / itemsPerPage))
            )
          }
          disabled={currentPage === Math.ceil(totalResults / itemsPerPage)}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default AirportTable;
