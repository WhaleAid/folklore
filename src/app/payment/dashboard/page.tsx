"use client"
import { Modal, ModalBody, ModalContent, ModalTrigger } from "@/components/ui/animated-modal";
import { faArrowsSpin, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import * as yup from "yup";

export default function Dashboard() {

    interface formProps {
        password: string;
    }

    type Payment = {
        _id: string;
        email: string;
        message: string;
        amount: number;
        status: string;
        order: string;
    }

    const [loading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [payments, setPayments] = useState<Payment[]>([]);
    const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
    const [filterStatus, setFilterStatus] = useState<string>("All");

    useEffect(() => {
        const session = sessionStorage.getItem("isValid");
        if (session) {
            setIsValid(true);
        }
        if (!isValid) return;

        const fetchPayments = async () => {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/payment", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "ngrok-skip-browser-warning": "69420"
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setPayments(data);
                    setFilteredPayments(data);
                } else {
                    console.error("Failed to fetch payments. Status code:", response.status);
                }
            } catch (error) {
                console.error("Error fetching payments:", error);
            }
        };

        fetchPayments();
    }, [isValid]);

    useEffect(() => {
        // Filter the payments based on the selected status
        if (filterStatus === "All") {
            setFilteredPayments(payments);
        } else {
            const filtered = payments.filter(payment => 
                filterStatus === "Paid" ? payment.status === "Paid" : payment.status !== "Paid"
            );
            setFilteredPayments(filtered);
        }
    }, [filterStatus, payments]);

    const validationSchema = yup.object({
        password: yup.string().required("Mot de passe requis")
    });

    const formik = useFormik({
        initialValues: {
            password: ""
        },
        validationSchema: validationSchema,
        onSubmit: async (values: formProps) => {
            setLoading(true);
            if (formik.errors.password) {
                setLoading(false);
                return;
            }
            fetch(process.env.NEXT_PUBLIC_API_URL + "/check-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    password: values.password
                }),
            })
                .then((res) => {
                    if (res.status === 200) {
                        setLoading(false);
                        toast.success("Mot de passe correct");
                        sessionStorage.setItem("isValid", "true");
                        setIsValid(true);
                    } else if (res.status === 401) {
                        setLoading(false);
                        toast.error("Mot de passe incorrect");
                    }
                })
                .catch((err) => {
                    setLoading(false);
                    toast.error("Erreur lors de la vérification du mot de passe");
                    console.error(err);
                });
        },
    });

    return (
        <>
            <Toaster />
            <div className="flex min-h-screen justify-center items-center">
                {
                    !isValid ? (
                        <Modal>
                            <ModalTrigger>
                                <div className="flex flex-col justify-center items-center gap-10">
                                    <div className="flex flex-col gap-2 items-center justify-center">
                                        <img src="/assets/images/logo.png" alt="lock" className="w-20 h-20 rounded-full" />
                                        <h1 className="text-4xl font-logo text-center text-green-700">Folklore</h1>
                                    </div>
                                    <div className="bg-red-600 rounded px-8 py-2 hover:bg-red-300 transition-all text-green-300 hover:text-green-700 font-bold text-center">Se Connecter</div>
                                </div>
                            </ModalTrigger>
                            <ModalBody>
                                <ModalContent className="bg-green-200 flex shadow-lg">
                                    <div className="flex flex-col justify-center items-center h-full w-full gap-8 m-auto p-4">
                                        <h1 className="font-logo text-xl md:text-2xl text-black text-center">Rentrez le mot de passe</h1>
                                        <FormikProvider value={formik}>
                                            <Form onSubmit={formik.handleSubmit} className="flex flex-col justify-center items-center w-full gap-6">
                                                <div className="relative flex flex-col justify-center items-center w-full max-w-md">
                                                    <FontAwesomeIcon icon={faLock} className="absolute left-2 text-gray-700" />
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        id="password"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.password}
                                                        className="w-full shadow-lg rounded py-2 pl-10 pr-4 text-black"
                                                    />
                                                </div>
                                                <button className="bg-red-500 shadow-md rounded-lg px-8 py-2 hover:bg-red-800 transition-all text-white font-bold w-full max-w-md" type="submit">Valider</button>
                                            </Form>
                                        </FormikProvider>
                                    </div>
                                </ModalContent>
                            </ModalBody>
                        </Modal>
                    ) : (
                        <div className="w-full h-full px-4 md:px-8 mt-10 overflow-y-auto">
                            <h1 className="text-3xl md:text-4xl font-logo mb-4 text-center md:text-left">Dashboard</h1>
                            <div>
                                <div className="w-full flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
                                    <h2 className="text-lg md:text-xl">Liste des commandes</h2>
                                    <select
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                        className="bg-white shadow-md rounded px-4 py-2 text-[#0d4e26] font-bold w-full md:w-auto"
                                    >
                                        <option value="All">Tous</option>
                                        <option value="Paid">Payé</option>
                                        <option value="Unpaid">Non payé</option>
                                    </select>
                                </div>
                                <div className="backdrop-blur-md rounded-xl max-h-[70vh] overflow-y-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 overflow-hidden">
                                        <thead className="bg-red-500 text-white">
                                            <tr className="font-logo text-lg md:text-xl">
                                                <th className="px-2 md:px-4 py-2">Email</th>
                                                <th className="px-2 md:px-4 py-2">Message</th>
                                                <th className="px-2 md:px-4 py-2">Montant</th>
                                                <th className="px-2 md:px-4 py-2">Statut</th>
                                                <th className="px-2 md:px-4 py-2">Commande</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                filteredPayments.length > 0 ? (
                                                    filteredPayments.map((payment) => (
                                                        <tr key={payment._id} className="odd:bg-green-600 even:bg-green-700 font-receipt text-base md:text- text-center">
                                                            <td className="px-2 md:px-6 py-4 whitespace-nowrap text-white">{payment.email}</td>
                                                            <td className="px-2 md:px-6 py-4 whitespace-nowrap text-white max-w-96 text-wrap">{payment.message}</td>
                                                            <td className="px-2 md:px-6 py-4 whitespace-nowrap text-white">{payment.amount}</td>
                                                            <td className="px-2 md:px-6 py-4 whitespace-nowrap">
                                                                <span className={`px-2 py-1 rounded-md text-sm font- text-white ${payment.status === "Paid" ? "bg-green-600" : "bg-red-700"}`}>
                                                                    {payment.status === "Paid" ? "Payé" : "Non payé"}
                                                                </span>
                                                            </td>
                                                            <td className="px-2 md:px-6 py-4 whitespace-nowrap flex justify-center items-center gap-2">
                                                                <span className={`px-2 py-1 rounded-md text-sm font-medium ${payment.order === "pending" ? "bg-yellow-700" : payment.order === "delivered" ? "bg-green-600" : "bg-none"}`}>
                                                                    {payment.order === "pending" ? "Non-Livrée" : payment.order === "delivered" ? "Livrée" : ""}
                                                                </span>
                                                                <button
                                                                    className={`${payment.order ?? "hidden"}`}
                                                                    onClick={() => {
                                                                        fetch(process.env.NEXT_PUBLIC_API_URL + "/update-order", {
                                                                            method: "POST",
                                                                            headers: {
                                                                                "Content-Type": "application/json",
                                                                                "Access-Control-Allow-Origin": "*"
                                                                            },
                                                                            body: JSON.stringify({
                                                                                paymentId: payment._id,
                                                                                orderStatus: payment.order === "pending" ? "delivered" : "pending"
                                                                            })
                                                                        }).then((res) => {
                                                                            if (res.ok) {
                                                                                toast.success("Commande modifiée avec succès");
                                                                                setIsValid(false);
                                                                            } else {
                                                                                toast.error("Erreur lors de la modification de la commande");
                                                                            }
                                                                        }).catch((err) => {
                                                                            toast.error("Erreur lors de la modification de la commande");
                                                                            console.error(err);
                                                                        })
                                                                    }}
                                                                >
                                                                    <FontAwesomeIcon icon={faArrowsSpin} className="text-amber-100" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={5} className="px-2 md:px-6 py-4 text-center">Aucune commande trouvée...</td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    );
}
