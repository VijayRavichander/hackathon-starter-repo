"use client";

import { SignUpForm, SignUpFormValues } from "@/components/global/signUpForm";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function Signup() {

const router = useRouter();
const [isPending, setPending] = useState(false);

const handleSignup = async (values: SignUpFormValues) => {
  
  await authClient.signUp.email(
    {
    email: values.email,
    password: values.password,
    name: values.firstName + " " + values.lastName,
  },
  {
    onRequest: () => {
        setPending(true);
    }, 
    onResponse: () => {
        setPending(false);
    },
    onSuccess: () => {
        router.push("/dashboard");
    },
  }
);
};

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SignUpForm onSubmit={handleSignup} isPending={isPending} />
    </div>
  );
}