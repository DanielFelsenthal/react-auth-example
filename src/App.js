import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from "react-router-dom";
import withAuth from "./withAuth";
import Home from "./Home";
import Secret from "./Secret";
import Login from "./Login";
import Register from "./Register";
import Quizzes from "./Quizzes";
import QList from "./QList";
import Quiz from "./Quiz";

class App extends Component {
  render() {
    return (
      <Router>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/secret">Secret</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/quizzes">Make a Quiz</Link>
          </li>
          <li>
            <Link to="/qlist"> Quizzes</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/secret"
            component={withAuth(Secret)}
          />
          <Route path="/register" component={Register} />
          <Route path="/quizzes" component={Quizzes} />
          <Route path="/qlist" component={QList} />
          <Route path="/quiz" component={Quiz} />
        </Switch>
      </Router>
    );
  }
}

export default App;
