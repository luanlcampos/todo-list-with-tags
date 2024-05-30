import AccountMenu from "../AccountMenu";
import { Button } from "../ui/button";
import { ThemeSwitcher } from "./ThemeSwitcher";

type NavbarProps = {
  isSupabaseConnected: boolean;
};

export default function Navbar({ isSupabaseConnected }: NavbarProps) {
  return (
    <nav className="max-w-4xl w-full flex justify-between border-b border-b-foreground/10 h-16">
      <div className="flex items-center">
        <span className="text-2xl font-mono tracking-widest">todo.</span>
      </div>
      <div className="flex gap-x-4 justify-end items-center text-sm">
        <ThemeSwitcher />
        {isSupabaseConnected && <AccountMenu />}
      </div>
    </nav>
  );
}
