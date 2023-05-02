import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
} from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import BookList from "./components/books/BookList";
import ProfileUpdate from "./components/profile/ProfileUpdate";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Homepage />} />
      <Route path="login/" element={<Login />} />
      <Route path="signup/" element={<Signup />} />
      <Route path="profile/1/" element={<ProfilePage />}>
        <Route index element={<BookList />} />
        <Route
          path="update"
          element={
            <ProfileUpdate
              name="Veljko"
              surname="Jelenkovic"
              phone="0615763440"
              email="veljkojelenkovic00@gmail.com"
            />
          }
        />
        {/* <Route path="reservations" element={<Reservations />}>
          <Route index element={<CurrentReservations />} />
          <Route path="filter" element={<FilteredReservations />} />
          <Route path="history" element={<ReservationsHistory />} />
        </Route> */}
      </Route>
      {/* <Route path="search/" element={<SearchPage />}>
        <Route path="filter" element={<FilteredBooks />} />
        <Route path="results" element={<SearchResults />} />
      </Route>
      <Route path="book/1/" element={<BookPage />}>
        <Route index element={<BookInfo />} />
        <Route path="detailed" element={<BookDetailed />} />
        <Route path="availability" element={<AvailabilityTable />} />
      </Route> */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
