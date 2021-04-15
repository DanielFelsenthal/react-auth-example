import React, { useEffect, useState } from "react";

import {
  Formik,
  FastField,
  Form,
  useField,
  FastAttributes,
  FieldArray,
} from "formik";
import {
  TextField,
  Button,
  Checkbox,
  Radio,
  FormControlLabel,
  Select,
  MenuItem,
  Grid,
} from "@material-ui/core";
import { CardWrapper } from "./Card";
import {
  Link,
  useHistory,
  useLocation,
} from "react-router-dom";

var id;

export default function UpdateQuiz({ props, history }) {
  const hist = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("Name your Quiz!");

  const [qList, setQs] = useState([
    // { qText: "defQ", answers: ["", ""], correct: 1 },
    null,
  ]);
  useEffect(() => {
    const qz = location.qu || null;
    if (qz == null) {
      return;
    }
    console.log("Qz ", qz);
    let ary = [];
    if (qz)
      for (let i = 0; i < qz.questions.length; i++) {
        ary.push(qz.questions[i]);
      }
    console.log(ary, " Jongle");
    setQs(ary);
    id = qz._id;
    console.log(id, "Idingle");
    setName(qz.name);
    setLoading(true);
    //console.log(qList, "Jingle");
  }, []);

  //console.log(location, " Brungus");
  function makeSub(value, name, history) {
    const val2 = {
      id: id,
      questions: value,
      name: name,
      email: localStorage.getItem("userEm") || "Anon",
    };
    return function (event) {
      event.preventDefault();

      fetch("/dengus", {
        method: "POST",
        body: JSON.stringify(val2),

        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 200) {
            history.push("/");

            console.log("Yay!", val2);
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
  }

  // const [qList, setQs] = useState([
  //  { qText: "defQ", answers: ["", ""], correct: 1 },
  //]);
  function makeChange(i, list, prop) {
    return function (event) {
      const value = event.target.value;
      let newArr = [...list]; // copying the old datas array
      newArr[i][`${prop}`] = value; // replace e.target.value with whatever you want to change it to
      setQs(newArr);
    };
  }
  function makeChange2(i, j, list) {
    return function (event) {
      const value = event.target.value;
      let newArr = [...qList]; // copying the old datas array
      console.log(value, " list ", qList[j].answers);
      newArr[j].answers[i] = value; // replace e.target.value with whatever you want to change it to

      //jqList[j].answers = newArr;

      setQs(newArr);
    };
  }

  function push1() {
    let newArr = [...qList];
    newArr.push({
      qText: `defQ${newArr.length}`,
      answers: ["", ""],
      correct: 1,
    });
    setQs(newArr);
  }
  function push2(qIndex) {
    let newArr = [...qList];
    newArr[qIndex].answers.push("");
    setQs(newArr);
  }

  function remove(value) {
    setQs([...qList.filter((item) => item !== value)]);
  }
  function remove2(value, qIndex, aIndex, answers) {
    let n = [...qList];
    let newArr = [...answers];

    console.log(answers, "Ansh");
    let n2 = newArr.filter((item, i) => i !== aIndex);
    n[qIndex].answers = n2;
    setQs([...n]);
  }

  function radioClick(aIndex, qIndex) {
    let n = [...qList];
    console.log("quish,", qIndex);
    n[qIndex].correct = aIndex;
    setQs([...n]);
  }
  if (qList[0] == null) {
    console.log(qList, "qulist ", qList[0] == null);
    return <h1>Jungus</h1>;
  }
  console.log(qList, " Chingle");
  return (
    <form
      id="bigForm"
      onSubmit={makeSub(qList, name, history)}
      method="post"
    >
      <div>
        <TextField
          type="text"
          value={name}
          style={{ marginLeft: "12.5%", width: "75%" }}
          onChange={(event) => {
            const value = event.target.value;
            setName(value);
          }}
        />

        {qList.map((question, qIndex) => {
          console.log(question, "texas");

          return (
            <QComp
              question={question}
              answers={question.answers}
              qIndex={qIndex}
              qText={question.qText}
              onChange={makeChange(qIndex, qList, "qText")}
              onChange2={makeChange2}
              push2={push2}
              remove={remove}
              remove2={remove2}
              radioClick={radioClick}
            ></QComp>
          );
        })}

        <Button
          type="Button"
          onClick={(event) => {
            console.log(history);
            event.preventDefault();
            push1();
            console.log("Daddie!");
          }}
        >
          Add Question
        </Button>

        <Button type="submit">Submit Quiz</Button>
      </div>

      <pre>{JSON.stringify(qList, null, 2)}</pre>
      <pre>{JSON.stringify(name, null, 2)}</pre>
    </form>
  );
}

const QComp = React.memo(
  function QComp({
    question,
    onChange,
    answers,
    qIndex,
    qText,
    onChange2,
    remove,
    push2,
    remove2,
    radioClick,
  }) {
    return (
      <CardWrapper>
        <TextField
          style={{
            width: "100%",
            marginRight: "50px",
          }}
          key={`question${qIndex}`}
          type="text"
          value={qText || ""}
          onChange={onChange}
        />

        {answers.map((ans, aIndex) => {
          return (
            <AComp
              answer={ans}
              question={question}
              aIndex={aIndex}
              qIndex={qIndex}
              aText={answers[aIndex]}
              answers={answers}
              onChange={onChange2}
              remove={remove2}
              radioClick={radioClick}
            ></AComp>
          );
        })}

        <Button
          type="Button"
          onClick={(event) => {
            if (answers.length < 8) push2(qIndex);
          }}
        >
          Push
        </Button>
        <Button
          type="Button"
          onClick={(event) => {
            remove(question);
          }}
        >
          Remove
        </Button>
      </CardWrapper>
    );
  },
  (prevProps, nextProps) => {
    console.log(
      prevProps.qText == nextProps.qText,
      " Re-Rendering ",
      prevProps.qIndex != nextProps.qIndex,
      " index ",
      nextProps.qIndex
    );

    return (
      // prevProps.qIndex != nextProps.qIndex &&
      prevProps.qText == nextProps.qText &&
      prevProps.qIndex != nextProps.qIndex
      // ||true
    );
  }
);

const AComp = React.memo(
  function AComp(
    {
      onChange,
      answer,
      aIndex,
      qIndex,
      aText,
      answers,
      remove,
      radioClick,
    },
    { props2 }
  ) {
    console.log(answers, "Ans");
    return (
      <div>
        <TextField
          style={{
            width: "80%",
            marginTop: "2%",
          }}
          key={`q${qIndex}answer${aIndex}`}
          type="text"
          value={aText || ""}
          onChange={onChange(aIndex, qIndex, answers)}
        />
        <input
          type="radio"
          name="correct"
          value={10 * qIndex + aIndex}
          onChange={() => radioClick(aIndex, qIndex)}
          as={Radio}
          style={{ marginTop: "2.5%", marginLeft: "2.5%" }}
        ></input>
        <Button
          type="Button"
          onClick={(event) => {
            console.log(answers, "bansh");
            remove(answer, qIndex, aIndex, answers);
          }}
        >
          Remove
        </Button>
      </div>
    );
  },
  (prevProps, nextProps) => {
    /* console.log(
      prevProps.aText,
      " ",
      prevProps.aIndex,
      " Hey ",
      nextProps.aText,
      " ",
      nextProps.aIndex
    );*/

    return (
      prevProps.aText == nextProps.aText &&
      prevProps.qIndex === nextProps.qIndex &&
      prevProps.aIndex === nextProps.aIndex
    );
  }
);

/*function QComp({ values, question, qIndex, remove }) {
  {
    console.log(values, "Blim");
    console.log(question, "questio");
  }
  return (
    <div
      key={`qBox${qIndex}`}
      style={{
        border: "2px solid green",
        width: "25%",
        margin: "50px 50px 50px 33%",
      }}
    >
      <pre>{JSON.stringify(values, null, 2)}</pre>

      <FastField
        name={`questions[${qIndex}].qText`}
        style={{
          margin: "20px 10px 60px 66px",
          width: "60%",
        }}
        as={TextField}
      />
      <div key={`answers${qIndex}`}>
        <FieldArray name={`question[${qIndex}].answers`}>
          {({ push, remove }) => (
            <div>
              {question.answers.map((answer, aI) => {
                {
                  console.log(question.correct, "Bingo");
                }
                return (
                  <AComp
                    answer={answer}
                    aIndex={aI}
                    qIndex={qIndex}
                    correct={question.correct}
                    remove={remove}
                  ></AComp>
                );
              })}
              <Button
                type="Button"
                //variant="contained"
                onClick={() => push("")}
              >
                {""}
                Add Answer{""}
              </Button>
            </div>
          )}
        </FieldArray>
      </div>
      <Button type="Button" onClick={() => remove(qIndex)}>
        Remove Question
      </Button>
    </div>
  );
}

function BigQuiz() {
  return (
    <Formik
      initialValues={{
        name: "default",
        //thing: "",
        questions: [
          { qText: "defQ", answers: ["", ""], correct: 1 },
        ],
      }}
      onSubmit={(data, { setSubmitting }) => {
        setSubmitting(true);
        console.log(data, "HYH");
        data.questions.push("");
        data.answers.push(["", ""]);
        setSubmitting(false);
      }}
    >
      {({
        values,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Form>
          <FieldArray name="questions">
            {({ push, remove }) => (
              <>
                <div>
                  {values.questions.map((que, qI) => {
                    return (
                      <QComp
                        question={que}
                        qIndex={qI}
                        remove={remove}
                        values={values}
                      />
                    );
                  })}
                </div>
                <Button
                  type="Button"
                  onClick={() =>
                    push({
                      qText: "",
                      answers: ["", ""],
                      correct: 1,
                    })
                  }
                >
                  Add Question
                </Button>
              </>
            )}
          </FieldArray>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  );
}

function AComp({
  answer,
  qIndex,
  aIndex,
  correct,
  remove,
}) {
  {
    console.log(aIndex, "INfni");
  }
  return (
    <div key={`${qIndex}ans${aIndex}div`}>
      <FastField
        name={`questions[${qIndex}].answers[${aIndex}]`}
        style={{
          margin: "0px 0px 0px 15px",
        }}
        as={TextField}
      />
      <FastField
        id={`radio${qIndex}num${aIndex}`}
        key={`radio${qIndex}num${aIndex}`}
        //id={`radio${qIndex}num${aIndex}`}
        name={`correct`}
        value={aIndex}
        type="radio"
        checked={aIndex == correct}
        as={Radio}
      ></FastField>
      <Button
        type="Button"
        //variant="contained"
        onClick={() => remove(aIndex)}
      >
        Remove Answer
      </Button>
    </div>
  );
}

export default function Quizzes() {
  return (
    <div>
      <BigQuiz></BigQuiz> Quizzes
    </div>
  );
}
/*
export default function Quizzes() {
  return (
    <Formik
      initialValues={{
        name: "",
        //thing: "",
        questions: [
          { qText: "", answers: ["", ""], correct: 1 },
        ],

      }}
    >
      {({
        values,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <div
        //style={{ margin: "25px 250px 25px 25px" }}
        >
          <h1>{values.name}</h1>
          <div>
            <FastField
              style={{
                width: "40%",
                margin: "0px 25% ",
                top: "0",
              }}
              name="name"
              type="input"
              as={TextFastField}
              placeholder="Quizname"
            ></FastField>
          </div>
          <Form>
            <FastFieldArray name="questions">
              {({ push, remove }) => (
                <div>
                  {values.questions.map(
                    (question, qIndex) => {
                      return (
                        <div
                          key={`qBox${qIndex}`}
                          style={{
                            border: "2px solid green",
                            width: "25%",
                            margin: "50px 50px 50px 33%",
                          }}
                        >
                          <FastField
                            name={`questions[${qIndex}].qText`}
                            style={{
                              margin: "20px 10px 60px 66px",
                              width: "60%",
                            }}
                            as={TextFastField}
                          />
                          <div key={`answers${qIndex}`}>
                            <FastFieldArray
                              name={`questions[${qIndex}]answers`}
                            >
                              {({ push, remove }) => (
                                <div>
                                  {values.questions[
                                    qIndex
                                  ].answers.map(
                                    (answer, aIndex) => {
                                      return (
                                        <div
                                          key={`questions${qIndex}ans${aIndex}div`}
                                        >
                                          <FastField
                                            name={`questions[${qIndex}].answers[${aIndex}]`}
                                            style={{
                                              margin:
                                                "0px 0px 0px 15px",
                                            }}
                                            as={TextFastField}
                                          />
                                          <FastField
                                            id={`radio${qIndex}num${aIndex}`}
                                            key={`radio${qIndex}num${aIndex}`}
                                            //id={`radio${qIndex}num${aIndex}`}
                                            name={`questions[${qIndex}].correct`}
                                            value={aIndex}
                                            type="radio"
                                            checked={
                                              aIndex ==
                                              question.correct
                                            }
                                            as={Radio}
                                          ></FastField>
                                          <Button
                                            type="Button"
                                            //variant="contained"
                                            onClick={() =>
                                              remove(aIndex)
                                            }
                                          >
                                            Remove Answer
                                          </Button>
                                        </div>
                                      );
                                    }
                                  )}
                                  <Button
                                    type="Button"
                                    //variant="contained"
                                    onClick={() => push("")}
                                  >
                                    {""}
                                    Add Answer{""}
                                  </Button>
                                </div>
                              )}
                            </FastFieldArray>
                          </div>
                          <Button
                            type="Button"
                            onClick={() => remove(qIndex)}
                          >
                            Remove Question
                          </Button>
                        </div>
                      );
                    }
                  )}
                  <Button
                    type="Button"
                    onClick={() =>
                      push({
                        qText: "",
                        answers: ["", ""],
                        correct: 1,
                      })
                    }
                  >
                    Add Question
                  </Button>
                </div>
              )}
            </FastFieldArray>
          </Form>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </div>
      )}
    </Formik>
  );
}
*/
/*

{values.questions.map((q, i) => (
                <div
                  key={`qBox${i}`}
                  name={`qBox${i}`}
                  style={{
                    border: "1px solid green",
                    width: "25%",
                    margin: "25px 25px 25px 50%",
                  }}
                >
                  <FastField
                    style={{
                      border: "1px solid green",
                      width: "25%",
                      margin: "25px 25px 25px 0",
                    }}
                    key={`q${i}`}
                    name={`questions[${i}]`}
                    type="input"

                    as={TextFastField}
                  ></FastField>
                  {values.answers[i].map((a, i2) => (
                    <div
                      key={`aBox${i2}q${i}size${values.questions.length}`}
                    >
                      <FastField
                        key={`answer${values.answers[i].length}question${a}`}
                        name={`answers[${i}][${i2}]`}
                        type="input"
                        as={TextFastField}
                      ></FastField>
                    </div>
                  ))}
                  <Button
                    key={`addButt${i}`}
                    variant="contained"
                    type="Button"
                    onClick={(e) => {
                      values.answers[i].push("");
                      // setnc(!nc);
                      //setAnswers(answers);
                      //values.needChange = true;
                    }}
                  >
                    "Add A"
                  </Button>
                  <Button
                    key={`subButt${i}`}
                    variant="contained"
                    type="Button"
                    onClick={(e) => {
                      values.answers[i].pop();
                      setnc(!nc);

                      //setAnswers(answers);
                      //values.needChange = true;
                    }}
                  >
                    "Take A"
                  </Button>
                </div>
              ))}

              <Button
                variant="contained"
                //disabled={isSubmitting}
                type="submit"
              >
                {"Nothing"}
              </Button>




















export default function Quizzes() {
  const [newQ, setNewQ] = useState("");
  const [tempQ, setTempQ] = useState("");
  if (!newQ) {
    return (
      <>
        <h1>Quizzes</h1>
        <Formik
          //enableReinitialize
          initialValues={{
            name: "",
            thingie: "Thang",
            //questions: [],
          }}
          onSubmit={(
            data,
            { setSubmitting, resetForm }
          ) => {
            setSubmitting(true);
            console.log(data);
            setSubmitting(false);
            setNewQ(data.thingie);
            resetForm();
          }}
        >
          {({
            values,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Form>
              <h1>{values.thingie}</h1>
              <FastField
                name="name"
                type="input"
                as={TextFastField}
              ></FastField>
              <div>
                <FastField
                  name="thingie"
                  type="input"
                  as={TextFastField}
                ></FastField>
              </div>
              <div>
                <Button
                  variant="contained"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {values.thingie | "Nothing"}
                </Button>
              </div>
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </Form>
          )}
        </Formik>
      </>
    );
  } else {
    //
    return (
      <>
        <h1>{newQ}</h1>
        <Formik
          enableReinitialize
          initialValues={{
            questions: ["What's Two Plus Two?"],
            answers: [["A", "B"]],
            correct: [1],
            numQuestions: 1,
          }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            console.log(data, "Rhino");
            setSubmitting(false);
            setNewQ("H");
          }}
        >
          {({
            values,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Form>
              {values.questions.map((q, i) => (
                <div>
                  <h1>{q}</h1>
                  {values.answers[i].map((a, numA) => (
                    <div>
                      <FastField
                        name={`question${i}answer${numA}`}
                        type="input"
                        as={TextFastField}
                      ></FastField>
                    </div>
                  ))}
                </div>
              ))}
              <Button
                variant="contained"
                disabled={isSubmitting}
                type="submit"
              >
                "Change"
              </Button>
              <div>
                <Button
                  variant="contained"
                  disabled={isSubmitting}
                  type="reset"
                  onClick={(e) => {
                    //e.preventDefault();
                    values.questions.push("U good?");
                    console.log("shite!");
                    //resetForm();
                  }}
                >
                  Stuff
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}
*/
