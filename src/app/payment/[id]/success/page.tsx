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
        <div className="flex h-full min-h-screen">
            <div className="m-auto flex flex-col font-receipt bg-white justify-center items-center dark:text-amber-900 text-amber-100 py-10 px-20 gap-4 max-w-[400px]">
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
                            {/* limit de a few characters */}
                            {
                                payment?.message.length! > 8 ?
                                    payment?.message.substring(0, 8)
                                    : payment?.message
                            }
                        </p>
                        <span className="w-full border-b border-dotted border-amber-900 flex-grow mx-4 my-2 self-end">
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
                    <button className="dark:text-amber-900 text-amber-100 dark:bg-amber-100 bg-amber-900 hover:text-black hover:bg-amber-300 transition-all py-4 px-6 rounded shadow-md" onClick={() => {
                        router.push("/")
                    }}>
                        <FontAwesomeIcon icon={faHome} className="mr-4" />
                        Retour à l'accueil
                    </button>
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