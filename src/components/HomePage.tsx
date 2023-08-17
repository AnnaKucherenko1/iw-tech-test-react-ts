import { PaginatedEstablishmentsTable, tableStyle } from "./PaginatedEstablishmentsTable";
import Background from "../static/logo.svg";
import { FavoritesTable } from "./FavoritesTable";

export const logoStyle: { [key: string]: string | number } = {
  width: "640px",
  height: "25px",
  background: `transparent url(${Background}) no-repeat center`,
  margin: "20px auto",
};

const HomePage = () => {
  return (
    <>
      <div>
        <header style={logoStyle} />
        <PaginatedEstablishmentsTable />
      </div>
      <div style={tableStyle}>
        <FavoritesTable />
      </div>
    </>
  );
};

export default HomePage;
