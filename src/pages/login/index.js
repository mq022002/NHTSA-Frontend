// https://next-auth.js.org/getting-started/example

import { useSession, signIn, signOut } from "next-auth/react";

function LoginPage() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <p>Signed in as {session.user.email}</p>
        <button className="text-black" onClick={() => signOut()}>
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      <p className="text-black">Not signed in</p>
      <button className="text-black" onClick={() => signIn()}>
        Sign in
      </button>
    </>
  );
}
export default LoginPage;
