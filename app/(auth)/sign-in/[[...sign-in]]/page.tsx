// app/sign-in/page.tsx
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex justify-center bg-gray-800 items-center min-h-screen">
      <SignIn />
    </div>
  );
}
