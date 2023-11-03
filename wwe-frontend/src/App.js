import ReactDOM from "react-dom/client";
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoadingIndicator from "./Loading";
import LoginUser from "./Main/loginUser";
import RegisterCommonUser from "./CommonUser/registerCommonUser";
import LoginCommonUser from "./CommonUser/loginCommonUser";
import DisplayCommonUserDashboard from "./CommonUser/displayCommonUserDashboard";
import DisplayCommonUserFoodPreference from "./CommonUser/displayCommonUserFoodPreference";
import DisplayCommonUserAllergy from "./CommonUser/displayCommonUserAllergy";
import DisplayCommonUserGoals from "./CommonUser/displayCommonUserGoals";
import BrowseDailyMenu from "./CommonUser/browseDailyMenu";
import LoginDiningHall from "./DiningHall/loginDiningHall"
import RegisterDiningHall from "./DiningHall/registerDiningHall"
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
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(true);

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
                    console.log("role: ", data.role);
                    setRole(data.role);
                    setIsAuthenticated(true);
                } else {
                    Cookies.remove('token');
                    console.log("role: ", role);
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Error fetching login status:", error);
                setIsAuthenticated(false);
            }
            setLoading(false);
        };

        fetchLoginStatus();
    }, []);

    const renderPrivateRoute = (Component) => {
        return isAuth ? <Component /> : <Navigate to="/" />
    };

    const renderLoginPageoginPage = (Component) => {
        if (role === "common") {
            return isAuth ? <Navigate to="/displayCommonUserDashboard" /> : <Component />;
        } else if (role === "dining") {
            return isAuth ? <Navigate to="/displayDiningHallDashboard" /> : <Component />;
        }
        return <Component />
    };

    if (loading) {
        return <LoadingIndicator />
    };

    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Main route */}
                    <Route path="/" element={renderLoginPageoginPage(LoginUser)} />
                    {/* Institution route */}
                    <Route path="/registerInstitution" element={<RegisterInstitution />} />
                    {/* Common User route */}
                    <Route path="/loginCommonUser" element={renderLoginPageoginPage(LoginCommonUser)} />
                    <Route path="/registerCommonUser" element={renderLoginPageoginPage(RegisterCommonUser)} />
                    <Route path="/displayCommonUserDashboard" element={renderPrivateRoute(DisplayCommonUserDashboard)} />
                    <Route path="/browseDailyMenu" element={renderPrivateRoute(BrowseDailyMenu)} />
                    <Route path="/displayCommonUserFoodPreference" element={renderPrivateRoute(DisplayCommonUserFoodPreference)} />
                    <Route path="/displayCommonUserAllergy" element={renderPrivateRoute(DisplayCommonUserAllergy)} />
                    <Route path="/displayCommonUserGoals" element={renderPrivateRoute(DisplayCommonUserGoals)} />
                    <Route path="/displayCommonUserAccount" element={renderPrivateRoute(DisplayCommonUserAccount)} />
                    <Route path="/displayCommonUserPrivacySettings" element={renderPrivateRoute(DisplayCommonUserPrivacySettings)} />
                    <Route path="/mealShoppingCart" element={renderPrivateRoute(MealShoppingCart)} />
                    {/* Dining Hall route */}
                    <Route path="/loginDiningHall" element={renderLoginPageoginPage(LoginDiningHall)} />
                    <Route path="/registerDiningHall" element={renderLoginPageoginPage(RegisterDiningHall)} />
                    <Route path="/displayDiningHallDashboard" element={renderPrivateRoute(DisplayDiningHallDashboard)} />
                    <Route path="/displayDiningHallAccount" element={renderPrivateRoute(DisplayDiningHallAccount)} />
                    {/* Menu route */}
                    <Route path="/displayDailyMenu" element={renderPrivateRoute(DisplayDailyMenu)} />
                    <Route path="/displayMenuItem" element={renderPrivateRoute(DisplayMenuItem)} />
                    <Route path="/createDailyMenu" element={renderPrivateRoute(CreateDailyMenu)} />
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
