import useAsync from "@/hooks/useAsync";
import useToast from "@/hooks/useToast";
import { makeRequest } from "@/useful/ApiContext";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import RecomdedCourses from "./RecomdedCourses";



const Quiz = () => {
  const [quizData,setquizData] =useState([])
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const {data,loading,execute}=useAsync()
  const {aid,cid}=useParams()
  const {promisetoast}=useToast()
  const [congrats,setcongo]=useState(null)
  const currentQuestion = quizData[currentIndex];
  const navigate=useNavigate()
  const [recdedcourse,setrecomdedc]=useState()
  useEffect(()=>{
    execute(makeRequest({url:`articles/quiz/${aid}`}),true)
  },[aid])
useEffect(()=>{
if(data){

 const{questions}=data?.data
 console.log(questions);
 
  setquizData(questions)
  
}
},[data])

  const handleAnswer = (option,index) => {
    setSelectedAnswer(option);

    if (index+1 === currentQuestion.ans) {
      setScore(score + 1);
    }
  };
  function rest(){

    setCurrentIndex(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowScore(false)
    

  }

  const nextQuestion = () => {
    if (currentIndex + 1 < quizData.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
    } else {
      setShowScore(true);
    }
  };

  async function submitQuiz() {
    let percentage=(score / quizData.length) * 100
     const asyncCall= promisetoast( 
           makeRequest({
            type:'post',url:`users/submitquiz/`,
            data:{
              quizid:aid,
              marks:score,
              percentage:percentage,
              courseid:cid
            }
              }),'sucess'
            )
            const {data,status}=await asyncCall
            console.log(data);
            
          if(status==200){
            setShowScore(true)
            // navigate('')
            if(data?.percentage>70){
              setcongo(data)
              const asyncCall= promisetoast( 
                makeRequest({
                 type:'post',url:`users/recomd/`,
                 data:{
                  cname:'html'
                 }
                   }),'sucess'
                 )
                 const response=await asyncCall
                 if(response?.data){
                  console.log(response);
                  
              setrecomdedc(response?.data)
                 }
            }
          }
           
  }




  return (
    <div className="bg-background p-6 rounded-lg shadow-md min-h-dvh  w-full">
      {showScore ? (
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground">Quiz Over! 🎉</h2>
          <p className="text-lg text-gray-600">Your Score: {score} / {quizData?.length}</p>
          <Button onClick={rest}> Reset</Button>
          {
            congrats && <>
<div className="m-5 text-center">
  <h1 className="text-4xl font-semibold capitalize  bg-gradient-to-r from-blue-50 via-blue-300  to-blue-600 text-transparent bg-clip-text mb-4">
    Congratulations on Course Completion!
  </h1>
  {/* {JSON.stringify(congrats)} */}
  <a 
    href={`http://localhost:3003/certicates/${congrats?.url}.pdf`} 
    target="_blank" 
    download 
    className="inline-block mt-4"
  >
    <Button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200">
      Download Certificate
    </Button>
  </a>
</div>


<RecomdedCourses data={recdedcourse}/>

            </>
          }
        </div>

      ) : (
        <>
          <h2 className="text-xl font-bold text-foreground">Quiz Time! 🧠</h2>
          
          <div className="relative w-full bg-gray-300 h-2 rounded mt-2">
            <div 
              className="absolute h-2 bg-blue-500 rounded transition-all" 
              style={{ width: `${(currentIndex / quizData?.length) * 100}%` }}
            ></div>
          </div>

          <p className="text-lg font-semibold text-foreground mt-4">{currentQuestion?.question}</p>

          <div className="mt-4 space-y-2">
            {currentQuestion?.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option,index)}
                
                className={`w-full py-2 px-4 rounded transition ${
                  selectedAnswer
                    ?
                       selectedAnswer === option
                      ? "bg-green-500"
                      : "bg-gray-900"
                    : "bg-gray-900 hover:bg-gray-800"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {selectedAnswer && (
  <>
    {currentIndex === quizData.length - 1 ? (
      <button
        onClick={submitQuiz} 
        className="w-full bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition"
      >
        Submit
      </button>
    ) : (
      <button
        onClick={nextQuestion}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition"
      >
        Next Question
      </button>
    )}
  </>
)}

        </>
      )}
    </div>
  );
};

export default Quiz;
