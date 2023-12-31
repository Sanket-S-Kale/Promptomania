"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Nav = () => {
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false)
    const router = useRouter();

    const signOutHandler = () => {
        signOut({callbackUrl: `${window.location.origin}`});
    }

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setUpProviders();
    }, []);

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image
                    src="/assets/images/logo.svg"
                    alt="Promptomania Logo"
                    width={30}
                    height={30}
                    className="object-contain"
                />
            </Link>
            <p className="logo_text">Promptomania</p>

            {/* desktop navigation */}
            <div className="sm:flex hidden">
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" className="black_btn">
                            Create Prompt
                        </Link>
                        <button type="button" className="outline_btn" onClick={signOutHandler}>
                            Sign Out
                        </button>

                        <Link href="/profile">
                            <Image
                                src={session?.user.image}
                                width={37}
                                height={37}
                                className="rounded-full"
                                alt="profile image"
                            />
                        </Link>
                    </div>
                ): (
                    <>
                        {providers &&
                        Object.values(providers).map((provider) => (
                            <button 
                                className="black_btn"
                                type="button"
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                            >
                                Sign In
                            </button>
                        ))}
                    </>
                )}
            </div>

            {/* Mobile Navigation */}
            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className="flex">
                        <Image
                            src={session?.user.image}
                            width={37}
                            height={37}
                            className="rounded-full"
                            alt="profile image"
                            onClick={() => setToggleDropdown((prev) => !prev)}
                        />
                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link
                                    className="dropdown_link"
                                    href="/profile"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    className="dropdown_link"
                                    href="/create-prompt"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOutHandler;
                                    }}
                                    className="mt-5 w-full black_btn"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers &&
                        Object.values(providers).map((provider) => (
                            <button 
                                className="black_btn"
                                type="button"
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                            >
                                Sign In
                            </button>
                        ))}
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav
