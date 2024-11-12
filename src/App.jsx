import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage/NotFoundPge";
import ChiSiamo from "./pages/ChiSiamo";
import Contatti from "./pages/Contatti";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import BookDetails from "./components/BookDetails/BookDetails";
import Login from "./pages/Login";
import ProtectedRoutes from "./protectedRoutes/ProtectedRoutes";
import RedirectToPage from "./pages/RedicrectTopage";
import SuccessPage from "./pages/SuccessPage";
import Register from "./pages/Register";

const App = () => {
  const [isUserLogged, setIsUserLogged] = useState(false);

  const handleLogin = () => {
    setIsUserLogged(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/auth/github/callback" element={<RedirectToPage />} />
        <Route path="/success/:token" element={<SuccessPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/Book/:Bookid" element={<BookDetails />} />
        </Route>

        <Route path="/Privacy-Policy" element={<PrivacyPolicy />} />
        <Route path="/chi-siamo" element={<ChiSiamo />} />
        <Route path="/contatti" element={<Contatti />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
