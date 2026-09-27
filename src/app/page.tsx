import { Suspense } from "react";
import InvitationClient from "./_components/InvitationClient";

export default function Home() {
  return (
    <Suspense>
      <InvitationClient />
    </Suspense>
  );
}
