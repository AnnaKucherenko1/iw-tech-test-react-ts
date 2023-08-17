import { Link } from "react-router-dom";
import { useFavoritesContext } from "./FavoritesProvider";

export const cellStyle = {
  fontSize: '20px',
  color: 'white'
};
export const EstablishmentsTableRow: React.FC<{
  establishment: { [key: string]: string } | null | undefined;
}> = ({ establishment }) => {
  const linkTo = `/establishment/${establishment?.FHRSID}`;
  const { toggleFavorite, favorites } = useFavoritesContext();
  const favorite = favorites?.some(fav => fav.FHRSID === establishment?.FHRSID);
  const checkBoxClick = () => {
    if (establishment) {
      toggleFavorite(establishment);

    }
  }

  return (
    <tr>
      <td>
        <Link to={linkTo} style={{ ...cellStyle, cursor: 'pointer' }}>
          {establishment?.BusinessName}
        </Link>
      </td>
      <td style={cellStyle}>{establishment?.RatingValue}</td>
      <td>
        <input type="checkbox" checked={favorite} onChange={checkBoxClick} />
      </td>
    </tr>
  );
};
