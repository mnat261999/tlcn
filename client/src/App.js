import React, {createContext, useState, useEffect} from 'react'
import{BrowserRouter as Router} from 'react-router-dom'
import {DataProvider} from './GlobalState'
import {Helmet} from "react-helmet";
import Header from './components/headers/Header'
import MainPages from './components/mainpages/Pages'
function App() {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  });

  
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://code.jquery.com/ui/1.12.1/jquery-ui.min.js';
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  });
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://mnat261999.github.io/js/vendor/modernizr-3.5.0.min.js';
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  });


  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://mnat261999.github.io/js/popper.min.js';
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://mnat261999.github.io/js/bootstrap.min.js';
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://mnat261999.github.io/js/plugins.js';
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://mnat261999.github.io/js/active.js';
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  });

  return (
    <DataProvider>
      <Router>
          <Header/>
          <MainPages />
      </Router>
    </DataProvider>
  );
}

export default App;
