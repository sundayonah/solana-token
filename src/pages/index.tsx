import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import {
   HomeView,
   //  TokenMetadata,
   //  AirdropView,
   //  ContactView,
   //  CreateView,
   //  DonateView,
   //  FaqView,
   FeatureView,
   //  InputView,
   //  OfferView,
   ToolView,
} from '../views';

const Home: NextPage = (props) => {
   const [openCreateModal, setOpenCreateModal] = useState(false);
   const [openTokenMetadata, setOpenTokenMetadata] = useState(false);
   const [openContract, setOpenContract] = useState(false);
   const [openAirDrop, setOpenAirDrop] = useState(false);
   const [openSendTransaction, setOpenSendTransaction] = useState(false);

   return (
      <>
         <Head>
            <title>Solana Token Creator</title>
            <meta
               name="Solana token creator"
               content="Build and create solana token"
            />
         </Head>

         <HomeView setOpenCreateModal={setOpenCreateModal} />
         <ToolView
            setOpenAirdrop={setOpenAirDrop}
            setOpenContract={setOpenContract}
            setOpenCreateModal={setOpenCreateModal}
            setOpenSendTransaction={setOpenSendTransaction}
            setOpenTokenMetadata={setOpenTokenMetadata}
         />
         <FeatureView
            setOpenAirdrop={setOpenAirDrop}
            setOpenContract={setOpenContract}
            setOpenCreateModal={setOpenCreateModal}
            setOpenSendTransaction={setOpenSendTransaction}
            setOpenTokenMetadata={setOpenTokenMetadata}
         />
         {/*

         <OfferView />
         <FaqView />


         {openCreateModal && (
            <div className="new_loader relative h-full bg-slate-900">
               <CreateView setOpenCreateModal={setOpenCreateModal} />
            </div>
         )}

         {openTokenMetadata && (
            <div className="new_loader relative h-full bg-slate-900">
               <TokenMetadata setOpenTokenMetadata={setOpenTokenMetadata} />
            </div>
         )}

         {openContract && (
            <div className="new_loader relative h-full bg-slate-900">
               <ContactView setOpenContract={setOpenContract} />
            </div>
         )}

         {openAirDrop && (
            <div className="new_loader relative h-full bg-slate-900">
               <AirdropView setOpenAirdrop={setOpenAirDrop} />
            </div>
         )}

         {openSendTransaction && (
            <div className="new_loader relative h-full bg-slate-900">
               <DonateView setOpen={setOpenSendTransaction} />
            </div>
         )} */}
      </>
   );
};

export default Home;
