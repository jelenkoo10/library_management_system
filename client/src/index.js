import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import BookList from "./components/books/BookList";
import ProfileUpdate from "./components/profile/ProfileUpdate";
import Reservations from "./components/reservations/Reservations";
import CurrentReservations from "./components/reservations/CurrentReservations";
import ReservationsHistory from "./components/reservations/ReservationsHistory";
import SearchPage from "./pages/SearchPage";
import LibraryPage from "./pages/LibraryPage";
import FavoritesPage from "./pages/FavoritesPage";
import RecommendationsPage from "./pages/RecommendationsPage";
import SearchResults from "./components/books/SearchResults";
import BookPage from "./pages/BookPage";
import Admin from "./pages/Admin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ModalProvider } from "./context/modal-context";
import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/auth-hook";
import PrivateRoute from "./components/auth-guard/PrivateRoute";
import PublicRoute from "./components/auth-guard/PublicRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Homepage />} />
      <Route path="login" element={<PublicRoute />}>
        <Route path="" element={<Login />} />
      </Route>
      <Route path="signup" element={<PublicRoute />}>
        <Route path="" element={<Signup />} />
      </Route>
      <Route path="profile/:uid/" element={<PrivateRoute />}>
        <Route path="" element={<ProfilePage />}>
          <Route index element={<BookList />} />
          <Route path="update" element={<ProfileUpdate />} />
          <Route path="reservations" element={<Reservations />}>
            <Route index element={<CurrentReservations />} />
            <Route path="history" element={<ReservationsHistory />} />
          </Route>
          <Route path="libraries" element={<LibraryPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="recommendations" element={<RecommendationsPage />} />
        </Route>
      </Route>
      <Route exact path="admin" element={<PrivateRoute />}>
        <Route path="" element={<Admin />} />
      </Route>
      <Route path="search/" element={<SearchPage />} />
      <Route path="results/" element={<SearchResults />} />
      <Route path="book/:bid/" element={<BookPage />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  const { token, login, logout, userId } = useAuth();
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <ModalProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </ModalProvider>
    </AuthContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
