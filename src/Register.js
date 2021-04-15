import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";

export default function Register() {
  const [stuff, setStuff] = useState({
    email: "",
    password: "",
  });
  const [password, setPassword] = useState(null);

  const handleInputChange = (event) => {
    //const { value, name } = event.target;
    console.log(
      event.target.value,
      " Yo ",
      event.target.name
    );
    setStuff({
      ...stuff,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(JSON.stringify(stuff));
    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(stuff),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          //props.history.push("/");

          console.log("Yay!");
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error logging in please try again");
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <div
        style={{
          display: "grid",
          justifyContent: "center",
          marginTop: "5%",
        }}
      >
        <h1 style={{ marginLeft: "10%" }}>Register</h1>
        <TextField
          type="email"
          name="email"
          placeholder="Enter email"
          value={stuff.email}
          onChange={handleInputChange}
          required
        />
        <TextField
          type="password"
          name="password"
          placeholder="Enter password"
          value={stuff.password}
          onChange={handleInputChange}
          required
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </div>
    </form>
  );
}
