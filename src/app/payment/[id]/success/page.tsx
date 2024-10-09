"use client"

import { faBarcode, faHome, faReceipt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function receipt() {

    const { id } = useParams<{ id: string }>();
    const [payment, setPayment] = useState<Payement>();
    const router = useRouter();
    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API_URL + "/payment/" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420"
            },
        }).then((res) => res.json())
            .then((data) => {
                setPayment(data);
            });
    }, [id]);

    return (
        <div className="flex h-screen">
            <div className="flex m-auto h-fit flex-col font-receipt bg-amber-900 dark:bg-white justify-center items-center dark:text-amber-900 text-amber-100 py-10 px-20 gap-4 max-w-[400px] relative">
                <div className="flex flex-col justify-center items-center gap-10">
                    <h1 className="text-6xl font-logo">Folklore</h1>
                    <FontAwesomeIcon icon={faReceipt} className="text-6xl" />
                </div>
                <h1 className="text-2xl -mx-10 font-bold text-center">Votre commande a bien été prise en compte</h1>
                <div className="w-full">
                    <p className="mb-6 italic">
                        Le{' '}
                        {
                            new Date(payment?.createdAt!).toLocaleDateString("fr-FR", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                            })
                        }
                    </p>
                    <div className="flex justify-between items-end">
                        <p className="text-nowrap leading-normal">
                            {
                                payment?.message.length! > 8 ?
                                    payment?.message.substring(0, 8)
                                    : payment?.message
                            }
                        </p>
                        <span className="w-full border-b border-dotted dark:border-amber-900 border-amber-100 flex-grow mx-4 my-2 self-end">
                        </span>
                        <p className="self-end">
                            {payment?.amount}€
                        </p>
                    </div>

                </div>
                <div>
                    <FontAwesomeIcon icon={faBarcode} className="text-6xl" />
                </div>
                <div className="w-full flex justify-center">
                    <button className="text-amber-900 dark:text-amber-100 bg-amber-100 dark:bg-amber-900 hover:text-black hover:bg-amber-300 transition-all py-4 px-6 rounded shadow-md" onClick={() => {
                        router.push("/")
                    }}>
                        <FontAwesomeIcon icon={faHome} className="mr-4" />
                        Retour à l'accueil
                    </button>
                </div>
                <div
                    className="bg-amber-900 dark:bg-white absolute -z-10 -bottom-20 w-full max-w-[400px] h-1/4"
                    style={
                        {
                            clipPath: "polygon(0% 1%, 100% 0, 100% 63%, 88% 99%, 85% 65%, 81% 84%, 76% 65%, 74% 79%, 68% 66%, 61% 85%, 55% 65%, 50% 93%, 41% 66%, 36% 80%, 29% 64%, 26% 97%, 21% 66%, 14% 92%, 9% 64%, 4% 96%, 0% 63%)"
                        }
                    }>

                </div>
            </div>
        </div>
    )
}

type Payement = {
    id: string;
    email: string;
    message: string;
    amount: number;
    status: string;
    createdAt: string;
}