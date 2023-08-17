import { headerStyle } from "./EstablishmentsTable";
import { useFavoritesContext } from "./FavoritesProvider";


export const FavoritesTable: React.FC = () => {
  const { favorites } = useFavoritesContext();
  return (
    <div>
      <h2>Favorites</h2>
      <table>
        <tbody>
          <tr>
            <th style={headerStyle}>Business Name</th>
            <th style={headerStyle}>Rating Value</th>
          </tr>
          {favorites.map((establishment, index) => (
            <tr key={index}>
              <td>{establishment.BusinessName}</td>
              <td>{establishment.RatingValue}</td>
              <td>
                <button>remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};