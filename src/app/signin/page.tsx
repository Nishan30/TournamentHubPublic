'use client';

import { Button } from "@/components/ui/button"; // Shad CN button
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState, useEffect, Suspense } from "react"; // Import Suspense here
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'; // Import useSearchParams
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useUser } from "@/context/UserContext";

// Firebase config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGIN,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function SignInPage() {
  const { setUser } = useUser();
  const [error, setError] = useState('');
  const [accountType, setAccountType] = useState('Organizer'); // Default account type
  const router = useRouter();
  const { open } = useWeb3Modal();
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  const searchParams = useSearchParams(); // Use this hook to get search parameters

  // Log state for debugging
  useEffect(() => {
    console.log('Account Type:', accountType);
    console.log('Is Connected:', isConnected);
  }, [accountType, isConnected]);

  // Check query parameter for account type
  useEffect(() => {
    const accountTypeFromQuery = searchParams?.get('accountType');
    if (accountTypeFromQuery) {
      setAccountType(accountTypeFromQuery); // Set account type based on the URL query
    }
  }, [searchParams]);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      setUser({
        uid: user.uid,
        email: user.email || "",
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
      });
      let tourId = searchParams?.get('id');
      let isMatch = searchParams?.get('isMatch');
      const redirectPath = searchParams?.get('redirect') || '/';
      if(isMatch){
        redirectToMatch(tourId as string);
      }
      else{
        if(tourId){
          redirectToTournament(tourId);
        }
        else{
          if(redirectPath != '/'){
            redirectBack(redirectPath);
          }
          else{
            redirectToDashboard();
          }
        }
      }
      
    } catch (error) {
      setError('Failed to sign in with Google.');
    }
  };

  const redirectToMatch = (tourId: string) => {
    if (accountType === 'Participant') {
      router.push(`/dashboard/participant/tournaments/joinedTournament/${tourId}`);
    } else if (accountType === 'Arbiter') {
      router.push(`/dashboard/arbiter/tournaments/assignedMatch/${tourId}`);
    }
  };

  const redirectToTournament = (tourId: string) => {
    if (accountType === 'Organizer') {
      router.push('/dashboard/organizer/dashboard/overview');
    } else if (accountType === 'Participant') {
      router.push(`/dashboard/participant/tournaments/exploreTournament/${tourId}`);
    } else if (accountType === 'Arbiter') {
      router.push(`/dashboard/arbiter/tournaments/exploreTournament/${tourId}`);
    }
  };

  const redirectToDashboard = () => {
    if (accountType === 'Organizer') {
      router.push('/dashboard/organizer/dashboard/overview');
    } else if (accountType === 'Participant') {
      router.push('/dashboard/participant/dashboard/overview');
    } else if (accountType === 'Arbiter') {
      router.push('/dashboard/arbiter/dashboard/overview');
    }
  };
  const redirectBack= (link:string) => {
    if (accountType === 'Organizer') {
      if(link.includes('organizer')){
        router.push(link);
      }
      else{
        router.push('/dashboard/organizer/dashboard/overview');
      }
    } else if (accountType === 'Participant') {
      if(link.includes('participant')){
        router.push(link);
      }
      else{
        router.push('/dashboard/participant/dashboard/overview');
      }
    } else if (accountType === 'Arbiter') {
      if(link.includes('arbiter')){
        router.push(link);
      }
      else{
        router.push('/dashboard/arbiter/dashboard/overview');
      }
    }
  };

  const handleWalletConnect = () => {
    open();
    if (isConnected) {
      redirectToDashboard();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <Suspense fallback={<div>Loading...</div>}> {/* Wrap in Suspense */}
        <Card className="mx-auto w-full max-w-md shadow-lg rounded-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Account Type Selector */}
            <div className="mb-4">
              <p className="block mb-2">Select Account Type</p>
              <select
                id="accountType"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-gray-700"
              >
                <option value="Organizer">Organizer</option>
                <option value="Participant">Participant</option>
                <option value="Arbiter">Arbiter</option>
              </select>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            {/* Google Sign-in Button */}
            <div className="mb-4">
              <Button
                variant="blue"
                size="lg"
                onClick={handleGoogleSignIn}
                className="w-full flex justify-center items-center"
              >
                Sign In with Google
              </Button>
            </div>

            {/* Separator with 'or' */}
            <div className="flex items-center mb-4">
              <div className="flex-grow h-px bg-gray-300"></div>
              <p className="px-3 text-gray-600 text-sm">or</p>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            {/* Wallet Connect Button */}
            <div className="mb-4">
              <Button
                variant="green"
                className="w-full flex justify-center items-center"
                onClick={handleWalletConnect}
              >
                Connect Wallet
              </Button>
            </div>
            <div className="shadow"></div>
          </CardContent>
        </Card>
      </Suspense>
    </div>
  );
}
