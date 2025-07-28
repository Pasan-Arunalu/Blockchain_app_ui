import { Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./components/login";
import Register from "./components/register";
import Farmer from "./components/farmer";
import Distributer from "./components/distributer";
import Retailer from "./components/reatailer";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Box h={"100vh"} w={"100%"} alignContent={"center"}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/farmer" element={<Farmer />} />
            <Route path="/distributor" element={<Distributer />} />
            <Route path="/retailer" element={<Retailer />} />
          </Routes>
        </Router>
      </Box>
    </>
  );
}

export default App;
