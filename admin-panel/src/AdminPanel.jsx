import Home from "./pages/home/Home";
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Login from "./pages/login/Login";
import Single from "./pages/single/Single";
import List from "./pages/list/List";
import New from "./pages/new/New";
import { productInputs, userInputs } from "./formSource";
import './style/dark.scss';
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";

const AdminPanel = () => {

  const { darkMode } = useContext(DarkModeContext);

  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? (children) : <Navigate to='/login' />
  };

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        } />
        <Route path="users">
          <Route index element={
            <RequireAuth>
              <List />
            </RequireAuth>
          } />
          <Route path=":userId" element={
            <RequireAuth>
              <Single />
            </RequireAuth>
          } />
          <Route path="new" element={
            <RequireAuth>
              <New inputs={userInputs} title='Add New User' />
            </RequireAuth>
          } />
        </Route>
        <Route path="products">
          <Route index element={
            <RequireAuth>
              <List />
            </RequireAuth>
          } />
          <Route path=":productId" element={
            <RequireAuth>
              <Single />
            </RequireAuth>
          } />
          <Route path="new" element={
            <RequireAuth>
              <New inputs={productInputs} title='Add New Product' />
            </RequireAuth>
          } />
        </Route>
        <Route path="orders" element={
          <RequireAuth>
            <List />
          </RequireAuth>
        } />
        <Route path="profile" element={
          <RequireAuth>
            <Single />
          </RequireAuth>
        } />
      </Routes>
    </div>
  );
};

export default AdminPanel;