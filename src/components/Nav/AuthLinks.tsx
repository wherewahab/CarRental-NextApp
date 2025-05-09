"use client";

import { LoadingSpinner } from "@/lib/loaders";
import { type User } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLoginModalStore } from "@/stores/modalStore";
import Modal from "../util/Modal";
import { useHandleOverflow } from "@/hooks/useOverflowHandler";
import Link from "next/link";

type AuthLinksProps = {
  mobileToggle?: () => void;
};

const AuthLinks = ({ mobileToggle }: AuthLinksProps) => {
  const { data: session, status } = useSession();
  const user = session?.user as User;
  const { isOpen: loginModalOpen, toggle: modalToggle } = useLoginModalStore();

  useHandleOverflow(loginModalOpen);

  const router = useRouter();


  return (
    <div className="flex flex-col items-center gap-4 font-semibold md:flex-row">
      {status === "loading" && <LoadingSpinner size={30} />}
      {status === "authenticated" && (
        <Link
          href={"/profile"}
          className="transition duration-300 hover:text-red-500"
          onClick={mobileToggle}
        >
          {user.name?.split(" ")[0]}
        </Link>
      )}
      {status === "authenticated" && (
        <button
          className="transition duration-300 hover:text-red-500"
        >
          Sign Out
        </button>
      )}
      {status === "unauthenticated" && (
        <div>
          <button
            onClick={modalToggle}
            className="transition duration-300 hover:text-red-500"
          >
            Sign In
          </button>
          <Modal open={loginModalOpen} toggle={modalToggle}>
            <div className="flex flex-col gap-4 px-4">
              <p className="text-center text-xl font-bold">Sign In</p>
              <button
                className="rounded-lg border border-slate-800 p-4 shadow-md shadow-slate-800 transition-colors duration-300 hover:bg-red-500 hover:text-white"
                
              >
                Sign in with Google
              </button>
              <div className="border-2 border-slate-800" />
              <button
                className="rounded-lg border border-slate-800 p-4 shadow-md shadow-slate-800 transition-colors duration-300 hover:bg-red-500 hover:text-white"
               
              >
                Sign in with Github
              </button>
              <div className="border-2 border-slate-800" />
              <button
                className="rounded-lg border border-slate-800 p-4 shadow-md shadow-slate-800 transition-colors duration-300 hover:bg-red-500 hover:text-white"
              >
                Sign in as a Guest
              </button>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default AuthLinks;
