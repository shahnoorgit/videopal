// app/sign-in/page.tsx
import { SignUp } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex bg-gray-800 justify-center items-center min-h-screen">
      <SignUp />
    </div>
  );
}
