import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/global/signOutButton";

export default async function Profile() {
    
  const session = await auth.api.getSession({ 
    headers: await headers()
  });

  if (!session) {
    redirect("/signin");
  } 

  return <div>
    <div>Profile</div>
    <div>
        {JSON.stringify(session, null, 2)}
    </div>
    <div>
        <SignOutButton />
    </div>
  </div>;
}