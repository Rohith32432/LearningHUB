import { useEffect, useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Link, useParams } from 'react-router-dom';
import useAsync from '@/hooks/useAsync';
import { makeRequest } from '@/useful/ApiContext';
import { Skeleton } from './ui/skeleton';
import { ChartContainer } from './ui/chart';
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import PieChart from './PieChart';
import { CheckCircle } from 'lucide-react';
import { useCoursecontext } from '@/Context/CourseContext';

function CourseSideBar(props: any) {
  const [carticles, setArticles] = useState([]);
  const { cdetals } = useCoursecontext();  
  
  const [marked, setMarked] = useState([]);  // Initialized as an empty array
  const [xquiz, setQuiz] = useState([]);
  const { cid } = useParams();
  const { data, loading, execute } = useAsync();

  useEffect(() => {
    execute(makeRequest({ url: `articles/coursearticles/${cid}` }));
    
  }, [cid]);

  useEffect(() => {
    if (data) {
      const { articles, quiz } = data?.data;
      if (articles) {
        setArticles(articles);
      }
      if (quiz) {
        setQuiz(quiz);
      }

    }
  }, [data, cdetals, cid]);
useEffect(()=>{
  if (cdetals) {
   
    setMarked(cdetals?.compltedarticles?.filter(e=> e.cid==cid));
   
    
  }
},[cdetals])
  return (
    <>
      <SidebarProvider defaultOpen={true}>
        <Sidebar variant="floating" collapsible="none" side="right" {...props}>
          <SidebarContent className="bg-black rounded-lg">
            <div>
              <PieChart total={carticles?.length} count={marked?.length || 0} />
            </div>
            <SidebarGroup>
              <SidebarGroupLabel>Articles</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {loading ? (
                    <>
                      <SidebarMenuItem>
                        <Skeleton className="w-full h-8" />
                      </SidebarMenuItem>
                    </>
                  ) : (
                    carticles?.map((item, i) => (
                      <SidebarMenuItem
                        className="bg-zinc-900 rounded-lg capitalize m-2 my-0.5"
                        key={item?._id + i}
                      >
                        <SidebarMenuButton asChild>
                          <Link to={`/course/${cid}/article/${item?._id}`}>
                            {marked?.some((e) => e.aid == item?._id) && (
                              <CheckCircle className="text-green-500" />
                            )}
                            <span>{item?.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Quizzes</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {loading ? (
                    <>
                      <SidebarMenuItem>
                        <Skeleton className="w-full h-8" />
                      </SidebarMenuItem>
                    </>
                  ) : (
                    xquiz?.map((item, i) => (
                      <SidebarMenuItem
                        className="bg-zinc-900 rounded-lg capitalize m-2 my-0.5"
                        key={item?._id + i}
                      >
                        <SidebarMenuButton asChild>
                          <Link to={`/course/${cid}/quiz/${item?._id}`}>
                            <span>{item?.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </>
  );
}

export default CourseSideBar;
