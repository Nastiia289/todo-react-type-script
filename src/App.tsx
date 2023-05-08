import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import AuthPage from "./pages/auth/AuthPage";
import TodoPage from "./pages/todo/TodoPage";
import NotFoundPage from "./pages/404/NotFoundPage";
import { getCurrentUserAsync } from "./store/slices/userSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";

function App() {
  const dispatch = useAppDispatch();
  const token = useAppSelector(({ user }) => user.token);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/auth");
      return;
    }
    dispatch(getCurrentUserAsync());
    navigate("/");
  }, [dispatch, token, navigate]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<TodoPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
