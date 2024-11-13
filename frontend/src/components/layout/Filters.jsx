import React, { useEffect, useState } from 'react'
import { navigate, useNavigate, useSearchParams } from "react-router-dom"
// import { getPriceQueryParams } from '../../helpers/helpers.j'
import { MONTHS, STUDENTS } from '../../constants/constants'

const Filters = () => {

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  //Handle category & ratings filter
  const handleClick = (checkbox) => {
    const checkboxes = document.getElementsByName(checkbox.name);

    checkboxes.forEach((item) => {
      if(item !== checkbox) item.checked = false;
    });

    if(checkbox.checked === false) {
      //delete filter from query
      if (searchParams.has(checkbox.name)){
        searchParams.delete(checkbox.name)
        const path = window.location.pathname + "?" + searchParams.toString();
        navigate(path);
      }
    }else{
      //set new filter value if already there
      if (searchParams.has(checkbox.name)){
       searchParams.set(checkbox.name, checkbox.value)
      }
      else{
      //append new filter
      searchParams.append(checkbox.name, checkbox.value)
      }
      const path = window.location.pathname + "?" + searchParams.toString();
      navigate(path);
    }
  };

    const defaultCheckHandler = (checkboxType, checkBoxValue)=>{
      const value = searchParams.get(checkboxType)
      if(checkBoxValue === value) return true;
      return false;
    }

  return (
    <div className="border p-3 filter">
      <h3>Filters</h3>

      <hr></hr>
<h5 className="mb-3">Students</h5>
{STUDENTS?.map((category) => (
           <div className="form-check">
           <input
             className="form-check-input"
             type="checkbox"
             name="category"
             id="check4"
             value= {category}
             defaultChecked={defaultCheckHandler("category", category)}
             onClick={(e) => handleClick(e.target)}
           />
           <label className="form-check-label" for="check4"> 
            {category}
            </label>
         </div>
))}

    </div>
  );
};

export default Filters
