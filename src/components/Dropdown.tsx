import React, { useState } from 'react';
import { ResultAPIType } from '../types';
import { useAppContext } from '../AppProvider';
import { buttonStyle } from './EstablishmentPage';

const containerStyle: React.CSSProperties = {
  position: 'relative',
  display: 'inline-block'
};

const ulStyle = {
  listStyle: 'none',
  padding: '0',
  margin: '0',
  backgroundColor: 'rgba(51, 51, 51, 0.9)',
  color: 'white'
};

const liStyle = {
  padding: '8px 12px',
  cursor: 'pointer'
};

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
    <div style={containerStyle}>
      <button type='button' style={buttonStyle} onClick={handleDropdownClick}>
        Filter by Authority
      </button>
      {dropdownState && (
        <div>
          <ul style={ulStyle}>
            {Object.keys(uniqueRegionData).map(
              (regionName: string, index: number) => (
                <li style={liStyle}
                  className='liStyle'
                  key={index}
                  onClick={() => setFiltredId(uniqueRegionData[regionName])}
                >
                  {regionName}
                </li>
              )
            )}
            <li style={liStyle} className='liStyle' onClick={() => setFiltredId('')}>All authorities</li>
          </ul>
        </div>
      )}
    </div>
  );
}
