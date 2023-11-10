import axios from "axios";
import { Survey } from "./mainPage";
import { url } from "../constants/constants";
import { useEffect, useState } from "react";

const SurveyToPass = (props: { survey: Survey | null }) => {
  const survey = props.survey;
  const [surveyToPass, setSurveyToPass] = useState<Survey | null>(null);
  const [updatedSurveyToPass, setUpdatedSurveyToPass] = useState<Survey | null>(null);
  const [selectedResponses, setSelectedResponses] = useState<{ questionId: number; responseId: number }[]>([]);
  const [isSurveyPassed, setIsSurveyPassed] = useState(true);

  useEffect(() => {
    if (survey) surveyDetails(survey.id);
  }, [survey]);

  async function surveyDetails(id: number) {
    try {
      const response = await axios.get(url + `/survey/${id}`);
      if (response.status === 200) {
        console.log(response.data);
        setSurveyToPass(response.data);
      } else {
        console.error("Помилка отримання опитування");
      }
    } catch (error) {
      console.error("Помилка отримання опитування", error);
    }
  }
  async function updatedSurveyDetails(id: number) {
    try {
      const response = await axios.get(url + `/survey/${id}`);
      if (response.status === 200) {
        console.log(response.data);
        setUpdatedSurveyToPass(response.data);
        setIsSurveyPassed(false)
      } else {
        console.error("Помилка отримання оновленного опитування");
      }
    } catch (error) {
      console.error("Помилка отримання оновленного опитування", error);
    }
  }

  const handleResponseChange = (questionId: number, responseId: number) => {
    // Оновлення вибраних відповідей при натисканні радіобаттонів
    setSelectedResponses((prevResponses) => [...prevResponses, { questionId, responseId }]);
  };

  const handleAnswerSubmit = async () => {
    // Відправлення відповідей на сервер при натисканні кнопки "відправити"
    try {
      const response = await axios.post(url + "/submit-response", selectedResponses );

      if (response.status === 200) {
        console.log("Відповіді успішно відправлені та оброблені");
        if(survey)
         updatedSurveyDetails(survey.id)
      } else {
        console.error("Помилка відправлення відповідей на сервер");
      }
    } catch (error) {
      console.error("Помилка відправлення відповідей на сервер", error);
    }
  };

  return (
    <div className="survey-to-pass">
      {surveyToPass && isSurveyPassed ? (
        <>
          <h3>Опитування № {surveyToPass.id} </h3>
          {surveyToPass.questions?.map((question, index) => (
            <div className="question" key={index}>
              <h4>{question.text}</h4>
              {question.responses?.map((response, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={response.id}
                    onChange={() => handleResponseChange(question.id, response.id)}
                  />
                  <label>{response.text}</label>
                </div>
              ))}
            </div>
          ))}
          <button onClick={handleAnswerSubmit}>Відправити</button>
        </>
      ) : (
           <>
         {isSurveyPassed ? (<h3>Немає опитування або помилка сервера</h3>):(
           <div>
            <h3>{updatedSurveyToPass?.title}</h3>
            {updatedSurveyToPass?.questions?.map((question, index) => (
            <div key={index}>
              <h4>{question.text}</h4>
              {question.responses?.map((response, index) => (
                <div key={index}>
                  <p>{response.text} Обрано {response.chosenCount} раз</p>
                </div>
              ))}
            </div>
               
               
            ))}
           </div>
         )}
           </>
      
      )}
    </div>
  );
};

export default SurveyToPass;
