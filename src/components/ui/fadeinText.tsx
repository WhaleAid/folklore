import { motion } from "framer-motion";
import { FC } from "react";

interface fadeInTextProps {
    text: string;
    className: string;
}

const FadeInText: FC<fadeInTextProps> = (props: fadeInTextProps) => {

    const wordVariants = {
        hidden: { opacity: 0 },
        visible: (i: number) => ({ y: 0, opacity: 1, transition: { delay: i * 0.01 } }),
    };
    const words = props.text.split(" ");

    return (
        <motion.h1
            initial="hidden"
            whileInView="visible"
            className={props.className}
        >
            {words.map((word, i) => (
                <motion.span key={word} variants={wordVariants} custom={i}>
                    {word}{" "}
                </motion.span>
            ))}
        </motion.h1>
    );
}

export default FadeInText;