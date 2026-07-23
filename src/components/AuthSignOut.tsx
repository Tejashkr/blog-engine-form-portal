import { SignOutButton } from "@/components/SignOutButton";
import { isAuthEnabled } from "@/lib/auth";

export function AuthSignOut() {
  if (!isAuthEnabled()) return null;
  return <SignOutButton />;
}
