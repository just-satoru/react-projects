import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import AdminPanel from './AdminPanel';
import { AuthContextProvider } from './context/AuthContext';
import { DarkModeContextProvider } from './context/darkModeContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <DarkModeContextProvider>
        <AuthContextProvider>
            <BrowserRouter>
                <AdminPanel />
            </BrowserRouter>
        </AuthContextProvider>
    </DarkModeContextProvider>
);
