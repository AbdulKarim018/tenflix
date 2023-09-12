import { signOut } from "next-auth/react";

export default function signOutAndClearCookies() {
  signOut();
  fetch('/api/clearsessioncookie')
}