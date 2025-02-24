import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "./ui/checkbox";
import useAsync from "@/hooks/useAsync";
import { makeRequest, removeCokkies, setcookie } from "@/useful/ApiContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/Context/userContext";


export default function Form({type='users'}) {
  const { execute, loading, data, error } = useAsync(); 
  const {setUser,settoken}=useAuth()
  const navigate=useNavigate()
  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fmdata = new FormData(e.currentTarget);
    const email = fmdata.get('email') as string;
    const password = fmdata.get('pwd') as string;

    execute(makeRequest( { type: 'POST', url: `/${type}/login`, data: { email, password } }), true)

  };
  useEffect(()=>{
    if(data){
      const {token,loggeduser}=data?.data
      console.log(data);
      
      if(loggeduser){
        console.log(loggeduser);
        
        setcookie('token',token)
        setcookie('user',JSON.stringify(loggeduser))
        setUser(loggeduser)
        settoken(token)
      }
     navigate('/home')
    }
  },[data])


  return (
    <div className="w-full flex justify-center items-center h-dvh">
    <Card className="w-[350px] rounded-lg">
      <CardHeader>
        <CardTitle>Login Form</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={login}>
          <div className="grid   w-full items-center gap-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Email" name="email" type="" />
              <Label htmlFor="pwd">Password</Label>
              <Input id="pwd" placeholder="Password" name="pwd" type="password" />
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label htmlFor="terms" className="text-sm font-medium underline leading-none">
                  Forgot Password
                </label>
              </div>
            </div>

            <Button className="rounded-lg">Login</Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link to={'/signup'}>
        <Button variant="outline">Signup</Button>
        </Link>
      </CardFooter>
    </Card>
    </div>
  );
}
