import axios from 'axios';
import React, { useState } from 'react';
import { url } from '../constants/constants';

const CreateSurvey = (props: { id: string | undefined }) => {
  const { id } = props;
  const [userId, setUserId] = useState();
  if (id !== undefined) {
   setUserId(parseInt(id, 10));
  };
  const [surveyData, setSurveyData] = useState({
    title: '',
    questions: [{ text: '', options: [''] }],
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSurveyData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddQuestion = () => {
    setSurveyData((prevState) => ({
      ...prevState,
      questions: [...prevState.questions, { text: '', options: [''] }],
    }));
  };

  const handleQuestionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedQuestions = [...surveyData.questions];
    updatedQuestions[index].text = event.target.value;
    setSurveyData((prevState) => ({
      ...prevState,
      questions: updatedQuestions,
    }));
  };

  const handleAddOption = (questionIndex: number) => {
    const updatedQuestions = [...surveyData.questions];
    updatedQuestions[questionIndex].options.push('');
    setSurveyData((prevState) => ({
      ...prevState,
      questions: updatedQuestions,
    }));
  };

  const handleOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    questionIndex: number,
    optionIndex: number
  ) => {
    const updatedQuestions = [...surveyData.questions];
    updatedQuestions[questionIndex].options[optionIndex] = event.target.value;
    setSurveyData((prevState) => ({
      ...prevState,
      questions: updatedQuestions,
    }));
  };

  const handleCreateSurvey = () => {
    // Отримайте дані опитування з surveyData та відправте їх на сервер за допомогою Axios або Fetch.
    // Наприклад, ось як відправити їх за допомогою Axios:

    const { title, questions } = surveyData;

    const survey = {
      title,
      questions,
      creatorId: parseInt(userId),
    };

    // Відправлення запиту на сервер
    axios
      .post(url+'/surveys', survey)
      .then((response) => {
        console.log('Опитування створено:', response.data);
      })
      .catch((error) => {
        console.error('Помилка при створенні опитування:', error);
      });

    // Після відправлення опитування можна відчистити дані форми:
    setSurveyData({
      title: '',
      questions: [{ text: '', options: [''] }],
    });
  };

  return (
    <div>
      <h3>Створити нове опитування</h3>
      <form>
        <label>
          Назва опитування:
          <input
            type="text"
            name="title"
            value={surveyData.title}
            onChange={handleInputChange}
          />
        </label>

        <h4>Питання</h4>
        {surveyData.questions.map((question, questionIndex) => (
          <div key={questionIndex}>
            <input
              type="text"
              value={question.text}
              onChange={(e) => handleQuestionChange(e, questionIndex)}
              placeholder="Текст питання"
            />

            <h5>Варіанти відповідей</h5>
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <input
                  type="text"
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(e, questionIndex, optionIndex)
                  }
                  placeholder="Варіант відповіді"
                />
              </div>
            ))}
            <button onClick={(e) => {
               e.preventDefault();
               handleAddOption(questionIndex)}}>
              Додати варіант відповіді
            </button>
          </div>
        ))}

        <button onClick={(e)=>{
         e.preventDefault();
         handleAddQuestion()}}>Додати питання</button>
        <button
          onClick={(e)=>{
            e.preventDefault();
            handleCreateSurvey()}}>
          Зберегти опитування
        </button>
      </form>
    </div>
  );
};

export default CreateSurvey;
