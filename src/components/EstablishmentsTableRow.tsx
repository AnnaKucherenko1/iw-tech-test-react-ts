export const EstablishmentsTableRow: React.FC<{
  establishment: { [key: string]: string } | null | undefined;
}> = ({ establishment }) => {

  const cellStyle = {
    fontSize: '20px',
  };

  return (
    <tr>
      <td style={cellStyle}>{establishment?.BusinessName}</td>
      <td style={cellStyle}>{establishment?.RatingValue}</td>
    </tr>
  );
};
