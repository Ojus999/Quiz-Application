import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./Quiz.css";

function Quiz() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const { state } = useLocation();
  const { name } = state;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3001/getQns")
      .then((response) => {
        setLoading(false);
        setUsers(response.data);
        const defaultSelectedOptions = {};
        response.data.forEach((user, index) => {
          defaultSelectedOptions[index] = "";
        });
        setSelectedOptions(defaultSelectedOptions);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, []);

  const handleOptionChange = (questionIndex, option) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [questionIndex]: option,
    }));
  };

  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const calculateScore = () => {
    let score = 0;
    users.forEach((user, index) => {
      if (selectedOptions[index] === user.answer) {
        score += 1;
      }
    });
    setScore(score);

    axios
      .post("http://127.0.0.1:3001/score", { result: score, user: name })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (users.length === 0) return <div>No questions found.</div>; // Handle no questions

  const currentQuestion = users[currentQuestionIndex];

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Quiz Time {name} 😊 </h1>
      <div className="container">
        <div className="question--box">
          <h1 id="question">
            {currentQuestionIndex + 1}. {currentQuestion.question}
          </h1>
          <h3 className="option--box">
            {currentQuestion.options.map((option, index) => (
              <div className="option">
              <label key={index}>                
                <input
                  type="radio"
                  name={`option-${currentQuestionIndex}`}
                  value={option}
                  checked={selectedOptions[currentQuestionIndex] === option}
                  onChange={() =>
                    handleOptionChange(currentQuestionIndex, option)
                  }
                />
                {String.fromCharCode(65 + index)}. {option}                
              </label>
              </div>
            ))}
          </h3>
          <br />
          {currentQuestionIndex < users.length - 1 ? (
            <button className="btn" onClick={goToNextQuestion}>
              Next
            </button>
          ) : (
            <button className="btn" onClick={calculateScore}>
              Submit
            </button>
          )}
        </div>

        {score !== null && (
          <div>
            <h2>
              Your Score: {score}/{users.length}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;
