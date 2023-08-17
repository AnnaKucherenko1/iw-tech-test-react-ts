import { useParams } from 'react-router-dom';
import { getEstablishment } from '../api/ratingsAPI';
import { useEffect, useState } from 'react';
import { headerStyle } from './EstablishmentsTable';
import { tableStyle } from './PaginatedEstablishmentsTable';
import { cellStyle } from './EstablishmentsTableRow';
import { logoStyle } from './HomePage';
type EstablishmentsType = {
  [key: string]: any;
};
const EstablishmentPage = () => {
  const { id } = useParams();
  const [error, setError] = useState<{
    message: string;
    [key: string]: string;
  }>();
  const [establishment, setEstablishment] = useState<EstablishmentsType>({});

  useEffect(() => {
    getEstablishment(id as string).then(
      (result: EstablishmentsType) => {
        setEstablishment(result);
      },
      (error) => {
        setError(error);
      }
    );
  });

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
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
              <tr style={{ borderBottom: '1px solid #ccc' }}>
                <td style={{ ...cellStyle, borderRight: '1px solid #ccc' }}>
                  {establishment?.AddressLine1}<br />
                  {establishment?.AddressLine2}<br />
                  {establishment?.AddressLine3}<br />
                  {establishment?.AddressLine4}
                </td>
                <td style={{ ...cellStyle, borderRight: '1px solid #ccc' }}>{establishment?.RatingValue}</td>
                <td style={cellStyle}>
                  {establishment?.RatingDate ? formatDate(establishment?.RatingDate) : ""}
                </td>
                <td style={cellStyle}></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
};
export default EstablishmentPage;
