import { useState } from "react";
import "./SearchForm.css";
/**
 * This component renders a search form for users to filter through companies
 * or jobs.
 *
 * Props: onSearch()
 * State: none
 */

function SearchForm({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  console.log(searchTerm, "searchForm");

  function handleChange(evt) {
    const { value } = evt.target;
    setSearchTerm(value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSearch(searchTerm);
  }

  return (
    <div className="SearchForm mb-4">
      <form onSubmit={handleSubmit}>
        <div className="row justify-content-center justify-content-lg-start gx-0 mt-5">
          <div className="col-8">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Enter Search Term"
              value={searchTerm}
              onChange={handleChange}
            ></input>
          </div>
          <div className="col-auto">
            <button className="btn btn-lg btn-primary " type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
