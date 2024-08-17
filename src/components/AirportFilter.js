import React, { useState } from "react";
import Filters from "./Filters";
import AirportTable from "./AirportTable";

function AirportFilter() {
  const [filters, setFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 4; // Configurable item count

  return (
    <div className="App">
      <Filters
        filters={filters}
        setFilters={setFilters}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <AirportTable
        filters={filters}
        searchQuery={searchQuery}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}

export default AirportFilter;
