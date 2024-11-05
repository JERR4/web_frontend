import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from './pages/HomePage/HomePage';
import PartsPage from './pages/PartsPage/PartsPage';
import { PartPage } from './pages/PartPage/PartPage';
import { ROUTES } from "./Routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import BasicNavbar from './components/navbar/navbar';
function App() {
  return (
    <BrowserRouter>
      <div>
        <BasicNavbar />
        <div className="top"> {/* Контейнер для содержимого страниц */}
          <Routes>
            <Route path={ROUTES.HOME} index element={<HomePage />} />
            <Route path={ROUTES.PARTS} element={<PartsPage />} />
            <Route path={`${ROUTES.PARTS}/:id`} element={<PartPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;