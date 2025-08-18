"use client";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function SignOutButton({className, variant}: {className?: string, variant?: "outline" | "default" | "ghost" | "link" | "destructive" }) {
    
    const router = useRouter();

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/signin");
                }
            }   
        });
    }

    return <Button onClick={handleSignOut} className={className} variant={variant}>
        Sign Out
    </Button>
}