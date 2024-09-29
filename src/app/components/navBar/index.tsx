import { FC } from "react";
import Logo from "../logo";

interface navBarProps {

}

const NavBar: FC<navBarProps> = () => {
    return (
        <div className="w-full fixed top-0 left-0 flex justify-start items-end bg-gradient-to-b from-[#000000a8] to-[#0000]">
            <Logo />
            <span className="mb-6 font-logo cursor-default hover:scale-110 transition-all">
                Voyagez à travers les sons du Maroc...
            </span>
        </div>
    );
}

export default NavBar;