"use client";

import { SignInForm, SignInFormValues } from "@/components/global/signInForm";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Signin() {
  const router = useRouter();

  const handleSignin = async (values: SignInFormValues) => {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          router.push("/profile");
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SignInForm onSubmit={handleSignin} />
    </div>
  );
}
