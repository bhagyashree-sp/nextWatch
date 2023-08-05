import { useContext } from "react";
import context from "../../context/context";
import "./index.css";

const FailureView = (props) => {
  const { handleRetry } = props;
  const { dark } = useContext(context);

  return (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure"
        className="failure-image"
      />
      <h1
        className={
          dark
            ? "failure-heading dark-failure-heading"
            : "failure-heading light-failure-heading"
        }
      >
        Oops! Something Went Wrong
      </h1>
      <p className="failure-description">
        We are having some trouble to complete your request. Please try again.
      </p>
      <button type="button" onClick={handleRetry} className="failure-button">
        Retry
      </button>
    </div>
  );
};

export default FailureView;
