import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
// CSS
import "./assets/css/styles.css";
import "./index.css";
import Login from "./pages/Login";
import Layout from "./routes/Layout";
import RequireAuth from "./routes/RequireAuth";
import Dashboard from "./pages/Dashboard";
import Loading from "./components/Loading";
import axios from "axios";
import CustomerForm from "./pages/CustomerForm";
import SignUp from "./pages/SignUp";
import SuccessPage from "./components/SuccessPage";

function App() {
  axios.defaults.baseURL = `http://localhost:5002/api/`;
  let AUTH_TOKEN = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = "Bearer " + AUTH_TOKEN;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<SignUp />} />
          <Route path='/success' element={<SuccessPage />} />
          {/* Protected Routes */}
          <Route path='/' element={<Layout />}>
            <Route element={<RequireAuth />} >
              <Route exact path='/' element={<Navigate exact to="/admin" replace />} />
              <Route exact path='/admin' element={<Dashboard />} />
              <Route exact path="/customer-form" element={<CustomerForm/>} />
            </Route>
            <Route path='/' element={<Navigate from="*" to="/home" />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
