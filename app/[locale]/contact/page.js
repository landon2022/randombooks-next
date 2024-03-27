import Contact from "../components/contact";
import LanDic from "../LanDic";

export async function generateMetadata({ params: { locale } }) {
  return {
    title: LanDic[locale].contact,
  };
}
export default function FAQs() {
  return <Contact />;
}

// "use client";

// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import LanDic from "../LanDic";
// import { useLocale } from "next-intl";

// // export async function generateMetadata({ params: { locale } }) {
// //   return {
// //     title: LanDic[locale].contact,
// //   };
// // }

// export default function Contact() {
//   let locale = useLocale();
//   const MySwal = withReactContent(Swal);
//   const { register, handleSubmit } = useForm();
//   const [button, setButton] = useState(
//     <button
//       className="btn btn-secondary btn-lg"
//       onClick={handleSubmit(onSubmit)}
//     >
//       {LanDic[locale].contact_submit}
//     </button>
//   );
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   async function onSubmit(data) {
//     setButton(
//       <button
//         className="btn btn-secondary btn-lg"
//         onClick={handleSubmit(onSubmit)}
//         disabled
//       >
//         {" "}
//         <span
//           className="spinner-grow spinner-grow-sm"
//           aria-hidden="true"
//         ></span>
//         <span role="status"> {LanDic[locale].contact_submit}</span>
//       </button>
//     );
//     const newContact = {
//       name: data.name,
//       email: data.email,
//       message: data.message,
//     };
//     console.log(newContact);
//     let response = await fetch("/api/contact", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newContact),
//     });
//     console.log(response);
//     if (response.status === 500) {
//       MySwal.fire("Oops!", `${LanDic[locale].server_error}`, "error").then(
//         () => {
//           setButton(
//             <button
//               className="btn btn-secondary btn-lg"
//               onClick={handleSubmit(onSubmit)}
//             >
//               {LanDic[locale].contact_submit}
//             </button>
//           );
//         }
//       );
//       return;
//     }
//     let result = await response.json();
//     console.log(result);

//     if (result.status === "success") {
//       console.log("sent test point");
//       setButton(
//         <button
//           className="btn btn-secondary btn-lg"
//           onClick={handleSubmit(onSubmit)}
//         >
//           {LanDic[locale].contact_submit}
//         </button>
//       );
//       setForm({
//         name: "",
//         email: "",
//         message: "",
//       });
//       MySwal.fire("", `${LanDic[locale].message_sent}`, "success").then(
//         () => {}
//       );
//     }
//     if (result.status === "error") {
//       console.log("sent error test point");
//       console.log(result.errorobj);
//       setButton(
//         <button
//           className="btn btn-secondary btn-lg"
//           onClick={handleSubmit(onSubmit)}
//         >
//           {LanDic[locale].contact_submit}
//         </button>
//       );
//       MySwal.fire("", `${LanDic[locale].server_error}`, "error").then(() => {});
//     }
//   }

//   function updateForm(value) {
//     return setForm((prev) => {
//       return { ...prev, ...value };
//     });
//   }

//   return (
//     <div className="container">
//       <div className="main-container">
//         <main>
//           <br />
//           <br />
//           <h2>{LanDic[locale].contact}</h2>
//           <div className="universal-description">
//             <section>
//               <h3>{LanDic[locale].contact_h3}</h3>
//               <p>{LanDic[locale].contact_p}</p>
//             </section>

//             <div className="container py-4">
//               {/* Bootstrap 5 starter form */}
//               <form id="contactForm">
//                 {/* Name input */}
//                 <div className="mb-3">
//                   <label className="form-label" htmlFor="name">
//                     {LanDic[locale].contact_name}
//                   </label>
//                   {/* <input
//                     className="form-control"
//                     id="name"
//                     type="text"
//                     placeholder={LanDic.en.contact_name}
//                     data-sb-validations="required"
//                   /> */}
//                   <input
//                     {...register("name", {
//                       required: true,
//                       onChange: (e) => updateForm({ name: e.target.value }),
//                     })}
//                     value={form.name}
//                     type="text"
//                     className="form-control"
//                     id="name"
//                     placeholder={LanDic[locale].contact_name}
//                   />
//                 </div>
//                 {/* Email address input */}
//                 <div className="mb-3">
//                   <label className="form-label" htmlFor="emailAddress">
//                     {LanDic[locale].contact_email}
//                   </label>
//                   {/* <input
//                     className="form-control"
//                     id="emailAddress"
//                     type="email"
//                     placeholder={LanDic.en.contact_email}
//                     data-sb-validations="required, email"
//                   /> */}
//                   <input
//                     {...register("email", {
//                       required: true,
//                       onChange: (e) => updateForm({ email: e.target.value }),
//                     })}
//                     value={form.email}
//                     type="email"
//                     className="form-control"
//                     id="emailAddress"
//                     placeholder={LanDic[locale].contact_email}
//                   />
//                 </div>
//                 {/* Message input */}
//                 <div className="mb-3">
//                   <label className="form-label" htmlFor="message">
//                     {LanDic[locale].contact_message}
//                   </label>
//                   {/* <textarea
//                     className="form-control"
//                     id="message"
//                     type="text"
//                     placeholder={LanDic.en.contact_message}
//                     style={{ height: "10rem" }}
//                     data-sb-validations="required"
//                     defaultValue={""}
//                   /> */}
//                   <textarea
//                     {...register("message", {
//                       required: true,
//                       onChange: (e) => updateForm({ message: e.target.value }),
//                     })}
//                     value={form.message}
//                     className="form-control"
//                     id="message"
//                     style={{ height: "10rem" }}
//                     placeholder={LanDic[locale].contact_message}
//                   />
//                 </div>
//                 {/* Form submit button */}
//                 <div className="d-grid">
//                   {/* <button className="btn btn-secondary btn-lg" type="submit">
//                     {LanDic.en.contact_submit}
//                   </button> */}
//                   {button}
//                 </div>
//               </form>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
