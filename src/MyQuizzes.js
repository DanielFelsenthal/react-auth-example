import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
export default function MyQuizzes({ history }) {
  const [quizzes, setQuizzes] = useState([]);
  async function bing() {
    console.log(
      JSON.stringify(localStorage.getItem("userEm"))
    );

    fetch("dingus/dingle", {
      method: "POST",
      //body: JSON.stringify(this.state),

      //body: JSON.stringify(localStorage.getItem("userEm")),
      body: JSON.stringify({
        Email: localStorage.getItem("userEm"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((jres) => {
        let ary = [];
        jres.forEach((element) => {
          ary.push(element);
          //console.log(element.name);
        });
        console.log(ary, "bingos");
        setQuizzes([...ary]);
      })
      .catch((err) => {
        console.error(err);
        alert("Error donging in please try again");
        //.then((res) => console.log(res.json()))
      });
  }
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("xval, ", quizzes.length);
    bing();
    console.log("xval21 ", quizzes.length);
  }, []);

  useEffect(() => {
    if (quizzes.length > 0) {
      setLoading(false);
    }
  }, [quizzes.length]);
  if (loading) {
    return null;
  }
  return (
    <>
      <h1 style={{ textAlign: "center" }}>My Quizzes</h1>
      {quizzes.map((el, ind) => {
        //else {
        {
          console.log(el.id);
        }
        return (
          <div>
            <h2
              style={{
                marginLeft: "45%",
                textAlign: "center",
                display: "inline-block",
              }}
              onClick={(event) => {
                console.log(
                  "Howdy , " + JSON.stringify(el) + " ",
                  el._id
                );
                fetch("dingus/derngle", {
                  method: "POST",
                  //body: JSON.stringify(this.state),

                  //body: JSON.stringify(localStorage.getItem("userEm")),
                  body: JSON.stringify({
                    id: el._id,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
                  .then((res) => {
                    //console.log(res.json(), " LibDem ")
                    return res.json();
                  })
                  .then((jres) => {
                    history.push({
                      pathname: `myQuiz/${el._id}`,
                      qu: jres,
                    });
                  })
                  .catch((err) => {
                    console.error(err);
                    alert(
                      "Error donging in please try again"
                    );
                    //.then((res) => console.log(res.json()))
                  });
              }}
            >
              {el.name}
            </h2>
            <h4
              style={{
                marginLeft: "2.5%",
                textAlign: "center",
                display: "inline-block",
              }}
            >
              by {el.email || "Anon"}
            </h4>
            <Button
              variant="contained"
              style={{ marginLeft: "10%" }}
              onClick={(event) => {
                console.log("Deletion ", el._id);
                fetch("dingus/delgle", {
                  method: "DELETE",
                  //body: JSON.stringify(this.state),

                  //body: JSON.stringify(localStorage.getItem("userEm")),
                  body: JSON.stringify({
                    Id: el._id,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
                  .then((res) => console.log(res))
                  .catch((err) => console.error(err));
              }}
            >
              Delete
            </Button>
          </div>
        );
      })}
    </>
  );
}
