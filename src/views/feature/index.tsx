import React, { FC } from 'react';
import { LuArrowRightFromLine } from 'react-icons/lu';
import { MdGeneratingTokens, MdToken } from 'react-icons/md';
import { RiTokenSwapFill } from 'react-icons/ri';
import { RxTokens } from 'react-icons/rx';

export const FeatureView: FC = ({
   setOpenAirdrop,
   setOpenContract,
   setOpenCreateModal,
   setOpenSendTransaction,
   setOpenTokenMetadata,
}) => {
   const features = [
      {
         name: 'Token Generator',
         icon: <MdGeneratingTokens />,
         desc: 'I am writing to express my strong interest in this role. With a proven track record in blockchain and front-end development and a comprehensive skill set encompassing various blockchain technologies, I am confident in my ability to contribute to the success of your organization.',
         function: setOpenCreateModal,
      },
      {
         name: 'Get Airdrop',
         icon: <MdToken />,
         desc: 'I am writing to express my strong interest in this role. With a proven track record in blockchain and front-end development and a comprehensive skill set encompassing various blockchain technologies, I am confident in my ability to contribute to the success of your organization.',
         function: setOpenAirdrop,
      },
      {
         name: 'Transfer Sol',
         icon: <RiTokenSwapFill />,
         desc: 'I am writing to express my strong interest in this role. With a proven track record in blockchain and front-end development and a comprehensive skill set encompassing various blockchain technologies, I am confident in my ability to contribute to the success of your organization.',
         function: setOpenSendTransaction,
      },
      {
         name: 'Token Metadata',
         icon: <RxTokens />,
         desc: 'I am writing to express my strong interest in this role. With a proven track record in blockchain and front-end development and a comprehensive skill set encompassing various blockchain technologies, I am confident in my ability to contribute to the success of your organization.',
         function: setOpenTokenMetadata,
      },
   ];

   return (
      <section id="features" className="py-20">
         <div className="container">
            <div className="mb-10 flex items-end justify-between">
               <div className="mx-auto max-w-2xl text-center">
                  <h2 className="mb-4 text-3xl font-medium capitalize text-white">
                     Choose solana blockchain genera tor
                  </h2>
                  <p className="text-default-200 text-sm font-medium">
                     Now yon can create Solana token <br /> to without code
                     instantly
                  </p>
               </div>
            </div>
            <div className="bg-default-950/40 flex flex-wrap items-center rounded-3xl backdrop-blur-3xl">
               {features.map((feature, index) => (
                  <div
                     key={index}
                     className={`w-auto grow border-b border-white/10 md:w-1/2 ${
                        index == 0
                           ? 'md:border-e'
                           : index == 1
                           ? ''
                           : index == 2
                           ? 'md:border-e md:border-b-0'
                           : ''
                     }`}
                  >
                     <div className="p-8 sm:p-10">
                        <div className="bg-primary/10 text-primary mb-10 inline-flex h-16 w-16 items-center justify-center rounded-xl">
                           <i data-lucide="framer">{feature.icon}</i>
                        </div>
                        <h2 className="mb-4 text-2xl font-medium text-white">
                           {feature.name}
                        </h2>
                        <p className="text-default-200 mb-6 text-base">
                           {feature.desc}
                        </p>
                        <a className="hover:bg-primary inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-2 text-white transition-all duration-300">
                           Use Tools
                           <i>
                              <LuArrowRightFromLine />
                           </i>
                        </a>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};
