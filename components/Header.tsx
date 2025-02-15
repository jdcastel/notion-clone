"use client";

import { SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Breadcrumbs from "./Breadcrumbs";

const Header = () => {

  const {user} = useUser();
  
  return (
    <div className="flex justify-between items-center p-5">
      {user && (
        <h1 className="text-xl">
          Hi, {user?.firstName}
        </h1>
      )}
        <Breadcrumbs />
      <div>

        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignInButton>
          <UserButton />
        </SignInButton>
      </div>
    </div>
  )
}
export default Header