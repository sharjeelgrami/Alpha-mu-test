import { Link } from "react-router-dom";
import { useAuth } from "hooks/use-auth";
import { Button } from "components/elements";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  email: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

type FormValues = z.infer<typeof schema>;

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { login, isLoggingIn } = useAuth();

  const { register, formState, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    await login(values);
    onSuccess();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" {...register("email")} />
          {formState.errors["email"] && (
            <p>{formState.errors["email"].message as string}</p>
          )}
        </div>
        <div>
          <label htmlFor="pass">Email Address</label>
          <input type="password" id="pass" {...register("password")} />
          {formState.errors["password"] && (
            <p>{formState.errors["password"].message as string}</p>
          )}
        </div>
        <div>
          <Button disabled={isLoggingIn} type="submit" className="w-full">
            Log in
          </Button>
        </div>
      </form>
      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <Link
            to="../register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};
