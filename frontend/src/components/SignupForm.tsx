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
import { makeRequest, setcookie } from "@/useful/ApiContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/Context/userContext";

export default function SignupForm({type='users'}) {
  const { execute, loading, data, error } = useAsync();
  const { setUser, settoken } = useAuth();
  const navigate = useNavigate();

  const signup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fmdata = new FormData(e.currentTarget);
    const name = fmdata.get("name") as string;
    const email = fmdata.get("email") as string;
    const password = fmdata.get("pwd") as string;
    let age
    
    type!='users'&& (age =fmdata.get('age'))

    execute(
      makeRequest(
        { type: "POST", url: `/${type=='users'?'users':'instructors'}/signup`, data: { name, email, password ,age} },
        
      ),true
    );
  };

  useEffect(() => {
    if (data) {
      const { token, loggeduser } = data?.data;

      if (loggeduser) {
        setcookie("token", token);
        setcookie("user", JSON.stringify(loggeduser));
        setUser(loggeduser);
        settoken(token);
      }

      navigate("/home");
    }
  }, [data]);

  return (
    <div className="w-full flex justify-center items-center h-dvh">

    <Card className="w-[350px] rounded-lg">
      <CardHeader>
        <CardTitle>Signup Form</CardTitle>
        <CardDescription>Create a new account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={signup}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Full Name" name="name" type="text" required />
              
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Email" name="email" type="email" required />
              {
                type!='users'&&(
                  <>
                  <Label htmlFor="age">Age</Label>
                  <Input id="email" placeholder="Age"  type="age"  />
                  </>
                )
              }

              <Label htmlFor="pwd">Password</Label>
              <Input id="pwd" placeholder="Password" name="pwd" type="password" required />

              <Label htmlFor="confirmPwd">Confirm Password</Label>
              <Input id="confirmPwd" placeholder="Confirm Password" name="confirmPwd" type="password" required />

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <label htmlFor="terms" className="text-sm font-medium leading-none">
                  I agree to the terms and conditions
                </label>
              </div>
            </div>

            <Button className="rounded-lg">Signup</Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => navigate(`${type!='users'?'/instlogin':'/login'}`)}>Already have an account? Login</Button>
      </CardFooter>
    </Card>
    </div>
  );
}
