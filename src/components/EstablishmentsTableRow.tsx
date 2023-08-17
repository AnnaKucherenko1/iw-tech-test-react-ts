export const EstablishmentsTableRow: React.FC<{
  establishment: { [key: string]: string } | null | undefined;
}> = ({ establishment }) => {
  const cellStyle = {
    fontSize: '20px',
    cursor: 'pointer',
  };
  const handleClick = () => {
    console.log(establishment, 'this was clicked');
  };

  return (
    <tr>
      <td style={cellStyle} onClick={handleClick}
      >
        {establishment?.BusinessName}
      </td>
      <td style={cellStyle}>{establishment?.RatingValue}</td>
    </tr>
  );
};
