import { createContext, useContext, useEffect, useState } from 'react';

interface FavoritesType {
  favorites: Array<{ [key: string]: string | null | undefined }>;
  toggleFavorite: (establishment: { [key: string]: string | null | undefined }) => void;
}

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
    { [key: string]: string | null | undefined }[]
  >(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (establishment: { [key: string]: string | null | undefined }) => {
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



