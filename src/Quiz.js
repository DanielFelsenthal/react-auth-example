import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleRight,
  faArrowCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@material-ui/core";
export default function Quiz(props) {
  const [loading, setLoading] = useState(true);
  let [curQNum, updateQNum] = useState(0);
  let [qz, updateQz] = useState(null);
  let [userGuesses, updateUserGuesses] = useState([]);
  console.log(props.location.quiz, " SLIDE");
  let history = useHistory();

  Array.prototype.insert = function (index, item) {
    this[index] = item;
    return this;
  };

  useEffect(() => {
    console.log("Checkmeout!");
    if (!props.location.quiz) {
      console.log("NoCheck!");
      return;
    }
    updateQz(props.location.quiz);

    updateQNum(0);
    setLoading(false);
    updateUserGuesses(
      Array.apply(
        null,
        Array(props.location.quiz.questions.length)
      ).map(function () {})
    );
  }, []);
  if (loading) return null;
  return (
    <div
      style={{
        width: "90%",
        height: "99.5%",
        marginLeft: "5%",
        marginTop: "5%",
      }}
    >
      <div
        id="correctness"
        style={{
          border: "2px solid purple",
          width: "15%",
          height: "15%",
          position: "absolute",
          top: "148px",
          left: "143px",
          color: "white",
          display: "none",
          textAlign: "center",
        }}
      >
        {" "}
        Hey
      </div>
      <div
        style={{
          marginLeft: "75%",
          marginTop: "0",
          //border: "2px dotted green",
          position: "relative",
        }}
      >
        <FontAwesomeIcon
          icon={faArrowCircleLeft}
          size="2x"
          style={{
            position: "absolute",
            marginTop: "20%",
            marginLeft: "5%",
          }}
          onClick={(event) => {
            console.log("qDropped! ", curQNum);
            if (curQNum > 0) {
              updateQNum(--curQNum);
              console.log(userGuesses[curQNum], " CurK");
              if (userGuesses[curQNum] == null) {
                document.getElementById(
                  "correctness"
                ).style.display = "none";
              } else if (userGuesses[curQNum] == -1) {
                document.getElementById(
                  "correctness"
                ).style.display = "inline";
                document.getElementById(
                  "correctness"
                ).style.backgroundColor = "green";
              } else {
                document.getElementById(
                  "correctness"
                ).style.display = "inline";
                document.getElementById(
                  "correctness"
                ).style.backgroundColor = "red";
              }
            }
          }}
        />
        <FontAwesomeIcon
          icon={faArrowCircleRight}
          size="2x"
          style={{
            position: "absolute",
            marginTop: "20%",
            marginLeft: "15%",
          }}
          onClick={(event) => {
            console.log("qChanged! ", curQNum);
            if (
              curQNum <
              props.location.quiz.questions.length - 1
            )
              console.log(userGuesses[curQNum], " CurQ");
            {
              updateQNum(++curQNum);
              if (userGuesses[curQNum] == null) {
                document.getElementById(
                  "correctness"
                ).style.display = "none";
              } else if (userGuesses[curQNum] == -1) {
                document.getElementById(
                  "correctness"
                ).style.display = "inline";
                document.getElementById(
                  "correctness"
                ).style.backgroundColor = "green";
              } else {
                document.getElementById(
                  "correctness"
                ).style.display = "inline";
                document.getElementById(
                  "correctness"
                ).style.backgroundColor = "red";
              }
            }
          }}
        />
      </div>

      <h1 style={{ textAlign: "center" }}>
        {props.location.quiz.name}
      </h1>
      <div style={{ textAlign: "center" }}>
        <h2>
          {
            //props.location.quiz.questions[curQNum].qText
            qz.questions[curQNum].qText
          }
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "45% 45%",
          gridTemplateRows: "20% 20% 20% 20%",
          margin: "auto",
          width: "90%",
          border: "1px solid green",
          height: "50%",
        }}
      >
        {qz.questions[curQNum].answers.map((ans, aInd) => {
          return (
            <div
              style={{
                gridColumn: 2 - ((aInd + 1) % 2),
                gridRow: (aInd + 1) / 2,
                //border: "1px solid red",
                marginLeft: "25px",
                display: "grid",
                gridTemplateColumns: "80% 5%",
                gridTemplateRow: "1",
                width: "80%",
              }}
            >
              <p style={{ gridColumn: "1", width: "90%" }}>
                {ans ? ans : " unuf"}
              </p>
              <input
                type="radio"
                name="question"
                style={{ gridColumn: "2" }}
                onClick={(event) => {
                  if (userGuesses[curQNum] == null)
                    updateUserGuesses(
                      userGuesses.insert(curQNum, aInd)
                    );
                  console.log(
                    userGuesses,
                    "UseGuessies ",
                    qz.questions[curQNum].correct
                  );
                }}
              ></input>
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          //border: "3px solid green",
          height: "15%",
        }}
      >
        <Button
          onClick={(event) => {
            //Negative one means right
            console.log(
              userGuesses[curQNum] ==
                qz.questions[curQNum].correct
            );
            if (userGuesses[curQNum] != -1) {
              document.getElementById(
                "correctness"
              ).style.display = "inline";
              if (
                userGuesses[curQNum] ==
                qz.questions[curQNum].correct
              ) {
                document.getElementById(
                  "correctness"
                ).style.backgroundColor = "green";
                userGuesses[curQNum] = -1;
              } else {
                document.getElementById(
                  "correctness"
                ).style.backgroundColor = "red";
                userGuesses[curQNum] = -2;
              }
            }
          }}
          variant="contained"
          style={{ width: "65%", height: "60%" }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
