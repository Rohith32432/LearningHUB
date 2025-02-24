import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import useAsync from '@/hooks/useAsync';
import useToast from '@/hooks/useToast';
import { makeRequest } from '@/useful/ApiContext';
import { Button } from '../ui/button';
import { useParams } from 'react-router-dom';

function IQuizPage() {
  const {data,loading,execute}=useAsync()
  const [qizid,setquizid]=useState('')
  const {promisetoast}=useToast()
  const [title,settitle]=useState('')
  const {cid}=useParams()



  async function handleSubmit (e:any) {
    e.preventDefault();
    const fm=new FormData(e.target)
    const title=fm.get('quizTitle')
    
    execute(makeRequest({type:'post',url:'instructors/quiz',data:{title,cid}}),true)

  };
  useEffect(()=>{
    if(data?.data){
      const {_id}=data?.data
      setquizid(_id)
      
    }
  },[data])
  async function addQuestions(e){
    e.preventDefault();
    const fm=new FormData(e.target)
    const question=fm.get('question')
    const opts=fm.getAll('option')
    const ans=fm.get('ans')
    
    const asyncCall= promisetoast( 
       makeRequest({
        type:'post',url:`instructors/quiz/${qizid}`,
        data:{
          question:question,
          options:opts,
          ans:ans
        }
          })
        )
        const {data,status}=await asyncCall
        if(data){
          e.target.reset()
        }
        
}
  return (
    <>
      <div className="w-full max-w-lg p-8 bg-background shadow-lg rounded-lg">
     {
       loading?
       <>
       <h1 className="text-2xl font-semibold mb-6">Add a New Quiz</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="quiz-title" className="block text-sm font-medium ">Quiz Title</Label>
          <Input
            type="text"
            id="quiz-title"
            name="quizTitle"
            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter quiz title"
            value={title}
            onChange={(e)=>{settitle(e.target.value)}}
             
          />
          </div>
          <Input type='submit' className='bg-green-600 cursor-pointer  hover:bg-green-800' />
      </form>
      
      </>
      :<>
      <h1 className='text-3xl font-bold'>{title} </h1>
      </>
     }
     {
      !loading  &&
         <form onSubmit={addQuestions}>
        <div className="mb-4">
          <Label htmlFor="question" className="block text-sm font-medium ">Question</Label>
          <Input
            type="text"
            id="question"
            name="question"
            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the question"
             
          />
        </div>

        <div className="mb-4">
          <Label className="block text-sm font-medium ">Answer Options</Label>
          <div className="mt-2 space-y-3">
            <div>
              <Input
                type="text"
                id="option-1"
                name="option"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Option 1"
           
                 
              />
            </div>
            <div>
              <Input
                type="text"
                id="option-2"
                name="option"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Option 2"
              
                 
              />
            </div>
            <div>
              <Input
                type="text"
                id="option-3"
                name="option"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Option 3"
             
                 
              />
            </div>
            <div>
              <Input
                type="text"
                id="option-4"
                name="option"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Option 4"
               
                 
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <Label htmlFor="correct-answer" className="block text-sm font-medium ">Correct Answer</Label>
          <Select  name='ans'>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Correct  Option" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="1">Option A</SelectItem>
          <SelectItem value="2">Option B</SelectItem>
          <SelectItem value="3">Option C</SelectItem>
          <SelectItem value="4">Option D</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
          Save
          </button>
        </div>
      </form>
     }
    
</div>
    </>
  )
}

export default IQuizPage