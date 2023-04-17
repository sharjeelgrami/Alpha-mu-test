import { Link } from "react-router-dom";
import { useAuth } from "hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "components/elements";
import { useForm } from "react-hook-form";

const schema = z.object({
  email: z.string().min(1, "Required"),
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

type FormValues = z.infer<typeof schema>;

type RegisterFormProps = {
  onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { register, isRegistering } = useAuth();
  const {
    formState,
    register: registerField,
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    await register(values);
    onSuccess();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" {...registerField("firstName")} />
        </div>
        <div>
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" {...registerField("lastName")} />
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" {...registerField("email")} />
          {formState.errors["email"] && (
            <p>{formState.errors["email"].message as string}</p>
          )}
        </div>
        <div>
          <label htmlFor="pass">Email Address</label>
          <input type="password" id="pass" {...registerField("password")} />
          {formState.errors["password"] && (
            <p>{formState.errors["password"].message as string}</p>
          )}
        </div>

        <div>
          <Button disabled={isRegistering} type="submit" className="w-full">
            Register
          </Button>
        </div>
      </form>

      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <Link
            to="../login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};
