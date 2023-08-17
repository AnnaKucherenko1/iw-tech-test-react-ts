import { EstablishmentsType } from "../types";


export function getEstablishmentRatings(
  pageNum: number
): Promise<EstablishmentsType> {
  return fetch(
    `http://api.ratings.food.gov.uk/Establishments/basic/${pageNum}/10`,
    { headers: { "x-api-version": "2" } }
  ).then((res) => res.json());
}
export function getEstablishment(
  id: string
): Promise<EstablishmentsType> {
  return fetch(
    `http://api.ratings.food.gov.uk/Establishments/${id}`,
    { headers: { "x-api-version": "2" } }
  ).then((res) => res.json());
}

