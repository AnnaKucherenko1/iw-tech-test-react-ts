import { EstablishmentType } from '../types';
import { buttonStyle } from './EstablishmentPage';
import { headerStyle } from './EstablishmentsTable';
import { cellStyle } from './EstablishmentsTableRow';
import { useAppContext } from './AppProvider';

export const FavoritesTable: React.FC = () => {
  const { favorites, toggleFavorite } = useAppContext();
  const clickRemove = (establishment: EstablishmentType) => {
    toggleFavorite(establishment);
  };

  return (
    <div>
      <h2>Favorites</h2>
      <table>
        <tbody>
          <tr>
            <th style={headerStyle}>Business Name</th>
            <th style={headerStyle}>Rating Value</th>
          </tr>
          {favorites.map((establishment: EstablishmentType, index: number) => (
            <tr key={index}>
              <td style={cellStyle}>{establishment.BusinessName}</td>
              <td style={cellStyle}>{establishment.RatingValue}</td>
              <td>
                <button
                  style={buttonStyle}
                  onClick={() => clickRemove(establishment)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
