import React, { useState, useEffect } from "react";
export default function QList({ history }) {
  const [quizzes, setQuizzes] = useState([]);
  async function bing() {
    fetch("dingus/dongle", {
      method: "POST",
      //body: JSON.stringify(this.state),
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
      <h1 style={{ textAlign: "center" }}>QList</h1>
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
                  "Howdy , " + JSON.stringify(el)
                );

                console.log("HEyy");
                fetch(`/quiz/${el.name}`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(el),
                });
                history.push({
                  pathname: `/quiz/${el.name}`,
                  quiz: el,
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
          </div>
        );
      })}
    </>
  );
}
