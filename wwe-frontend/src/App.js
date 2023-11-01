import ReactDOM from "react-dom/client";
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import DisplayCommonUserPrivacySettings from "./CommonUser/displayCommonUserPrivacySettings";
import Cookies from 'js-cookie';

function App() {
    const [isAuth, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchLoginStatus = async () => {
            try {
                const token = Cookies.get('token');
                const apiUrl = `http://127.0.0.1:8080/login_status`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    }
                };
                const response = await fetch(apiUrl, requestOptions);
                const data = await response.json();

                // Check the returned data to decide if authenticated or not.
                // For example:
                if (data.status === "success") {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Error fetching login status:", error);
                setIsAuthenticated(false);
            }
        };

        fetchLoginStatus();
    }, []);

    const renderPrivateRoute = (Component) => {
        return isAuth ? <Component /> : <Navigate to="/" />;
    };

    const renderLoginPage = (Component) => {
        return isAuth ? <Navigate to="/displayCommonUserDashboard" /> : <Component />;
    };


    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Main route */}
                    <Route path="/" element={renderLoginPage(LoginUser)} />
                    {/* Institution route */}
                    <Route path="/registerInstitution" element={<RegisterInstitution />} />
                    {/* Common User route */}
                    <Route path="/loginCommonUser" element={renderLoginPage(LoginCommonUser)} />
                    <Route path="/registerCommonUser" element={renderLoginPage(RegisterCommonUser)} />
                    <Route path="/displayCommonUserDashboard" element={renderPrivateRoute(DisplayCommonUserDashboard)} />
                    <Route path="/browseDailyMenu" element={renderPrivateRoute(BrowseDailyMenu)} />
                    <Route path="/displayCommonUserFoodPreference" element={renderPrivateRoute(DisplayCommonUserFoodPreference)} />
                    <Route path="/displayCommonUserAllergy" element={renderPrivateRoute(DisplayCommonUserAllergy)} />
                    <Route path="/displayCommonUserGoals" element={renderPrivateRoute(DisplayCommonUserGoals)} />
                    <Route path="/displayCommonUserAccount" element={renderPrivateRoute(DisplayCommonUserAccount)} />
                    <Route path="/displayCommonUserPrivacySettings" element={renderPrivateRoute(DisplayCommonUserPrivacySettings)} />
                    <Route path="/mealShoppingCart" element={renderPrivateRoute(MealShoppingCart)} />
                    {/* Dining Hall route */}
                    <Route path="/loginDiningHall" element={<LoginDiningHall />} />
                    <Route path="/registerDiningHall" element={<RegisterDiningHall />} />
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


export default App;

//pipenv shell
//netstat -ano | findstr "8080"
//taskkill /PID 5172 /F
//cd C:\Users\24560\Senior Design\WWETG2\wwetg2app
//gearbox serve --reload --debug
//cd C:\Users\24560\Senior Design\WWETG2\wwe-frontend
//npm start
