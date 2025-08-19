"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function GetStartedButton() {
  const { data: session, isPending } = authClient.useSession(); // Checking if the user is logged in

  if (isPending) {
    return (
      <div>
        <Button variant="outline">Get Started</Button>
      </div>
    );
  }

  const href = session ? "/profile" : "/signin";

  return (
    <div className="flex flex-col items-center gap-4">
      <Button variant="outline" asChild>
        <Link href={href}>Get Started</Link>
        </Button>
      {session && <div>Welcome back, {session.user.name}</div>}
    </div>
  );
}
