import { useEffect, useState } from "react";
import AuthForm from "./components/AuthForm";
import TaskForm from "./components/TaskForm";
import Header from "./components/Header";

function App() {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    if (token && username) {
      // Nothing needed here, but this ensures React rerenders when both are set
      console.log("User authenticated");
    }
  }, [token, username]);

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setUsername(null);
  };

  return (
    <div>
      <Header username={username} onLogout={handleLogout} />
      {token && username ? (
        <TaskForm token={token} />
      ) : (
        <AuthForm setToken={setToken} setUsername={setUsername} />
      )}
      {console.log(token,username)}
    </div>
  );
}

export default App;
