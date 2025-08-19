"use client";

import { SignUpForm, SignUpFormValues } from "@/components/global/signUpForm";
import { authClient, } from "@/lib/auth-client";
import { ErrorCode } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Signup() {

const router = useRouter();
const [isPending, setPending] = useState(false);

const handleSignup = async (values: SignUpFormValues) => {
  try {
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
          router.push("/profile");
      },
      onError: (err) => {
        toast.error(err.error.message)
      }
    }
  );
  } catch(err) {
    toast.error("Something went wrong")
  }
  
};

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SignUpForm onSubmit={handleSignup} isPending={isPending} />
    </div>
  );
}