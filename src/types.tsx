import { Dispatch, SetStateAction } from "react";

export type EstablishmentType = {
  [key: string]: string | null | undefined
}
export type ProviderType = {
  favorites: Array<{ [key: string]: string | null | undefined }>;
  toggleFavorite: (establishment: EstablishmentType) => void;
  establishments: ResultAPIType[];
  setEstablishments: Dispatch<SetStateAction<{ [key: string]: string; }[]>>;
  filtredId: string,
  setFiltredId: Dispatch<SetStateAction<string>>
  pageNum: number;
  setPageNum: Dispatch<SetStateAction<number>>
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
export type AuthoritiesType = {
  authorities: {}[];
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