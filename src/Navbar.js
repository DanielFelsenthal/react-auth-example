import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  NavButt,
} from "./NavbarElements";
import {
  Link,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import withAuth from "./withAuth";
import Home from "./Home";
import Secret from "./Secret";
import Login from "./Login";
import Register from "./Register";
import Quizzes from "./Quizzes";
import QList from "./QList";
import Quiz from "./Quiz";
import myQuizzes from "./MyQuizzes";
import UpdateQuiz from "./UpdateQuiz";

const Navbar = () => {
  let histo = useHistory();
  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to="/" exact activeStyle>
            Home
          </NavLink>
          <NavLink to="/secret" activeStyle>
            Secret
          </NavLink>
          <NavLink to="/login" activeStyle>
            Login
          </NavLink>
          <NavLink to="/register" activeStyle>
            Register
          </NavLink>
          <NavLink to="/quizzes" activeStyle>
            Make A Quiz
          </NavLink>
          <NavLink to="/myQuizzes" activeStyle>
            My Quizzes
          </NavLink>

          <NavButt
            onClick={(event) => {
              console.log(localStorage.getItem("userEm"));
              localStorage.removeItem("userEm");
              //console.log(req, " Cook ");
              document.cookie = null;
              histo.push("/");
            }}
          >
            Log Out
          </NavButt>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/qlist">Quizzes</NavBtnLink>
        </NavBtn>
      </Nav>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route
          path="/secret"
          component={withAuth(Secret)}
        />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/quizzes" component={Quizzes} />
        <Route path="/qlist" component={QList} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route
          path="/myQuizzes"
          exact
          component={myQuizzes}
        />
        <Route path="/myQuiz/:id" component={UpdateQuiz} />
        <Route
          path="/bingus"
          component={console.log("Hey!")}
        />
      </Switch>
    </>
  );
};

export default Navbar;
