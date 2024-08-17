import React, { useState, useEffect } from "react";
import airportsData from "../data/airports.json";

const AirportTable = ({ filters, searchQuery, itemsPerPage }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

    // Recalculate total pages based on filtered data
    const newTotalPages = Math.ceil(data.length / itemsPerPage);
    setTotalPages(newTotalPages);

    // Reset current page to 1 if it exceeds the new total pages
    if (currentPage > newTotalPages) {
      setCurrentPage(1);
    }
  }, [filters, searchQuery, itemsPerPage, currentPage]);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (paginatedData.length === 0) {
    return <p>Airport Not Found</p>;
  }
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>ICAO</th>
            <th>IATA</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((airport) => (
            <tr key={airport.id}>
              <td>{airport.name}</td>
              <td>{airport.icao}</td>
              <td>{airport.iata}</td>
              <td>{airport.latitude}</td>
              <td>{airport.longitude}</td>
              <td>{airport.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          &lt; Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next &gt;
        </button>
      </div>
    </>
  );
};

export default AirportTable;
