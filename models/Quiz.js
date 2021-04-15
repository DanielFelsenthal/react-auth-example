const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema(
  {
    name: String,
    created_at: Date,
    email: String,
    //thing: String,
    questions: [
      { qText: String, answers: [String], correct: Number },
    ],
  },
  { timestamps: true }
);

/*QuizSchema.pre("save", function (next) {
  now = new Date();
  this.created_at = now;
  next();
});*/

module.exports = mongoose.model("Quiz", QuizSchema);
