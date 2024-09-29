"use client"
import { FC } from "react";

interface LogoProps {

}

const Logo: FC<LogoProps> = () => {
    return (
        <div className="px-8 py-6 cursor-pointer" onClick={
            () => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                })
            }
        }>
            <h1 className="dark:text-white text-black text-4xl font-logo">Folklore</h1>
        </div>
    );
}

export default Logo;