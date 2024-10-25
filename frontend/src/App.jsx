import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import ExperiencePage from "./pages/ExperiencePage"; 
import Navbar from "./components/Navbar";

function App() {
    return (
        <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
            <Navbar />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/add' element={<CreatePage />} />
                <Route path='/:id/experiences' element={<ExperiencePage />} />
            </Routes>
        </Box>
    );
}

export default App;
