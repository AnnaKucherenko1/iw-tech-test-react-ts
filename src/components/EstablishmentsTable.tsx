import React from 'react';
import { EstablishmentsTableRow } from './EstablishmentsTableRow';
import PropTypes from 'prop-types';
import { ResultAPIType } from '../types';

export const headerStyle: { [key: string]: string | number } = {
  paddingBottom: '10px',
  paddingRight: '10px',
  textAlign: 'left',
  fontSize: '20px',
};

export const EstablishmentsTable: React.FC<{
  establishments: ResultAPIType[] | null | undefined;
  isLoading: boolean;
}> = ({ establishments, isLoading }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th style={headerStyle}>Business Name</th>
          <th style={headerStyle}>Rating Value</th>
          <th style={headerStyle}>Favorite</th>
        </tr>
        {isLoading ? (
          <tr>
            <td colSpan={2}>Loading...</td>
          </tr>
        ) : (
          establishments?.map(
            (
              establishment: ResultAPIType | null | undefined,
              index: React.Key | null | undefined
            ) => (
              <EstablishmentsTableRow
                key={index}
                establishment={establishment}
              />
            )
          )
        )}
      </tbody>
    </table>
  );
};

EstablishmentsTable.propTypes = {
  establishments: PropTypes.array,
};
