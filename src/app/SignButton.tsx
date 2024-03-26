import React from "react";
import Image from "next/image";
import { Button } from "@radix-ui/themes";
import { auth, signIn, signOut } from "@/lib/auth";

export default async function SignButton() {
  const session = await auth();
  return (
    <div className="px-3">
      {session ? (
        <div className="flex items-center gap-3">
          <p>{session.user?.name}</p>
          <Image
            src={session.user?.image!}
            className="rounded-full"
            width={30}
            height={30}
            alt="avatar"
          />
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button className="text-zinc-50 bg-slate-900" type="submit">
              Sign Out
            </Button>
          </form>
        </div>
      ) : (
        <>
          <form
            action={async () => {
              "use server";
              await signIn();
            }}
          >
            <Button className="text-zinc-50 bg-slate-900" type="submit">
              Sign In
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
