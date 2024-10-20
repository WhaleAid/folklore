"use client"
import { Modal, ModalBody, ModalContent, ModalTrigger } from "@/components/ui/animated-modal"
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast";
import * as yup from "yup"

export default function Dashboard() {

    interface formProps {
        password: string;
    }

    useEffect(() => {
        const isValid = fetch(process.env.NEXT_PUBLIC_API_URL + "/check-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password: "password" })
        })
    }, [])

    const [loading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);

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
                },
                body: JSON.stringify(values.password),
            })
                .then((res) => {
                    if (res.status === 200) {
                        setLoading(false);
                        toast.success("Mot de passe correct");
                        setIsValid(true);
                    }
                })
                .catch((err) => {
                    setLoading(false);
                    toast.error("Mot de passe incorrect");
                    console.error(err);
                });
        },
    });

    return (
        <>
            <Toaster />
            <div className="min-h-screen min-w-screen flex justify-center items-center">
                {
                    !isValid ? (
                        <Modal>
                            <ModalTrigger>
                                <div className="flex flex-col justify-center items-center gap-10">
                                    <div className="flex flex-col gap-2 items-center justify-center">
                                        <img src="/assets/images/logo.png" alt="lock" className="w-20 h-20 rounded-full" />
                                        <h1 className="text-4xl font-logo">Folklore</h1>
                                    </div>
                                    <button className="bg-amber-100 rounded px-16 py-3 hover:bg-amber-200 transition-all text-[#02008f] font-bold">Se Connecter</button>
                                </div>
                            </ModalTrigger>
                            <ModalBody>
                                <ModalContent className=" bg-amber-100 flex">
                                    <div className="flex flex-col justify-center items-center h-full w-full gap-16 m-auto">
                                        <h1 className="font-logo text-2xl text-black">Rentrez le mot de passe</h1>
                                        <FormikProvider value={formik}>
                                            <Form onSubmit={formik.handleSubmit} className="flex flex-col justify-center items-center w-full gap-12">
                                                <div className="relative flex flex-col justify-center items-center">
                                                    <FontAwesomeIcon icon={faLock} className="absolute left-2 text-gray-700" />
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        id="password"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.password}
                                                        className="shadow-lg rounded py-2 pl-10 pr-5 text-black"
                                                    />
                                                </div>
                                                <button className="bg-black shadow-md rounded-lg px-16 py-3 hover:bg-[#02008f] transition-all text-white font-bold" type="submit">Valider</button>
                                            </Form>
                                        </FormikProvider>
                                    </div>
                                </ModalContent>
                            </ModalBody>
                        </Modal>
                    ) : (
                        <h1>Dashboard</h1>
                    )
                }
            </div>
        </>
    )
}