import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from './pages/HomePage/HomePage';
import PartsPage from './pages/PartsPage/PartsPage';
import { PartPage } from './pages/PartPage/PartPage';
import { ROUTES } from "./Routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import BasicNavbar from './components/navbar/navbar';
import { useEffect } from "react";

function App() {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).__TAURI__?.tauri) {
      const { invoke } = (window as any).__TAURI__.tauri;
      
      invoke('tauri', { cmd: 'create' })
        .then((response: any) => console.log(response))
        .catch((error: any) => console.log(error));

      return () => {
        invoke('tauri', { cmd: 'close' })
          .then((response: any) => console.log(response))
          .catch((error: any) => console.log(error));
      };
    }
  }, []);

  return (
    <BrowserRouter>
      <div>
        <BasicNavbar />
        <div className="top">
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