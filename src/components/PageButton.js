import React from "react";
import { useNavigate } from "react-router-dom";

const PageButton = (props) => {
    const navigate = useNavigate();
  
    function handleClick() {
      navigate(props.destination);
    }
  
    return (
      <button type="button" onClick={handleClick}>
        {props.buttonText}
      </button>
    );
}
  
export default PageButton;