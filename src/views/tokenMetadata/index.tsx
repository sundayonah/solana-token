import React, {
   Dispatch,
   FC,
   SetStateAction,
   useCallback,
   useState,
} from 'react';
import { useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { Metadata, PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';
import { AiOutlineClose } from 'react-icons/ai';
import { ClipLoader } from 'react-spinners';
import { notify } from '../../utils/notifications';

// internal import
import { InputView } from '../input';
import Branding from '../../components/Branding';

interface TokenMetadataProps {
   setOpenTokenMetadata: Dispatch<SetStateAction<boolean>>;
}

export const TokenMetadata: FC<TokenMetadataProps> = ({
   setOpenTokenMetadata,
}) => {
   const { connection } = useConnection();
   const [tokenAddress, setTokenAddress] = useState('');
   const [tokenMetadata, setTokenMetadata] = useState(null);
   const [logo, setLogo] = useState(null);
   const [loaded, setLoaded] = useState(false);
   const [isLoading, setisLoading] = useState(false);

   // write function
   const getMetadata = useCallback(
      async (form) => {
         setisLoading(true);

         try {
            const tokenMint = new PublicKey(form);
            console.log('i am here');
            console.log(tokenMint);
            const metadataPDA = PublicKey.findProgramAddressSync(
               [
                  Buffer.from('metadata'),
                  PROGRAM_ID.toBuffer(),
                  tokenMint.toBuffer(),
               ],
               PROGRAM_ID
            )[0];

            const metadataAccount = await connection.getAccountInfo(
               metadataPDA
            );
            const [metadata, _] = await Metadata.deserialize(
               metadataAccount.data
            );

            console.log(metadataAccount);
            console.log(metadata);

            let logoRes = await fetch(metadata.data.uri);
            let logoJson = await logoRes.json();
            let { image } = logoJson;

            setTokenMetadata({ tokenMetadata, ...metadata.data });
            setLogo(image);
            setisLoading(false);
            setLoaded(true);
            setTokenAddress('');
            notify({
               type: 'success',
               message: 'Successfully fetch token metadata',
            });
         } catch (error: any) {
            notify({
               type: 'error',
               message: 'Tokenmetadata failed',
            });
         }
      },
      [tokenAddress]
   );

   console.log(tokenAddress);

   // component

   const CloseModal = () => (
      <a
         onClick={() => setOpenTokenMetadata(false)}
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

                     {!loaded ? (
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
                                 Link your new token
                              </h4>
                              <p className="text-default-300 mx-auto mb-5 max-w-sm">
                                 Your Solana token is seccessfullt created,
                                 Check now in explorer
                              </p>
                              <div className="flex items-start justify-center">
                                 <img
                                    src={'assets/images/logout.svg'}
                                    alt=""
                                    className="h-40"
                                 />
                              </div>
                              <div className="mt-5 w-full text-center">
                                 <div className="text-default-300 text-base font-medium leading-6"></div>
                                 <InputView
                                    name={'Token Address'}
                                    placeholder={'Address'}
                                    clickhandle={(value) =>
                                       setTokenAddress(value)
                                    }
                                 />

                                 <div className="mb-6 text-center">
                                    <button
                                       onClick={() => getMetadata(tokenAddress)}
                                       className="bg-primary-600/90 hover:bg-primary-600 group mt-5 inline-flex w-full items-center justify-center rounded-lg px-6 py-2 text-white backdrop-blur-2xl transition-all duration-500"
                                    >
                                       <span className="fw-bold">
                                          Get Token MetaData
                                       </span>
                                    </button>
                                 </div>
                                 <CloseModal />
                              </div>
                           </div>
                        </div>
                     ) : (
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
                              <div className="flex items-start justify-center">
                                 <img src={logo} alt="" className="h-40" />
                              </div>
                              <div className="mt-5 w-full text-center">
                                 <div className="text-default-300 text-base font-medium leading-6"></div>
                                 <InputView
                                    name={'Token Address'}
                                    placeholder={tokenMetadata?.name}
                                 />
                                 <InputView
                                    name={'Token Symbol'}
                                    placeholder={tokenMetadata?.symbol}
                                 />

                                 <InputView
                                    name={'Token URI'}
                                    placeholder={tokenMetadata?.uri}
                                 />
                                 <div className="mb-6 text-center">
                                    <a
                                       href={tokenMetadata?.uri}
                                       target="_blank"
                                       rel="noreferrer"
                                       className="bg-primary-600/90 hover:bg-primary-600 group mt-5 inline-flex w-full items-center justify-center rounded-lg px-6 py-2 text-white backdrop-blur-2xl transition-all duration-500"
                                    >
                                       <span className="fw-bold">
                                          Open URI{' '}
                                       </span>
                                    </a>
                                 </div>

                                 <div>
                                    <CloseModal />
                                    <a
                                       onClick={() =>
                                          setOpenTokenMetadata(false)
                                       }
                                       className="group mt-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-2xl transition-all duration-500 hover:bg-blue-600/60"
                                    >
                                       <i className="text-2xl text-white group-hover:text-white cursor-pointer">
                                          <AiOutlineClose />
                                       </i>
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </section>
      </>
   );
};
