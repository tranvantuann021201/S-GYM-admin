import React, { useState } from "react";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from './screens/HomeScreen';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="app">
      {isLoggedIn ? (
        <HomeScreen />
      ) : (
        <div className="login-form">
          <div className="title">Đăng nhập</div>
          <LoginScreen onLogin={() => setIsLoggedIn(true)} />
        </div>
      )}
    </div>
  );
}

export default App;
