
import { ToastContainer } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Route, Routes } from "react-router-dom";
import AddTask from "./Components/AddTask";
import Home from "./Components/Home";
import Login from "./Components/Login/Login";
import RequireAuth from "./Components/RequireAuth";
import Footer from "./Components/Shared/Footer";
import Header from "./Components/Shared/Header";
import SignUp from "./Components/SignUp/SignUp";
import ToDoList from "./Components/ToDoList";
import auth from "./firebase.init";


function App() {
  const [user] = useAuthState(auth);
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={ user ?
          <RequireAuth>
            <ToDoList></ToDoList>
          </RequireAuth>
          : <Home></Home> }>
        </Route>
        <Route path="/addtask" element={ <RequireAuth>
          <AddTask></AddTask>
        </RequireAuth> }></Route>
        <Route path="/login" element={ <Login></Login> }></Route>
        <Route path="/signup" element={ <SignUp></SignUp> }></Route>
      </Routes>
      <Footer></Footer>
      <ToastContainer />
    </div>
  );
}

export default App;
