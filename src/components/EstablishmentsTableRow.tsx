import { Link } from "react-router-dom";

export const cellStyle = {
  fontSize: '20px',
  color: 'white'
};
export const EstablishmentsTableRow: React.FC<{
  establishment: { [key: string]: string } | null | undefined;
}> = ({ establishment }) => {
  const linkTo = `/establishment/${establishment?.FHRSID}`;

  return (
    <tr>
      <td>
        <Link to={linkTo} style={{ ...cellStyle, cursor: 'pointer' }}>
          {establishment?.BusinessName}
        </Link>
      </td>
      <td style={cellStyle}>{establishment?.RatingValue}</td>
    </tr>
  );
};
