// App.js
import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LocalesExtn from "./extensions/locales";
import SampleExtn from "./extensions/Sample";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/locales-extn" element={<LocalesExtn />} />
        <Route path="/sample-extn" element={<SampleExtn />} />
      </Routes>
    </Router>
  );
}

export default App;
