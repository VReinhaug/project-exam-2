import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { VENUES_URL } from "../../api";
import "./searchBar.scss";

function SearchBar({ venues }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        const response = await fetch(`${VENUES_URL}/search?q=${query}`);
        const json = await response.json();

        setResults(json.data);
      } catch (error) {
        console.error("Search error:", error);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  function handleSelect(id) {
    setQuery("");
    setResults([]);
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

      {results.length > 0 && (
        <ul className="search-dropdown">
          {results.slice(0, 5).map((venue) => {
            const image = venue.media?.[0]?.url;
            const alt = venue.media?.[0]?.alt;

            const location = [venue.location?.city, venue.location?.country]
              .filter(Boolean)
              .join(", ");

            return (
              <li
                key={venue.id}
                className="search-item"
                onClick={() => handleSelect(venue.id)}
              >
                <img src={image} alt={alt} className="search-thumbnail" />

                <div>
                  <strong>{venue.name}</strong>
                  {location && <p className="search-location">{location}</p>}
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
