import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./searchBar.scss";

function SearchBar({ venues }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filteredVenues =
    query.length > 0
      ? venues.filter((venue) =>
          venue.name.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  function handleSelect(id) {
    setQuery("");
    navigate(`/venues/${id}`);
  }

  return (
    <div className="search-wrapper">
      <input
        type="search"
        placeholder="Search venues..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
        aria-label="Search venues"
      />

      {filteredVenues.length > 0 && (
        <ul className="search-dropdown">
          {filteredVenues.slice(0, 5).map((venue) => {
            const image = venue.media?.[0]?.url;
            const alt = venue.media?.[0]?.alt;

            return (
              <li
                key={venue.id}
                className="search-item"
                onClick={() => handleSelect(venue.id)}
              >
                <img src={image} alt={alt} className="search-thumbnail" />

                <div>
                  <strong>{venue.name}</strong>
                  <p className="search-location">
                    {venue.location?.city}, {venue.location?.country}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
