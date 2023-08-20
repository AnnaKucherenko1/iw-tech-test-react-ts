import { useState, useEffect } from 'react';
import { EstablishmentsTable } from './EstablishmentsTable';
import { EstablishmentsTableNavigation } from './EstablishmentsTableNavigation';
import {
  getEstablishmentByAuthority,
  getEstablishmentRatings,
} from '../api/ratingsAPI';
import { useAppContext } from '../AppProvider';

export const tableStyle = {
  background: 'rgba(51, 51, 51, 0.9)',
  padding: '10px',
  width: 'max-content',
  marginLeft: '50px',
  marginTop: '10px',
  color: 'white',
};

export const PaginatedEstablishmentsTable = () => {
  const [error, setError] = useState<{
    message: string;
    [key: string]: string;
  }>();
  const [isLoading, setIsLoading] = useState(false);
  const [pageCount] = useState(100);
  const { establishments, setEstablishments, filtredId, pageNum, setPageNum } = useAppContext();

  useEffect(() => {
    if (filtredId === '') {
      setIsLoading(true);
      getEstablishmentRatings(pageNum).then(
        (result) => {
          setEstablishments(result?.establishments);
          setIsLoading(false);
        },
        (error) => {
          setError(error);
        }
      );
    } else {
      getEstablishmentByAuthority(filtredId, pageNum).then(
        (result) => {
          setEstablishments(result.establishments);
          setIsLoading(false);
        },
        (error) => {
          setError(error);
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtredId]);

  async function handlePreviousPage() {
    pageNum > 1 && setPageNum(pageNum - 1);
    setIsLoading(true);
    if (filtredId === '') {
      getEstablishmentRatings(pageNum - 1).then(
        (result) => {
          setEstablishments(result.establishments);
          setIsLoading(false);
        },
        (error) => {
          setError(error);
        }
      );
    } else {
      getEstablishmentByAuthority(filtredId, pageNum - 1).then(
        (result) => {
          setEstablishments(result.establishments);
          setIsLoading(false);
        },
        (error) => {
          setError(error);
        }
      );
    }
  }

  async function handleNextPage() {
    pageNum < pageCount && setPageNum(pageNum + 1);
    setIsLoading(true);
    if (filtredId === '') {
      getEstablishmentRatings(pageNum + 1).then(
        (result) => {
          setEstablishments(result.establishments);
          setIsLoading(false);
        },
        (error) => {
          setError(error);
        }
      );
    } else {
      getEstablishmentByAuthority(filtredId, pageNum + 1).then(
        (result) => {
          setEstablishments(result.establishments);
          setIsLoading(false);
        },
        (error) => {
          setError(error);
        }
      );
    }
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div>
        <div style={tableStyle}>
          <h2>Food Hygiene Ratings</h2>
          <EstablishmentsTable
            establishments={establishments}
            isLoading={isLoading}
          />
          <EstablishmentsTableNavigation
            pageNum={pageNum}
            pageCount={pageCount}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
          />
        </div>
      </div>
    );
  }
};
