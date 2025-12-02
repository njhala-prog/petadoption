import React from "react";
import { Header } from "./components/Layouts/Header";
import { Footer } from "./components/Layouts/Footer";
import { AllRoutes } from "./routes/AllRoutes";



function App() {
 alert("Loading of pets may take few seconds please wait a  little")
  return (
    <div className="App">

      <Header />
      <AllRoutes />
      <Footer />



    </div>
  );
}

export default App;
