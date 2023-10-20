import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../constants/constants";
import { useEffect, useState } from "react"; // Додавання useEffect та useState
import CreateSurvey from "./newSurveyForm";
interface Survey {
   id: number;
   title: string;
   creator: string;
   creatorId: number;
   questions: string[];
}
function MainPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [surveys, setSurveys] = useState<Survey[]>([]); // Стан для збереження опитувань
  const [isCreateSurveyVisible, setIsCreateSurveyVisible] = useState(false); 

  useEffect(() => {
    axios
      .get(url + `/surveys/${id}`)
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

function CreateSurveyVisible () {
 setIsCreateSurveyVisible(!isCreateSurveyVisible)

}

  return (
    <div className="main-page">
      <h3>Main page</h3>
      <button onClick={() => navigate("/")}>Back</button>
      <div className="surveys-div">
        {surveys.length > 0 ? (
          surveys.map((survey) => (
            <h4 key={survey.id}>{survey.title}</h4> 
          ))
        ) : (
          <p>Немає опитувань</p>
        )}
      </div>
      {isCreateSurveyVisible && <CreateSurvey id={id}/>}
      <button className="create-surveys-button" onClick={CreateSurveyVisible}>{!isCreateSurveyVisible ? "Створити опитування" : "Відмінити" }</button>
    </div>
  );
}

export default MainPage;
