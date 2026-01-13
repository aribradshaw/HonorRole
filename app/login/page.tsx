import { Suspense } from "react";
import LoginClient from "./LoginClient";

export default function LoginPage() {
  // Next.js requires `useSearchParams()` to be used within a Suspense boundary.
  return (
    <Suspense fallback={null}>
      <LoginClient />
    </Suspense>
  );
}

