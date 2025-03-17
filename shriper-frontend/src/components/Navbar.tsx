import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import constants from "@/constants";
import { useGetMeQuery } from "@/features/auth/api";
import LoggedInSection from "@/features/auth/LoggedInSection";

function NotLoggedInSection() {
  function handleLogin() {
    window.location.href = `${constants.BASE_URL}/api/auth/google-login`;
  }

  return (
    <div>
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}

function Navbar() {
  const { data: me } = useGetMeQuery();

  return (
    <div className="bg-secondary border-b border-border h-16 flex items-center justify-between px-4 md:px-6">
      <div className="font-bold text-lg">Shriper</div>

      <div className="flex-grow mx-4 md:mx-6 md:max-w-80">
        <Input type="text" placeholder="Search..." />
      </div>

      {me ? <LoggedInSection me={me} /> : <NotLoggedInSection />}
    </div>
  );
}

export default Navbar;
