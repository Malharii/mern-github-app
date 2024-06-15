import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ExplorePage from "./pages/ExplorePage";
import LikesPage from "./pages/LikesPage";
import Sidebar from "./components/Sidebar";
import { useAuthContext } from "./context/AuthContext";
function App() {
  const { authUser, loading } = useAuthContext();
  console.log("authenticaded user: ", authUser);

  if (loading) return null;
  return (
    <>
      <div className="flex text-white">
        <Sidebar />
        <div className="max-w-5xl my-5 text-white mx-auto transition-all duration-300 flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
            />
            <Route
              path="/sign-up"
              element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
            />
            <Route
              path="/explore"
              element={authUser ? <ExplorePage /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/likes"
              element={authUser ? <LikesPage /> : <Navigate to={"/login"} />}
            />
          </Routes>
          <Toaster />
        </div>
      </div>
    </>
  );
}

export default App;
