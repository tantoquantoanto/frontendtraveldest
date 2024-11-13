import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NewUsersForm from "./pages/NewUsersForm";
import UserDetails from "./pages/UserDetails";
import NewDestinationsForm from "./components/Destinations/NewDestinationsForm";
import DestinationDetails from "./components/Destinations/DestinationDetails";
import Contatti from "./pages/Contatti";
import { ProtectedRoutes } from "../middleWares/ProtectedRoutes";
import DestinationsPage from "./DestinationsPage";
import OpenDestinationsPage from "./pages/OpenDestinationsPage";
import SuccessLoginPage from "./pages/SuccessLoginPage";
import UserReviewsList from "./pages/UserReviewsList";
import LikedDestinationsPage from "./pages/LikedDestinationsPage";



function App() {
  return (
    <>
      
        <BrowserRouter>
          <Routes>
            
            <Route path="/" exact element={<OpenDestinationsPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contatti" element={<Contatti />} />
            <Route path="/create-new-users" element={<NewUsersForm />} />
            <Route path="/success/:token" element = {<SuccessLoginPage/>} />

            <Route element={<ProtectedRoutes />}>
              <Route
                path="/create-new-destination"
                element={<NewDestinationsForm />}
              />
              <Route path="/destinations" element={<DestinationsPage />} />
              <Route path="/users/:userId" element={<UserDetails />} />
              <Route
                path="/destinations/:destinationId"
                element={<DestinationDetails />}
              />
              <Route path = "/favourite-destinations" element = {<LikedDestinationsPage/>}/>
              <Route path="/reviews-list" element = {<UserReviewsList/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      
    </>
  );
}

export default App;
