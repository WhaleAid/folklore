"use client"
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";

interface LogoProps {

}

const router = useRouter();
const pathname = usePathname();

const Logo: FC<LogoProps> = () => {
    return (
        <div className="px-8 py-6 cursor-pointer " onClick={
            () => {
                if (pathname !== "/") {
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    })
                } else {
                    router.push("/");
                }
            }
        }>
            <h1 className="text-amber-100 text-4xl font-logo">Folklore</h1>
        </div>
    );
}

export default Logo;