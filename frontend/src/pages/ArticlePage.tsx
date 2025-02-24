import CourseSideBar from "@/components/CourseSideBar";
import Form from "@/components/Form";
import { SkeletionPage } from "@/components/Skeletonpage";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCoursecontext } from "@/Context/CourseContext";
import useAsync from "@/hooks/useAsync";
import useToast from "@/hooks/useToast";
import { makeRequest } from "@/useful/ApiContext";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const backendurl = import.meta.env.VITE_APP_BASEURL;

function ArticlePage() {
  const [article, setarticle] = useState({});
  const { aid, cid } = useParams();
  const { data, loading, execute } = useAsync();
  const { promisetoast } = useToast();
  const { cdetals, setcdetails } = useCoursecontext();
  const [status, setstatus] = useState(false);

  useEffect(() => {
    execute(makeRequest({ url: `articles/${aid}` }));
  }, [aid]);

  useEffect(() => {
    if (data) {
      setarticle(data?.data);
    }
  }, [data]);

  const handlecomplte = async () => {
    setstatus(!status); // Toggle the completion status
    const asynccall = promisetoast(
      makeRequest({ type: 'post', url: 'users/complte', data: { cid, aid } }), `${!status ? 'unmarked' : 'marked'}`
    );
    const { data } = await asynccall;
    
    // Update the course details context
    if (cdetals) {
      setcdetails({
        ...cdetals,
        compltedarticles: !status
          ? [
              ...cdetals?.compltedarticles,
              ...(cdetals?.compltedarticles.some((article) => article.cid === cid && article.aid === aid)
                ? [] // If already marked, do nothing
                : [{ cid: cid, aid: aid }])
            ]
          : cdetals?.compltedarticles.filter(
              (article) => !(article.cid === cid && article.aid === aid)
            ) // If unmarking, remove the article
      });
    }
  };

  return (
    <div className="min-h-dvh h-max flex flex-col items-center py-8 bg-background">
      {loading ? (
        <SkeletionPage />
      ) : (
        <div className="w-full max-w-4xl rounded-lg shadow-md overflow-hidden">
          {/* Article Header */}
          <div className="relative">
            <img
              src={article?.pic ? `http://localhost:3003/image/${article?.pic}` : "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg"}
              alt="Article Banner"
              className="w-full h-72 object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>

          <div className="p-6 space-y-6">
            <h1 className="text-4xl font-bold text-foreground mb-2">{article?.title || 'Article Title'}</h1>
            <p className="text-lg text-gray-300">
              Published on <span className="font-semibold">{article?.createdAt}</span>
            </p>
            <p className="text-lg text-gray-300">
              Updated on <span className="font-semibold">{article?.updatedAt}</span>
            </p>

            <div className="space-y-4">
              <p className="text-lg text-foreground ">
                {article?.content || 
                  `Curabitur ac neque purus. Integer laoreet mi id orci iaculis, id tincidunt justo volutpat. Proin molestie lorem nec risus 
                  tempus gravida. Etiam suscipit malesuada euismod.`}
              </p>
            </div>
          </div>

          <div className="p-6 flex justify-between items-center border-t border-gray-200">
            <Button 
              onClick={handlecomplte} 
              variant="outline" 
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              {
                cdetals?.compltedarticles?.some(article => article.aid === aid)
                  ? 'Unmark as Complete'
                  : 'Mark as Complete'
              }
            </Button>

            <Button variant="solid" className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300">
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArticlePage;
