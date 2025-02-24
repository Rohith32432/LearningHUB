import React, { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label";

import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { Button } from '../ui/button'
import useAsync from '@/hooks/useAsync';
import { makeRequest } from '@/useful/ApiContext';
import { useNavigate } from 'react-router-dom';
import { Textarea } from '../ui/textarea';

function AddCourse() {
    const navigate=useNavigate()
    const {data,loading,execute}=useAsync()

    function submit(e){
        e.preventDefault()
        const fdata=new FormData(e.target)
        // console.log(fdata.get('img'));
        
        execute(makeRequest({type:'post',url:'courses',data:{title:fdata?.get('name'),estimated:fdata.get('duration'),courseimg:fdata.get('courseimg'),descrption:fdata.get('area')},formdata:true}),true)
    }
    useEffect(()=>{
        if(data){
          if(data?.status==201){
            navigate(`/course/${data?.data?._id}`)
          }
          
        }
    },[data])

  return (
    <div className="max-w-md mx-auto my-8 p-6 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Course</h2>
     <form  onSubmit={submit}>
        <Label>Course name</Label>
        <Input  name='name' placeholder='enter name'/>
        <Label> Estimated Duration</Label>
        <Input  name='duration' placeholder='enter here'/>
        <Input  name='courseimg' type='file' accept='image/*'  placeholder='enter here'/>
        <Textarea name='area' />
        <Button>{loading?'create':'creating'}</Button>
     </form>
    </div>
  );
}

export default AddCourse;
