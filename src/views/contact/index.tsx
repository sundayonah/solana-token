import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { AiOutlineClose } from 'react-icons/ai';
import { notify } from '../../utils/notifications';

import Branding from '../../components//Branding';
import { ClipLoader } from 'react-spinners';

interface ContactViewProps {
   setOpenContract: Dispatch<SetStateAction<boolean>>;
}

export const ContactView: FC<ContactViewProps> = ({ setOpenContract }) => {
   const [isLoading, setIsLoading] = useState(false);
   const [state, handleSubmit] = useForm('xkndodez');
   if (state.succeeded) {
      setOpenContract(false);
      notify({
         type: 'success',
         message: 'Thanks for submittimg your message.',
      });
   }

   const CloseModal = () => (
      <a
         onClick={() => setOpenContract(false)}
         className="group mt-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-2xl transition-all duration-500 hover:bg-blue-600/60"
      >
         <i className="text-2xl text-white group-hover:text-white cursor-pointer">
            <AiOutlineClose />
         </i>
      </a>
   );

   return (
      <>
         {isLoading && (
            <div className="absolute top-0 left-0 z-50 flex h-screen w-full items-center justify-center bg-black/[.3] backdrop-blur-[10px]">
               <ClipLoader />
            </div>
         )}

         <section className="flex w-full items-center py-6 px-0 lg:h-screen lg:p-10">
            <div className="container">
               <div className="bg-defualt-950/40 mx-auto max-w-5xl overflow-hidden rounded-2xl backdrop-blur-2xl">
                  <div className="grid gap-10 lg:grid-cols-2">
                     {/* first section */}
                     <Branding
                        image="auth-img"
                        title="To Build your solana token Creator"
                        message="Create your first solana project, Create your first solana project, Create your first solana project.  "
                     />
                     {/* second section */}

                     <div className="lg:ps-0 flex h-full flex-col p-10">
                        <div className="pb-10">
                           <a className="flex">
                              <img
                                 src="assets/images/logo1.png"
                                 alt=""
                                 className="h-10"
                              />
                           </a>
                        </div>
                        <div className="my-auto pb-6 text-center">
                           <h4 className="mb-4 text-2xl font-bold text-white">
                              Send email to us for more details.
                           </h4>
                           <p className="text-default-300 mx-auto mb-5 max-w-sm">
                              Send your message so we can provide you more
                              details.
                           </p>

                           <div className="text-start">
                              {/* <div className="text-default-300 text-base font-medium leading-6"></div> */}
                              <form onSubmit={handleSubmit}>
                                 <div className="mb-4">
                                    <label
                                       htmlFor="email"
                                       className="text-base/normal text-default-200 mb-2 block font-semibold"
                                    >
                                       Email
                                    </label>
                                    <input
                                       type="email"
                                       id="email"
                                       name="email"
                                       placeholder="email"
                                       className="border-default-200 block w-full rounded border-white/10 bg-transparent py-1.5 px-3 text-white/80 focus:border-white/25 focus:ring-transparent"
                                    />
                                 </div>
                                 <ValidationError
                                    prefix="Email"
                                    field="email"
                                    errors={state.errors}
                                 />

                                 <textarea
                                    name="message"
                                    id="message"
                                    className="border-default-200 relative block w-full rounded border-white/10 bg-transparent py-1.5 px-3 text-white/80 focus:border-white/25 focus:ring-transparent"
                                 ></textarea>
                                 <ValidationError
                                    prefix="Message"
                                    field="message"
                                    errors={state.errors}
                                 />
                                 <div className="mb-6 text-center">
                                    <button
                                       type="submit"
                                       disabled={state.submitting}
                                       className="bg-primary-600/90 hover:bg-primary-600 group mt-5 inline-flex w-full items-center justify-center rounded-lg px-6 py-2 text-white backdrop-blur-2xl transition-all duration-500"
                                    >
                                       <span className="fw-bold">
                                          Send Message
                                       </span>
                                    </button>
                                 </div>

                                 <div className="flex justify-center items-start">
                                    <CloseModal />
                                 </div>
                              </form>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
};
