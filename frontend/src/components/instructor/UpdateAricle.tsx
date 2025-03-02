import { useEffect, useState } from "react";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import useAsync from "@/hooks/useAsync";
import { makeRequest } from "@/useful/ApiContext";
import { useParams } from "react-router-dom";
import { SkeletionPage } from "../Skeletonpage";
import useToast from "@/hooks/useToast";

function UpdateArticlePage() {
  const { aid } = useParams();
  const { data, loading, execute } = useAsync();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [link, setLink] = useState('');
  const {promisetoast}=useToast()
   const handleSubmit = async (e) => {
    e.preventDefault();
    const fmdata = new FormData(e.target);
    console.log(fmdata.get('title'));
    
 const{data}=   await promisetoast(
      makeRequest({type:'post',url:`articles/update/${aid}`,data:{title:fmdata.get('title'),content:fmdata.get('content'),artimg:fmdata.get('artimg'),links:fmdata.get('links')},formdata:true}),'updated'
    )
console.log(data);

  };

  useEffect(() => {
    if (data) {
      setTitle(data?.data?.title);
      setContent(data?.data?.content);
      setLink(data?.data?.references);
    }
  }, [data]);

  useEffect(() => {
    execute(makeRequest({ url: `articles/${aid}` }), true);

  }, [aid]);

  return (
    <>
      {!loading ? (
        <div className="max-w-4xl mx-auto mt-10 bg-background text-foreground shadow-lg rounded-lg overflow-hidden p-6">
          <h2 className="text-3xl font-semibold">Update Article</h2>
          
          <form onSubmit={handleSubmit} className="mt-6">
            {/* Title Input */}
            <div className="mb-4">
              <Label className="block text-sm font-semibold mb-2">Title</Label>
              <Input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter article title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Image Input */}
            <div className="mb-4">
              <Label className="block text-sm font-semibold mb-2">Image</Label>
              <Input
                type="file"
                id="artimg"
                name="artimg"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full px-4 py-2 border cursor-pointer border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Content Input */}
            <div className="mb-4">
              <Label htmlFor="content" className="block text-sm font-semibold mb-2">Content</Label>
              <Textarea
                id="content"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter article content"
                rows="6"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Reference Links */}
            <div className="mb-4">
              <Label htmlFor="links" className="block text-sm font-semibold mb-2">Reference Links</Label>
              <Input
                id="links"
                name="links"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Enter article reference link"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {loading ? 'Saving' : 'Update Article'}
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <SkeletionPage />
      )}
    </>
  );
}

export default UpdateArticlePage;
