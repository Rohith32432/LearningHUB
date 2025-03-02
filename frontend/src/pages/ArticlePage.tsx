
import { SkeletionPage } from "@/components/Skeletonpage";
import { Button } from "@/components/ui/button";
import { useCoursecontext } from "@/Context/CourseContext";
import useAsync from "@/hooks/useAsync";
import useToast from "@/hooks/useToast";
import { makeRequest } from "@/useful/ApiContext";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { format } from "date-fns";
import Comments from "@/components/Comments";

const backendurl = import.meta.env.VITE_APP_BASEURL;

function ArticlePage() {
  const [article, setarticle] = useState({});
  const { aid, cid } = useParams();
  const { data, loading, execute } = useAsync();
  const { promisetoast } = useToast();
  const { cdetals, setcdetails } = useCoursecontext();
  const [status, setstatus] = useState(false);
  const [embedurl, setemdedurl] = useState('')
  useEffect(() => {
    execute(makeRequest({ url: `articles/${aid}` }));
  }, [aid]);

  useEffect(() => {
    if (data) {
      setarticle(data?.data);
    }
  }, [data]);

  function getwatchkey(url = '') {
    if (url) {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      return urlParams.get('v');
    }
  }
  

  const handlecomplte = async () => {
    setstatus(!status); // Toggle the completion status
    const asynccall = promisetoast(
      makeRequest({ type: 'post', url: 'users/complte', data: { cid, aid } }), `${status ? 'unmarked' : 'marked'}`
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
            <div className="border-b border-gray-700 pb-6 mb-6">
              {/* Article Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {article?.title || "Article Title"}
              </h1>

              {/* Article Metadata */}
              <div className="text-lg text-gray-400 space-y-1">
                <p >
                  Published on{" "}
                  <span className="font-semibold text-gray-200">
                    {article?.createdAt
                      ? format(new Date(article.createdAt), "MMMM dd, yyyy")
                      : "Unknown Date"}
                  </span>
                </p>

                <p>
                  Last Updated{" "}
                  <span className="font-semibold text-gray-200">
                    {article?.updatedAt
                      ? format(new Date(article.updatedAt), "MMMM dd, yyyy")
                      : "Not Updated"}
                  </span>
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-lg text-foreground ">
                {article?.content ||
                  `Curabitur ac neque purus. Integer laoreet mi id orci iaculis, id tincidunt justo volutpat. Proin molestie lorem nec risus 
                  tempus gravida. Etiam suscipit malesuada euismod.`}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full p-4  text-white rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Video URL</h3>

            <div className="w-full max-w-2xl aspect-video rounded-lg overflow-hidden shadow-md border border-gray-700">
              <iframe
                className="w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${getwatchkey(article?.references)}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
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

          < >
            <Comments aid={aid} cid={cid}/>
          </>
        </div>
      )}
    </div>
  );
}

export default ArticlePage;
