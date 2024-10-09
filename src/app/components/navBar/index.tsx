"use client"

import { FC, useEffect, useState } from "react";
import Logo from "../logo";

interface navBarProps {

}

const NavBar: FC<navBarProps> = () => {

    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isScrolled]);

    return (
        <div className={`w-full fixed top-0 left-0 flex dark:text-amber-100 text-amber-900 justify-start items-end ${!isScrolled ? 'bg-gradient-to-b from-[#000000a8] to-[#0000]' : 'dark:bg-amber-900 bg-amber-100'
            }
        z-50`}>
            <Logo />
            <span className="mb-6 font-logo cursor-default hover:scale-110 transition-all">
                Voyagez à travers les sons du Maroc...
            </span>
        </div>
    );
}

export default NavBar;