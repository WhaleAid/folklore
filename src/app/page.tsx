"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, FormikProvider, useFormik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import * as yup from "yup";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { faEnvelope, faHeadset, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Hourglass } from "react-loader-spinner";
import FadeInText from "@/components/ui/fadeinText";
import { Card, CardBody } from "@nextui-org/card";

interface formProps {
  email: string;
  message: string;
  amount: number;
}

export default function Home() {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const validationSchema = yup.object({
    email: yup.string().email("Format d'email non valide").required("Email requis"),
    message: yup.string().required("Le message est requis pour savoir votre besoin"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      message: "",
      amount: 50
    },
    validationSchema: validationSchema,
    onSubmit: async (values: formProps) => {
      setLoading(true);
      if (formik.errors.email || formik.errors.message) {
        setLoading(false);
        return;
      }
      fetch(process.env.NEXT_PUBLIC_API_URL + "/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          router.push(data.paymentLink)
        })
    }
  })

  return (
    <>
      <div className="overflow-hidden">
        <div id="hero" className="w-full flex items-center justify-between lg:flex-row flex-col">
          <AnimatePresence mode="sync">
            <motion.div
              id="hero-text" className="px-6 flex flex-col gap-4 lg:mt-1 mt-28"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.5 }}
            >
              <h1>
                <span className="lg:text-8xl text-6xl font-logo dark:text-amber-100 text-amber-900">Bienvenue sur</span>
                <br />
                <span className="lg:text-8xl text-6xl font-logo dark:text-amber-100 text-amber-900">Folklore</span>
              </h1>
              <p className="text-2xl font-logo font-thin">
                Dédicaces sur mesure pour transmettre vos messages en musique
              </p>
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="sync">
            <motion.div
              id="hero-image"
              className="lg:mt-auto mt-28"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="assets/images/hamza-img.jpg"
                alt="hero"
                className="w-full h-full object-cover"
              />
              <div className="w-full flex items-center -mt-28">
                <div className="w-5/6 bg-amber-800 h-28 flex justify-start items-center px-5">
                  <h2 className="text-white text-3xl font-logo">
                    Réservez maintenant
                  </h2>
                </div>
                <div className="w-1/6 bg-orange-900 h-28 flex justify-center items-center">
                  <button className="flex justify-center w-full" onClick={
                    () => {
                      const form = document.getElementById("form");
                      form?.scrollIntoView({ behavior: "smooth" });
                    }
                  }>
                    <div className="w-12">
                      <svg width="50px" height="50px" viewBox="0 0 91.00 91.00" id="Layer_1" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#d9b99b" stroke="#d9b99b" strokeWidth="0.00001">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                        <g id="SVGRepo_iconCarrier"><g> <path className="st0" d="M81.8,10.6C67.4,17.8,55,31.1,43.1,41.7C35,49,27.1,56.6,19.3,64.2c2.8-12.4,3.9-26.1-1.1-36.3 c-2.5-5-8.9-1.9-9.4,2.6c-0.8,7.6,0.5,15.5,0,23.2C8.3,61.9,7,70.1,4.8,78c-1.1,4,2.6,7.2,6.4,6.4c9.1-1.9,18.2-2.8,27.5-2.8 c8.5,0.1,17.1,2,25.5,1.3c2.3-0.2,3.4-3.2,1.2-4.5c-11.5-7-27.5-7.6-42-6.2c8.7-7.3,17.5-14.6,26.1-21.9C61.8,39.9,77,30.2,87,17.4 C90,13.7,86.4,8.3,81.8,10.6z" /> </g> </g>
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div id="form" className="lg:w-full w-2/3 m-auto flex justify-center items-center ">
          <svg className="" version="1.0" xmlns="http://www.w3.org/2000/svg"
            width="600px" height="300px" viewBox="0 0 1280.000000 640.000000"
            preserveAspectRatio="xMidYMid meet">
            <metadata>
              Created by potrace 1.15, written by Peter Selinger 2001-2017
            </metadata>
            <g transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)"
              fill="#d9b99b" stroke="none">
              <path d="M6354 3698 c-93 -66 -129 -208 -84 -334 20 -59 67 -128 109 -159 l24
-19 53 56 c129 139 124 364 -11 456 -39 28 -53 27 -91 0z m90 -19 c14 -11 38
-42 54 -67 24 -41 27 -57 27 -132 0 -72 -4 -93 -27 -140 -15 -30 -43 -71 -63
-90 l-35 -34 -35 34 c-20 19 -48 60 -63 90 -23 47 -27 68 -27 140 0 75 3 91
27 132 31 51 71 88 98 88 10 0 29 -9 44 -21z"/>
              <path d="M4939 3411 c-113 -22 -229 -116 -282 -229 -30 -62 -32 -75 -32 -172
0 -92 3 -112 26 -160 36 -77 71 -115 137 -147 49 -24 69 -28 142 -28 107 0
164 21 218 79 67 73 79 158 36 245 -36 71 -86 104 -168 109 -49 3 -70 -1 -106
-20 -53 -27 -84 -74 -74 -113 l7 -26 28 34 c36 44 108 63 172 46 110 -30 152
-177 74 -265 -49 -57 -100 -78 -188 -78 -67 -1 -81 3 -125 29 -91 57 -141 181
-132 327 14 208 205 360 411 327 127 -21 230 -71 426 -208 207 -145 349 -220
531 -279 269 -88 452 -88 720 0 183 60 325 135 531 279 196 137 299 187 426
208 206 33 397 -119 411 -327 9 -146 -41 -270 -132 -327 -44 -26 -58 -30 -125
-29 -88 0 -139 21 -188 78 -78 88 -36 235 74 265 64 17 136 -2 172 -46 l28
-34 7 26 c10 39 -21 86 -74 113 -36 19 -57 23 -106 20 -82 -5 -132 -38 -168
-109 -43 -87 -31 -172 36 -245 54 -58 111 -79 218 -79 140 0 221 51 279 175
23 48 26 68 26 160 0 97 -2 110 -32 172 -40 86 -110 156 -194 196 -176 84
-376 33 -646 -165 -277 -203 -488 -305 -738 -358 -202 -42 -425 -2 -690 124
-135 65 -208 110 -378 234 -226 165 -403 228 -558 198z"/>
              <path d="M5801 3369 c-24 -5 -45 -10 -47 -12 -2 -2 20 -20 50 -41 63 -43 125
-108 214 -223 107 -138 219 -196 382 -196 170 0 272 56 399 217 86 110 143
167 211 212 41 27 41 28 18 37 -40 15 -181 20 -242 8 -78 -14 -124 -38 -221
-112 -44 -33 -99 -70 -122 -82 l-43 -21 -42 21 c-24 12 -79 49 -123 82 -44 34
-98 70 -120 81 -77 37 -210 50 -314 29z m162 -9 c87 -14 152 -49 251 -134 49
-43 111 -88 137 -102 l49 -24 49 24 c26 14 88 59 137 102 99 85 164 120 251
135 52 8 156 4 176 -8 5 -3 -15 -21 -45 -41 -29 -19 -109 -93 -178 -163 -69
-69 -143 -136 -165 -147 -143 -72 -307 -72 -450 0 -22 11 -96 78 -165 147 -69
70 -149 144 -179 164 -56 37 -56 42 4 50 55 7 70 7 128 -3z"/>
              <path d="M4444 3070 c-49 -20 -66 -77 -39 -129 29 -56 125 -58 154 -3 42 79
-33 165 -115 132z m66 -48 c18 -14 21 -25 16 -45 -8 -35 -49 -46 -76 -22 -25
23 -25 40 0 65 25 25 32 25 60 2z"/>
              <path d="M8262 3055 c-54 -45 -42 -124 23 -151 62 -26 125 20 125 90 0 36 -39
76 -81 82 -28 5 -41 1 -67 -21z m88 -35 c25 -25 25 -42 0 -65 -27 -24 -68 -13
-76 22 -5 20 -2 31 16 45 28 23 35 23 60 -2z"/>
              <path d="M16 3017 c-24 -18 -17 -48 14 -64 20 -10 453 -12 2148 -10 2089 2
2124 2 2138 21 18 25 18 31 -2 50 -14 14 -223 16 -2148 16 -1747 0 -2135 -2
-2150 -13z"/>
              <path d="M8486 3014 c-20 -19 -20 -25 -2 -50 14 -19 49 -19 2138 -21 2246 -3
2168 -4 2176 42 10 47 103 45 -2164 45 -1925 0 -2134 -2 -2148 -16z"/>
              <path d="M5492 2948 c-52 -19 -142 -93 -142 -116 0 -6 11 -24 24 -39 23 -27
28 -28 113 -27 75 0 107 7 218 42 72 23 155 45 185 48 88 10 91 18 19 52 -137
65 -310 82 -417 40z m368 -43 l55 -18 -80 -12 c-44 -7 -127 -24 -185 -40 -111
-28 -213 -36 -232 -17 -22 22 39 69 127 99 55 18 243 11 315 -12z"/>
              <path d="M7004 2951 c-34 -10 -88 -30 -119 -46 -65 -31 -61 -39 25 -49 30 -3
114 -25 185 -48 111 -35 143 -42 218 -42 85 -1 90 0 113 27 13 15 24 33 24 39
0 24 -90 97 -144 117 -72 27 -212 28 -302 2z m293 -50 c62 -28 102 -66 85 -83
-20 -20 -122 -11 -248 21 -66 17 -149 34 -183 37 -43 5 -58 10 -48 16 77 43
305 48 394 9z"/>
            </g>
          </svg>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div>
            <h2 className="text-center font-bold font-logo text-4xl dark:text-amber-100 text-amber-900 mb-6">Notre Service</h2>
          </div>
          <div className="flex justify-center items-center lg:w-5/6 w-4/6 mt-12 lg:flex-row flex-col">
            <div className="flex flex-col w-full justify-center items-center">
              <Carousel className="w-full max-w-xl margin-auto shadow-lg">
                <CarouselContent>
                  <CarouselItem className="max-w-[300px]">
                    <video src="assets/videos/vid1.mp4" controls autoPlay muted />
                  </CarouselItem>
                  <CarouselItem className="max-w-[300px]">
                    <video src="assets/videos/vid2.mp4" controls autoPlay muted />
                  </CarouselItem>
                  <CarouselItem className="max-w-[300px]">
                    <video src="assets/videos/vid4.mp4" controls />
                  </CarouselItem>
                  <CarouselItem className="max-w-[300px]">
                    <video src="assets/videos/vid5.mp4" controls />
                  </CarouselItem>
                  <CarouselItem className="max-w-[300px]">
                    <video src="assets/videos/vid6.mp4" controls />
                  </CarouselItem>
                  <CarouselItem className="max-w-[300px]">
                    <video src="assets/videos/vid7.mp4" controls />
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <div className="w-full">
              <FormikProvider value={formik}>
                <Form>
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="flex flex-col justify-start items-start my-6 lg:w-2/3 w-full">
                      <h3 className="font-logo lg:text-4xl text-2xl dark:text-amber-100 text-amber-900">Description</h3>
                      <p className="font-logo lg:text-lg text-md dark:text-amber-100 text-amber-900">Toutes les commandes passées entre dimanche et vendredi seront traitées le samedi et envoyées le dimanche. Une commande passée le samedi sera traitée le samedi suivant.</p>
                      <span className="text-6xl font-logo">
                        50€
                      </span>
                    </div>
                    <div className="flex flex-col lg:w-2/3 w-full">
                      <label htmlFor="email" className="font-logo text-xl dark:text-amber-100 text-amber-950">Email* :</label>
                      <span className="italic font-logo mb-2 text-sm dark:text-white text-black">
                        L'email où vous recevrez votre vidéo
                      </span>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="border border-amber-700 p-2 text-amber-900 bg-slate-100"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                      />
                      <span className="dark:text-red-400 text-red-600">
                        {formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                      </span>
                    </div>
                    <div className="flex flex-col lg:w-2/3 w-full">
                      <label htmlFor="message" className="font-logo text-xl dark:text-amber-100 text-amber-950">Message* :</label>
                      <span className="italic font-logo mb-2 text-sm dark:text-white text-black">
                        Un message avec des précision sur la vidéo que vous souhaitez
                      </span>
                      <textarea
                        name="message"
                        id="message"
                        className="border border-amber-700 p-2 text-amber-900 bg-slate-100"
                        onChange={formik.handleChange}
                        value={formik.values.message}
                      />
                      <span className="dark:text-red-400 text-red-600">
                        {formik.touched.message && formik.errors.message ? formik.errors.message : ""}
                      </span>
                    </div>
                    <button type="submit" className="bg-amber-800 text-white rounded-md py-2 px-8 font-logo text-xl mt-4 hover:bg-amber-600 transition-all" disabled={loading}>
                      {
                        loading ? <Hourglass
                          visible={true}
                          height="20"
                          width="20"
                          ariaLabel="hourglass-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                          colors={['#fff0db', '#fef3c7']}
                        /> : "Valider"
                      }
                    </button>
                  </div>
                </Form>
              </FormikProvider>
            </div>
          </div>
        </div>
        <div className="lg:w-full w-2/3 m-auto flex justify-center items-center">
          <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            width="600px" height="300px" viewBox="0 0 1280.000000 640.000000"
            preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)"
              fill="#d9b99b" stroke="none">
              <path d="M6354 3698 c-93 -66 -129 -208 -84 -334 20 -59 67 -128 109 -159 l24
-19 53 56 c129 139 124 364 -11 456 -39 28 -53 27 -91 0z m90 -19 c14 -11 38
-42 54 -67 24 -41 27 -57 27 -132 0 -72 -4 -93 -27 -140 -15 -30 -43 -71 -63
-90 l-35 -34 -35 34 c-20 19 -48 60 -63 90 -23 47 -27 68 -27 140 0 75 3 91
27 132 31 51 71 88 98 88 10 0 29 -9 44 -21z"/>
              <path d="M4939 3411 c-113 -22 -229 -116 -282 -229 -30 -62 -32 -75 -32 -172
0 -92 3 -112 26 -160 36 -77 71 -115 137 -147 49 -24 69 -28 142 -28 107 0
164 21 218 79 67 73 79 158 36 245 -36 71 -86 104 -168 109 -49 3 -70 -1 -106
-20 -53 -27 -84 -74 -74 -113 l7 -26 28 34 c36 44 108 63 172 46 110 -30 152
-177 74 -265 -49 -57 -100 -78 -188 -78 -67 -1 -81 3 -125 29 -91 57 -141 181
-132 327 14 208 205 360 411 327 127 -21 230 -71 426 -208 207 -145 349 -220
531 -279 269 -88 452 -88 720 0 183 60 325 135 531 279 196 137 299 187 426
208 206 33 397 -119 411 -327 9 -146 -41 -270 -132 -327 -44 -26 -58 -30 -125
-29 -88 0 -139 21 -188 78 -78 88 -36 235 74 265 64 17 136 -2 172 -46 l28
-34 7 26 c10 39 -21 86 -74 113 -36 19 -57 23 -106 20 -82 -5 -132 -38 -168
-109 -43 -87 -31 -172 36 -245 54 -58 111 -79 218 -79 140 0 221 51 279 175
23 48 26 68 26 160 0 97 -2 110 -32 172 -40 86 -110 156 -194 196 -176 84
-376 33 -646 -165 -277 -203 -488 -305 -738 -358 -202 -42 -425 -2 -690 124
-135 65 -208 110 -378 234 -226 165 -403 228 -558 198z"/>
              <path d="M5801 3369 c-24 -5 -45 -10 -47 -12 -2 -2 20 -20 50 -41 63 -43 125
-108 214 -223 107 -138 219 -196 382 -196 170 0 272 56 399 217 86 110 143
167 211 212 41 27 41 28 18 37 -40 15 -181 20 -242 8 -78 -14 -124 -38 -221
-112 -44 -33 -99 -70 -122 -82 l-43 -21 -42 21 c-24 12 -79 49 -123 82 -44 34
-98 70 -120 81 -77 37 -210 50 -314 29z m162 -9 c87 -14 152 -49 251 -134 49
-43 111 -88 137 -102 l49 -24 49 24 c26 14 88 59 137 102 99 85 164 120 251
135 52 8 156 4 176 -8 5 -3 -15 -21 -45 -41 -29 -19 -109 -93 -178 -163 -69
-69 -143 -136 -165 -147 -143 -72 -307 -72 -450 0 -22 11 -96 78 -165 147 -69
70 -149 144 -179 164 -56 37 -56 42 4 50 55 7 70 7 128 -3z"/>
              <path d="M4444 3070 c-49 -20 -66 -77 -39 -129 29 -56 125 -58 154 -3 42 79
-33 165 -115 132z m66 -48 c18 -14 21 -25 16 -45 -8 -35 -49 -46 -76 -22 -25
23 -25 40 0 65 25 25 32 25 60 2z"/>
              <path d="M8262 3055 c-54 -45 -42 -124 23 -151 62 -26 125 20 125 90 0 36 -39
76 -81 82 -28 5 -41 1 -67 -21z m88 -35 c25 -25 25 -42 0 -65 -27 -24 -68 -13
-76 22 -5 20 -2 31 16 45 28 23 35 23 60 -2z"/>
              <path d="M16 3017 c-24 -18 -17 -48 14 -64 20 -10 453 -12 2148 -10 2089 2
2124 2 2138 21 18 25 18 31 -2 50 -14 14 -223 16 -2148 16 -1747 0 -2135 -2
-2150 -13z"/>
              <path d="M8486 3014 c-20 -19 -20 -25 -2 -50 14 -19 49 -19 2138 -21 2246 -3
2168 -4 2176 42 10 47 103 45 -2164 45 -1925 0 -2134 -2 -2148 -16z"/>
              <path d="M5492 2948 c-52 -19 -142 -93 -142 -116 0 -6 11 -24 24 -39 23 -27
28 -28 113 -27 75 0 107 7 218 42 72 23 155 45 185 48 88 10 91 18 19 52 -137
65 -310 82 -417 40z m368 -43 l55 -18 -80 -12 c-44 -7 -127 -24 -185 -40 -111
-28 -213 -36 -232 -17 -22 22 39 69 127 99 55 18 243 11 315 -12z"/>
              <path d="M7004 2951 c-34 -10 -88 -30 -119 -46 -65 -31 -61 -39 25 -49 30 -3
114 -25 185 -48 111 -35 143 -42 218 -42 85 -1 90 0 113 27 13 15 24 33 24 39
0 24 -90 97 -144 117 -72 27 -212 28 -302 2z m293 -50 c62 -28 102 -66 85 -83
-20 -20 -122 -11 -248 21 -66 17 -149 34 -183 37 -43 5 -58 10 -48 16 77 43
305 48 394 9z"/>
            </g>
          </svg>
        </div>
        <div className="flex justify-center lg:w-4/5 w-full m-auto lg:flex-row flex-col lg:gap-0 gap-6">
          <div className="lg:w-1/2 w-full px-10">
            <h2 className="font-bold font-logo text-4xl dark:text-amber-100 text-amber-900 mb-6">à propos de nous</h2>
            <FadeInText
              text="votre destination pour la musique traditionnelle marocaine authentique et vibrante. Notre groupe est né de la passion de préserver et de partager la richesse de la musique marocaine à travers des mélodies envoûtantes et des rythmes captivants.
Nous offrons des dédicaces musicales uniques pour toutes vos occasions spéciales. Que ce soit pour un anniversaire, un mariage ou une célébration personnelle, nous nous engageons à créer des moments inoubliables avec nos performances sur mesure.
Rejoignez-nous dans cette aventure musicale et laissez-nous apporter la magie des sons traditionnels marocains à vos événements. Pour chaque dédicace, une contrepartie est requise, permettant ainsi de soutenir notre mission de garder vivante la culture musicale marocaine.
Merci de faire partie de notre communauté musicale! 🎶"
              className="text-xl leading-loose" />
          </div>
          <AnimatePresence mode="sync">
            <motion.div
              className="lg:w-1/2 w-full"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="mt-8 mb-8 lg:w-[40vw] w-4/5 h-[60vh] mx-auto shadow-xl backdrop-blur-3xl relative overflow-hidden">
                <span className='absolute inset-[-100000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#343434_90%,#5C4033_50%,#fff0db_100%)]' style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))' }} />
                <CardBody className="p-0 h-full drop-shadow-2xl backdrop-blur-3xl">
                  <div className="w-full h-full p-2">
                    <img src="assets/images/hamza-img.jpg" alt="" className="h-full w-full object-cover" />
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center lg:w-full w-2/3 m-auto">
          <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            width="600px" height="300px" viewBox="0 0 1280.000000 640.000000"
            preserveAspectRatio="xMidYMid meet">
            <metadata>
              Created by potrace 1.15, written by Peter Selinger 2001-2017
            </metadata>
            <g transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)"
              fill="#d9b99b" stroke="none">
              <path d="M6354 3698 c-93 -66 -129 -208 -84 -334 20 -59 67 -128 109 -159 l24
-19 53 56 c129 139 124 364 -11 456 -39 28 -53 27 -91 0z m90 -19 c14 -11 38
-42 54 -67 24 -41 27 -57 27 -132 0 -72 -4 -93 -27 -140 -15 -30 -43 -71 -63
-90 l-35 -34 -35 34 c-20 19 -48 60 -63 90 -23 47 -27 68 -27 140 0 75 3 91
27 132 31 51 71 88 98 88 10 0 29 -9 44 -21z"/>
              <path d="M4939 3411 c-113 -22 -229 -116 -282 -229 -30 -62 -32 -75 -32 -172
0 -92 3 -112 26 -160 36 -77 71 -115 137 -147 49 -24 69 -28 142 -28 107 0
164 21 218 79 67 73 79 158 36 245 -36 71 -86 104 -168 109 -49 3 -70 -1 -106
-20 -53 -27 -84 -74 -74 -113 l7 -26 28 34 c36 44 108 63 172 46 110 -30 152
-177 74 -265 -49 -57 -100 -78 -188 -78 -67 -1 -81 3 -125 29 -91 57 -141 181
-132 327 14 208 205 360 411 327 127 -21 230 -71 426 -208 207 -145 349 -220
531 -279 269 -88 452 -88 720 0 183 60 325 135 531 279 196 137 299 187 426
208 206 33 397 -119 411 -327 9 -146 -41 -270 -132 -327 -44 -26 -58 -30 -125
-29 -88 0 -139 21 -188 78 -78 88 -36 235 74 265 64 17 136 -2 172 -46 l28
-34 7 26 c10 39 -21 86 -74 113 -36 19 -57 23 -106 20 -82 -5 -132 -38 -168
-109 -43 -87 -31 -172 36 -245 54 -58 111 -79 218 -79 140 0 221 51 279 175
23 48 26 68 26 160 0 97 -2 110 -32 172 -40 86 -110 156 -194 196 -176 84
-376 33 -646 -165 -277 -203 -488 -305 -738 -358 -202 -42 -425 -2 -690 124
-135 65 -208 110 -378 234 -226 165 -403 228 -558 198z"/>
              <path d="M5801 3369 c-24 -5 -45 -10 -47 -12 -2 -2 20 -20 50 -41 63 -43 125
-108 214 -223 107 -138 219 -196 382 -196 170 0 272 56 399 217 86 110 143
167 211 212 41 27 41 28 18 37 -40 15 -181 20 -242 8 -78 -14 -124 -38 -221
-112 -44 -33 -99 -70 -122 -82 l-43 -21 -42 21 c-24 12 -79 49 -123 82 -44 34
-98 70 -120 81 -77 37 -210 50 -314 29z m162 -9 c87 -14 152 -49 251 -134 49
-43 111 -88 137 -102 l49 -24 49 24 c26 14 88 59 137 102 99 85 164 120 251
135 52 8 156 4 176 -8 5 -3 -15 -21 -45 -41 -29 -19 -109 -93 -178 -163 -69
-69 -143 -136 -165 -147 -143 -72 -307 -72 -450 0 -22 11 -96 78 -165 147 -69
70 -149 144 -179 164 -56 37 -56 42 4 50 55 7 70 7 128 -3z"/>
              <path d="M4444 3070 c-49 -20 -66 -77 -39 -129 29 -56 125 -58 154 -3 42 79
-33 165 -115 132z m66 -48 c18 -14 21 -25 16 -45 -8 -35 -49 -46 -76 -22 -25
23 -25 40 0 65 25 25 32 25 60 2z"/>
              <path d="M8262 3055 c-54 -45 -42 -124 23 -151 62 -26 125 20 125 90 0 36 -39
76 -81 82 -28 5 -41 1 -67 -21z m88 -35 c25 -25 25 -42 0 -65 -27 -24 -68 -13
-76 22 -5 20 -2 31 16 45 28 23 35 23 60 -2z"/>
              <path d="M16 3017 c-24 -18 -17 -48 14 -64 20 -10 453 -12 2148 -10 2089 2
2124 2 2138 21 18 25 18 31 -2 50 -14 14 -223 16 -2148 16 -1747 0 -2135 -2
-2150 -13z"/>
              <path d="M8486 3014 c-20 -19 -20 -25 -2 -50 14 -19 49 -19 2138 -21 2246 -3
2168 -4 2176 42 10 47 103 45 -2164 45 -1925 0 -2134 -2 -2148 -16z"/>
              <path d="M5492 2948 c-52 -19 -142 -93 -142 -116 0 -6 11 -24 24 -39 23 -27
28 -28 113 -27 75 0 107 7 218 42 72 23 155 45 185 48 88 10 91 18 19 52 -137
65 -310 82 -417 40z m368 -43 l55 -18 -80 -12 c-44 -7 -127 -24 -185 -40 -111
-28 -213 -36 -232 -17 -22 22 39 69 127 99 55 18 243 11 315 -12z"/>
              <path d="M7004 2951 c-34 -10 -88 -30 -119 -46 -65 -31 -61 -39 25 -49 30 -3
114 -25 185 -48 111 -35 143 -42 218 -42 85 -1 90 0 113 27 13 15 24 33 24 39
0 24 -90 97 -144 117 -72 27 -212 28 -302 2z m293 -50 c62 -28 102 -66 85 -83
-20 -20 -122 -11 -248 21 -66 17 -149 34 -183 37 -43 5 -58 10 -48 16 77 43
305 48 394 9z"/>
            </g>
          </svg>
        </div>
        <div className="flex m-auto justify-evenly items-center gap-4 w-full dark:bg-amber-100 bg-amber-900 py-20 lg:flex-row flex-col">
          <div className="w-fit flex px-10">
            <div>
              <h2 className="font-bold font-logo text-4xl dark:text-amber-900 text-amber-100 mb-6">Besoin d'aide ?</h2>
              <h3 className="font-logo text-2xl dark:text-amber-900 text-amber-100 mb-6 ">Contact</h3>
              <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={faEnvelope} className=" dark:text-amber-900 text-amber-100" />
                <p className="text-xl dark:text-amber-900 text-amber-100">folklore.groupe@gmail.com</p>
              </div>
              <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={faPhone} className="dark:text-amber-900 text-amber-100" />
                <p className="text-xl dark:text-amber-900 text-amber-100">+33 7 58 88 93 18</p>
              </div>
              <div className="flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="dark:text-amber-900 text-amber-100" width="0.88em" height="1em" viewBox="0 0 448 512"><path fill="currentColor" d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25v178.72A162.55 162.55 0 1 1 185 188.31v89.89a74.62 74.62 0 1 0 52.23 71.18V0h88a121 121 0 0 0 1.86 22.17A122.18 122.18 0 0 0 381 102.39a121.43 121.43 0 0 0 67 20.14Z" /></svg>
                <p className="text-xl dark:text-amber-900 text-amber-100">@afrah.berrada</p>
              </div>
            </div>
          </div>
          <div className="w-fit flex justify-center">
            <FontAwesomeIcon icon={faHeadset} className="lg:text-[25rem] text-6xl dark:text-amber-900 text-amber-100" />
          </div>
        </div>
      </div>
      <footer className="w-full flex justify-center items-center dark:bg-amber-800 dark:text-amber-100 bg-amber-100 text-amber-900 py-4">
        <p className="font-logo text-xl">© 2024 Folklore</p>
      </footer>
    </>
  );
}