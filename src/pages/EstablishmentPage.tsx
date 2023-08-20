import { useParams, useNavigate } from 'react-router-dom';
import { getEstablishment } from '../api/ratingsAPI';
import { useEffect, useState } from 'react';
import { headerStyle } from '../components/EstablishmentsTable';
import { tableStyle } from '../components/PaginatedEstablishmentsTable';
import { cellStyle } from '../components/EstablishmentsTableRow';
import { logoStyle } from './HomePage';
import { FavoritesTable } from '../components/FavoritesTable';
import { ResultAPIType } from '../types';

export const buttonStyle = {
  background: 'rgba(51, 51, 51, 0.9)',
  padding: '10px',
  marginTop: '10px',
  color: 'white',
  borderRadius: '5px',
};

const EstablishmentPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState<{
    message: string;
    [key: string]: string;
  }>();
  const [establishment, setEstablishment] = useState<ResultAPIType>({});

  useEffect(() => {
    setIsLoading(true)
    getEstablishment(id as string).then(
      (result: ResultAPIType) => {
        setEstablishment(result);
        setIsLoading(false)
      },
      (error) => {
        setError(error);
      }
    );
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  const handleBtnClick = () => {
    navigate('/');
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
        <div>
          <header style={logoStyle} />
          <div style={tableStyle}>
            <table>
              <tbody>
                <tr>
                  <th style={headerStyle}>Address</th>
                  <th style={headerStyle}>Rating Value</th>
                  <th style={headerStyle}>Date of Inspection</th>
                </tr>
                {isLoading ? (
                  <tr>
                    <td colSpan={3}>Loading...</td>
                  </tr>
                ) : (
                  <tr style={{ borderBottom: '1px solid #ccc' }}>
                    <td style={{ ...cellStyle, borderRight: '1px solid #ccc' }}>
                      {establishment?.AddressLine1 !== '' &&
                        `${establishment?.AddressLine1},`}
                      <br />
                      {establishment?.AddressLine2 !== '' &&
                        `${establishment?.AddressLine2},`}
                      <br />
                      {establishment?.AddressLine3 !== '' &&
                        `${establishment?.AddressLine3},`}
                      <br />
                      {establishment?.AddressLine4 !== '' &&
                        establishment?.AddressLine4}
                    </td>
                    <td style={{ ...cellStyle, borderRight: '1px solid #ccc' }}>
                      {establishment?.RatingValue}
                    </td>
                    <td style={cellStyle}>
                      {establishment?.RatingDate
                        ? formatDate(establishment?.RatingDate)
                        : ''}
                    </td>
                    <td style={cellStyle}></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <button onClick={handleBtnClick} style={{ ...buttonStyle, marginLeft: '50px', }}>
            go back
          </button>
        </div>
        <div style={tableStyle}>
          <FavoritesTable />
        </div>
      </>
    );
  }
};
export default EstablishmentPage;
