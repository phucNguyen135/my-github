import React, { useCallback, useEffect, useState } from "react";
import { actionSearchUser } from "../../redux/actions";
import { debounced } from "../../utils";
import { connect } from "react-redux";

const App = (props) => {
  const [searchText, setSearchText] = useState("");
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchText) {
      debounced(async () => {
        setIsLoading(true);
        actionSearchUser(searchText);
        setIsLoading(false);
      });
    }
  }, [searchText]);

  const _handleSearchText = useCallback((e) => {
    setSearchText(e.target.value);
  }, []);

  return (
    <div className="ui raised very padded text container segment">
      <div className={`ui search ${loading && "loading"}`}>
        <div className="ui icon input">
          <input
            className="prompt"
            type="text"
            placeholder="Search countries..."
            value={searchText}
            onChange={_handleSearchText}
          />
          <i className="search icon" />
        </div>
        <div className="results" />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(App);
