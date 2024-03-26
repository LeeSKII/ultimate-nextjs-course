import { auth } from "@/lib/auth";
import { Button } from "@radix-ui/themes";

export default async function Home() {
  const session = await auth();
  return (
    <>
      <p>Welcome {session && session?.user?.name}!</p>
      <p>Id {session && session?.user?.id}!</p>
      <form action="">
        <Button>Button</Button>
      </form>
    </>
  );
}
