import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../constants/constants";
import { useEffect, useState } from "react";
import CreateSurvey from "./newSurveyForm";

interface Survey {
  id: number;
  title: string;
  creator: string;
  creatorId: number;
  questions?: {
   id: number;
   text: string;
   surveyId: number;
   responses?:{
      id: number;
      text: string;
      respondentId: number;
   }[];
  }[];
}

function MainPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
  const [isCreateSurveyVisible, setIsCreateSurveyVisible] = useState(false);

  useEffect(() => {
    axios
      .get(url + `/surveys/user/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setSurveys(response.data.surveys);
        } else {
          console.error("Помилка отримання опитувань");
        }
      })
      .catch((error) => {
        console.error("Помилка отримання опитувань", error);
      });
  }, [id]);

  async function surveyDetails(id: number) {
    try {
      const response = await axios.get(url + `/survey/${id}`);
      if (response.status === 200) {
        setSelectedSurvey(response.data);
      } else {
        console.error("Помилка отримання опитування");
      }
    } catch (error) {
      console.error("Помилка отримання опитування", error);
    }
  }

  return (
    <div className="main-page">
      <h3>Main page</h3>
      <button onClick={() => navigate("/")}>Back</button>
      <div className="surveys-div">
        {surveys.length > 0 ? (
          surveys.map((survey) => (
            <h4 key={survey.id} onClick={() => surveyDetails(survey.id)}>
              {survey.title}
            </h4>
          ))
        ) : (
          <p>Немає опитувань</p>
        )}
      </div>
      {isCreateSurveyVisible && <CreateSurvey id={id} />}
      <button
        className="create-surveys-button"
        onClick={() => setIsCreateSurveyVisible(!isCreateSurveyVisible)}
      >
        {!isCreateSurveyVisible ? "Створити опитування" : "Відмінити"}
      </button>
      {selectedSurvey && (
  <div>
    <h4>{selectedSurvey.title}</h4>
    <p>Автор ID: {selectedSurvey.creatorId}</p>
    <ul>
  {selectedSurvey.questions && selectedSurvey.questions.map((question, index) => (
    <li key={index}>{question.text}
      {question.responses && (
        <ul>
          {question.responses.map((response, responseIndex) => (
            <li key={responseIndex}>{response.text}</li>
          ))}
        </ul>
      )}
    </li>
  ))}
</ul>

  </div>
)}

    </div>
  );
}

export default MainPage;
