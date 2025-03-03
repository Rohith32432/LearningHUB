import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { useAuth } from '@/Context/userContext';
import useAsync from '@/hooks/useAsync';
import useToast from '@/hooks/useToast';
import { makeRequest } from '@/useful/ApiContext';

function StatsPage() {
  // Example statistics data
  const [stasdata, setstatsdata] = useState({});
  const { data, loading, execute } = useAsync();
  const { promisetoast } = useToast();

  useEffect(() => {
    execute(makeRequest({ url: `enrolledCourses/?type=context` }));
  }, []);
useEffect(()=>{
    if(data){
        console.log(data);
        setstatsdata(data?.data)
    }
},[data])
  const [stats, setStats] = useState({
    coursesEnrolled: 10,
    coursesCompleted: 7,
    certificatesEarned: 5,
    articlesRead: 20,
  });
  const {user}=useAuth()

  const [coursesData, setCoursesData] = useState<any>([]);
  const [articlesData, setArticlesData] = useState<any>([]);

  useEffect(() => {
    // Simulate fetching data for charts (e.g., monthly courses enrolled, articles read)
    setCoursesData([
      { month: 'feb', value: 1 },
      { month: 'Feb', value: 3 },
      { month: 'feb', value: 5 },
      { month: 'feb', value: 7 },
      { month: 'feb', value: 9 },
      { month: 'feb', value: 10 },
    ]);

    setArticlesData([
      { month: 'feb', value: 2 },
      { month: 'Feb', value: 4 },
      { month: 'feb', value: 6 },
      { month: 'feb', value: 8 },
      { month: 'feb', value: 15 },
      { month: 'feb', value: 20 },
    ]);
  }, []);

  // Provide a default (even empty) config for ChartContainer
  const defaultChartConfig = {};

  return (
    <div className="stats-page p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Statistics Summary */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold">Your Learning Stats</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Courses Enrolled</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-blue-600">
                  {stasdata?.courses?.length}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Courses Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">
                  {stasdata?.status?.length}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Quiz Attempts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-yellow-600">
                  {stasdata?.quiztaken?.length}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Articles Read</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-red-600">
                  {stasdata?.compltedarticles?.length}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Graphs Section */}
        <div className="space-y-8">
          {/* Courses Enrolled Line Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Courses Enrolled Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={defaultChartConfig} className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={coursesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="rgb(75, 192, 192)"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Articles Read Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Articles Read Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={defaultChartConfig} className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={articlesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="rgba(255, 159, 64, 0.6)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default StatsPage;
