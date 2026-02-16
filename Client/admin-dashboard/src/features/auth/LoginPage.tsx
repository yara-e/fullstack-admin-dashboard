import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";

import { LoginApi } from "./auth.api";
 
import { saveToken } from "../../utils/token";
import { loginSchema, type LoginFormValues } from "../../features/auth/login.schema";
import { setAuth } from "@/features/auth/authSlice";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const data = await LoginApi(values.email, values.password);

      saveToken(data.token);
      dispatch(setAuth(data));

      navigate("/");
    }  
    catch (error) {
  if (error instanceof AxiosError) {
    const message =
      error.response?.data?.error || "Login failed";

    setError("root", { message });
  } else {
    setError("root", { message: "Unexpected error" });
  }
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4" >
    <Card className="w-full max-w-md shadow-lg rounded-2xl">
      <CardHeader className="text-center space-y-2">
       <h1 className="text-2xl font-semibold">Welcome Back</h1>
        <p className="text-sm text-muted-foreground">
          Login to your account
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Input
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
      </div>

      {errors.root && <p className="text-sm text-red-500">{errors.root.message}</p>}

      <Button disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </form>
      </CardContent>
    
    </Card>
    </div>
  );
};

export default LoginPage;
