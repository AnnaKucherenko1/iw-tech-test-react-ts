import React, { useState } from 'react';
import './dropdown.css';
import { ResultAPIType } from '../../types';
import { useAppContext } from '../AppProvider';

export default function Dropdown({ authorities }: ResultAPIType) {
  const [dropdownState, setDropdownState] = useState(false);
  const { setFiltredId } = useAppContext();

  const handleDropdownClick = () => {
    setDropdownState(!dropdownState);
  };

  const uniqueRegionData = authorities.reduce(
    (
      uniqueRegions: { [key: string]: string },
      authority: { LocalAuthorityId: string; RegionName: string }
    ) => {
      if (!uniqueRegions[authority.RegionName]) {
        uniqueRegions[authority.RegionName] = authority.LocalAuthorityId;
      }
      return uniqueRegions;
    },
    {}
  );

  return (
    <div className='container'>
      <button type='button' className='button' onClick={handleDropdownClick}>
        Filter by Authority
      </button>
      {dropdownState && (
        <div className='dropdown'>
          <ul>
            {Object.keys(uniqueRegionData).map(
              (regionName: string, index: number) => (
                <li
                  key={index}
                  onClick={() => setFiltredId(uniqueRegionData[regionName])}
                >
                  {regionName}
                </li>
              )
            )}
            <li onClick={() => setFiltredId('')}>All authorities</li>
          </ul>
        </div>
      )}
    </div>
  );
}
