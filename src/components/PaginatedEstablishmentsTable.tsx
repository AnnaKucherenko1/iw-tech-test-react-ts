import { useState, useEffect } from 'react';
import { EstablishmentsTable } from './EstablishmentsTable';
import { EstablishmentsTableNavigation } from './EstablishmentsTableNavigation';
import { getEstablishmentByAuthority, getEstablishmentRatings } from '../api/ratingsAPI';
import { useFavoritesContext } from './FavoritesProvider';

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
  const [pageNum, setPageNum] = useState(1);
  const [pageCount] = useState(100);
  const { establishments, setEstablishments, filtredId } = useFavoritesContext();

  useEffect(() => {
    setIsLoading(true);
    if (filtredId === '') {
      getEstablishmentRatings(pageNum).then(
        (result) => {
          console.log(result)
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
          setEstablishments(result.establishments)
          console.log(establishments, 'this is establishment from dropdown')
          setIsLoading(false);
        },
        (error) => {
          setError(error);
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtredId]);
  console.log(filtredId)
  async function handlePreviousPage() {
    pageNum > 1 && setPageNum(pageNum - 1);
    setIsLoading(true);
    if (filtredId === '') {
      getEstablishmentRatings(pageNum).then(
        (result) => {
          setEstablishments(result.establishments);
          setIsLoading(false);
        },
        (error) => {
          setError(error);
        }
      );
    } else {
      getEstablishmentByAuthority(filtredId, pageNum).then(
        (result) => {
          setEstablishments(result.establishments)
          setIsLoading(false);
        },
        (error) => {
          setError(error);
        }
      );
    }
  }
  console.log(establishments, 'for test')
  async function handleNextPage() {
    pageNum < pageCount && setPageNum(pageNum + 1);
    setIsLoading(true);
    if (filtredId === '') {
      console.log('i am here in defoult call', pageNum, filtredId)
      getEstablishmentRatings(pageNum).then(
        (result) => {
          setEstablishments(result.establishments);
          setIsLoading(false);
        },
        (error) => {
          setError(error);
        }
      );
    } else {
      console.log('i am here in filtred call', pageNum, filtredId)
      getEstablishmentByAuthority(filtredId, pageNum).then(
        (result) => {
          setEstablishments(result.establishments)
          console.log(result)
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
