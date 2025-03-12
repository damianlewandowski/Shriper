import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  function handleLogin() {
    // Redirect the user to your API's Google login endpoint
    window.location.href = "http://localhost:5041/auth/google-login"; // Replace with your API's URL
  }

  return (
    <div>
      Hello "/login"!
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
}
