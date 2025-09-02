import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import HtmlPage from "./pages/htmlPage";
import PdfPage from "./pages/pdfPage";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/html-editor" element={<HtmlPage />} />
          <Route path="/pdf-editor" element={<PdfPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
