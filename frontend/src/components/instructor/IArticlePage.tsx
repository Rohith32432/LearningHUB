import { useEffect, useState } from "react";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import useAsync from "@/hooks/useAsync";
import { makeRequest } from "@/useful/ApiContext";
import { useParams } from "react-router-dom";

function AddArticlePage() {
    const {cid}=useParams()
    const {data,loading,execute}=useAsync()
  const handleSubmit = (e) => {
    e.preventDefault();
    const fmdata=new FormData(e.target)
   execute(makeRequest({type:'post',url:'articles',data:{title:fmdata.get('title'),content:fmdata.get('content'),courseid:cid,artimg:fmdata.get('artimg'),links:fmdata.get('links')},formdata:true}),true)
  };
// useEffect(()=>{

// })
  return (
    <div className="max-w-4xl mx-auto mt-10  bg-background text-foreground shadow-lg rounded-lg overflow-hidden p-6">
      <h2 className="text-3xl font-semibold">Add a New Article</h2>
      
      <form onSubmit={handleSubmit} className="mt-6">
        {/* Title Input */}
        <div className="mb-4">
          <Label  className="block  text-sm font-semibold mb-2">
            Title
          </Label>
          <Input
            type="text"
            id="title"
           name="title"
            placeholder="Enter article title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <Label  className="block  text-sm font-semibold mb-2">
            Image
          </Label>
          <Input
            type="file"
            id="title"
           name="artimg"
            placeholder="Enter article title"
            className="w-full px-4 py-2 border cursor-pointer border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          />
        </div>

        {/* Content Input */}
        <div className="mb-4">
          <Label htmlFor="content" className="block text-sm font-semibold mb-2">
            Content
          </Label>
          <Textarea
            id="content"
           name="content"
            placeholder="Enter article content"
            rows="6"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="content" className="block text-sm font-semibold mb-2">
            Reference Links
          </Label>
          <Input
            id="content"
           name="links"
            placeholder="Youtube Links perefeble"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

      
     

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
           {
            loading?
           'Add Article' :'Saving'
           } 
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddArticlePage;
