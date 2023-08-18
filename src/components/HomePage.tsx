import {
  PaginatedEstablishmentsTable,
  tableStyle,
} from './PaginatedEstablishmentsTable';
import Background from '../static/logo.svg';
import { FavoritesTable } from './FavoritesTable';
import Dropdown from './Dropdown/Dropdown';
import { useEffect, useState } from 'react';
import { getAuthorities } from '../api/ratingsAPI';

export const logoStyle: { [key: string]: string | number } = {
  width: '640px',
  height: '25px',
  background: `transparent url(${Background}) no-repeat center`,
  margin: '20px auto',
};
const mainDiv: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
};
const tablesStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

const HomePage = () => {
  const [authorities, setAuthorities] = useState<{ [key: string]: string }[]>(
    []
  );
  const [error, setError] = useState<{
    message: string;
    [key: string]: string;
  }>();
  useEffect(() => {
    getAuthorities().then(
      (result) => {
        setAuthorities(result?.authorities);
      },
      (error) => {
        setError(error);
      }
    );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
        <div>
          <header style={logoStyle} />
        </div>
        <div style={mainDiv}>
          <Dropdown authorities={authorities} />
          <div style={tablesStyle}>
            <PaginatedEstablishmentsTable />
            <div style={tableStyle}>
              <FavoritesTable />
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default HomePage;
