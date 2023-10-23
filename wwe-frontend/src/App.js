// import logo from './logo.svg';
// import './App.css';
// import React, { useEffect, useState } from 'react';

// function App() {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     // Fetch data from TG2 backend
//     fetch("http://localhost:8080/helloworld")
//       .then(response => response.json())
//       .then(data => setMessage(data.message));
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         {message}
//       </header>
//     </div>
//   );
// }

// export default App;
// import logo from './logo.svg';
// import './App.css';
import ReactDOM from "react-dom/client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginUser from "./Main/loginUser";
import RegisterCommonUser from "./CommonUser/registerCommonUser";
import LoginCommonUser from "./CommonUser/loginCommonUser";
import ForgetCommonUserPassword from "./CommonUser/forgetCommonUserPassword";
import DisplayCommonUserDashboard from "./CommonUser/displayCommonUserDashboard";
import DisplayCommonUserFoodPreference from "./CommonUser/displayCommonUserFoodPreference";
import DisplayCommonUserAllergy from "./CommonUser/displayCommonUserAllergy";
import DisplayCommonUserGoals from "./CommonUser/displayCommonUserGoals";
import BrowseDailyMenu from "./CommonUser/browseDailyMenu";
import LoginDiningHall from "./DiningHall/loginDiningHall"
import RegisterDiningHall from "./DiningHall/registerDiningHall"
import ForgetDiningHallPassword from "./DiningHall/forgetDiningHallPassword";
import DisplayDiningHallDashboard from "./DiningHall/displayDiningHallDashboard";
import DisplayMenuItem from "./Menu/displayMenuItem"
import DisplayDailyMenu from "./Menu/displayDailyMenu";
import RegisterInstitution from "./Institution/registerInstitution";
import MealShoppingCart from "./CommonUser/mealShoppingCart";
import CreateDailyMenu from "./Menu/createDailyMenu";
import DisplayDiningHallAccount from "./DiningHall/displayDininghallAccount";
import DisplayCommonUserAccount from "./CommonUser/displayCommonUserAccount";

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                setData(null);
            });
    }, []);

// THESE LINES ARE USED TO TEST THE DATABASE CONNECTION ONLY
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     // Fetch data from TG2 backend
//     fetch("http://localhost:8080/helloworld")
//       .then(response => response.json())
//       .then(data => setMessage(data.message));
//   }, []);

//   return (
//     <div className="App">
//       <h1>
//         {message}
//       </h1>
//     </div>
//   );


    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Main route */}
                    <Route path="/" element={<LoginUser />} />
                    {/* Institution route */}
                    <Route path="/registerInstitution" element={<RegisterInstitution />} />
                    {/* Common User route */}
                    <Route path="/loginCommonUser" element={<LoginCommonUser />} />
                    <Route path="/registerCommonUser" element={<RegisterCommonUser />} />
                    <Route path="/forgetCommonUserPassword" element={<ForgetCommonUserPassword />} />
                    <Route path="/displayCommonUserDashboard" element={<DisplayCommonUserDashboard />} />
                    <Route path="/browseDailyMenu" element={<BrowseDailyMenu />} />
                    <Route path="/displayCommonUserFoodPreference" element={<DisplayCommonUserFoodPreference />} />
                    <Route path="/displayCommonUserAllergy" element={<DisplayCommonUserAllergy />} />
                    <Route path="/displayCommonUserGoals" element={<DisplayCommonUserGoals />} />
                    <Route path="/displayCommonUserAccount" element={<DisplayCommonUserAccount />} />
                    <Route path="/mealShoppingCart" element={<MealShoppingCart />} />
                    {/* Dining Hall route */}
                    <Route path="/loginDiningHall" element={<LoginDiningHall />} />
                    <Route path="/registerDiningHall" element={<RegisterDiningHall />} />
                    <Route path="/forgetDiningHallPassword" element={<ForgetDiningHallPassword />} />
                    <Route path="/displayDiningHallDashboard" element={<DisplayDiningHallDashboard />} />
                    <Route path="/displayDiningHallAccount" element={<DisplayDiningHallAccount />} />
                    {/* Menu route */}
                    <Route path="/displayDailyMenu" element={<DisplayDailyMenu />} />
                    <Route path="/displayMenuItem" element={<DisplayMenuItem />} />
                    <Route path="/createDailyMenu" element={<CreateDailyMenu />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App;
