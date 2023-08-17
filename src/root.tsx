import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import EstablishmentPage from "./components/EstablishmentPage";

const Root = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/establishment/:id' element={<EstablishmentPage />} />
    </Routes>
  );
};

export default Root;