import React, { useState } from "react";
import './dropdown.css'
import { ResultAPIType } from "../../types";

export default function Dropdown({ authorities }: ResultAPIType) {
  const [dropdownState, setDropdownState] = useState(false);

  const handleDropdownClick = () => {
    setDropdownState(!dropdownState);
  }
  const uniqueRegionNames = authorities.reduce((uniqueRegions: string[], authority: { RegionName: string }) => {
    if (!uniqueRegions.includes(authority.RegionName)) {
      uniqueRegions.push(authority.RegionName);
    }
    return uniqueRegions;
  }, []);

  console.log(authorities)
  console.log(uniqueRegionNames)

  return (
    <div className='container'>
      <button
        type="button"
        className='button'
        onClick={handleDropdownClick}
      >
        Filter by Authority
      </button>
      {dropdownState && (
        <div className='dropdown'>
          <ul>
            {uniqueRegionNames.map((regionName: string, index: number) => (
              <li key={index}>{regionName}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}