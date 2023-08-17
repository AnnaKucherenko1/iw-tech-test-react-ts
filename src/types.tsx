export type EstablishmentType = {
  [key: string]: string | null | undefined
}
export type FavoritesType = {
  favorites: Array<{ [key: string]: string | null | undefined }>;
  toggleFavorite: (establishment: EstablishmentType) => void;
}
export type ResultAPIType = {
  [key: string]: any;
};
export type EstablishmentsTableNavigationType = {
  pageNum: number;
  pageCount: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
};
export type EstablishmentsType = {
  establishments: {}[];
  meta: {
    dataSource: string;
    extractDate: string;
    itemCount: number;
    returncode: string;
    totalCount: number;
    totalPages: number;
    pageSize: number;
    pageNumber: number;
  };
  links: [
    {
      rel: string;
      href: string;
    }
  ];
};