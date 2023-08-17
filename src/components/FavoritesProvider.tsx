import { createContext, useContext, useEffect, useState } from 'react';
import { EstablishmentType, FavoritesType } from '../types';

const FavoritesContext = createContext<FavoritesType | undefined>(undefined);

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavoritesContext must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider: React.FC = ({ children }) => {
  const [favorites, setFavorites] = useState<
    EstablishmentType[]
  >(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (establishment: EstablishmentType) => {
    if (favorites.some(favorite => favorite.FHRSID === establishment.FHRSID)) {
      setFavorites(favorites.filter(favorite => favorite.FHRSID !== establishment.FHRSID));
    } else {
      setFavorites([...favorites, establishment]);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};



