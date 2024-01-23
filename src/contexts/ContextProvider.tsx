import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';

// import {
//    ConnectionProvider,
//    WalletProvider,
// } from '@solana/wallet-adapter-react';

import {
   ConnectionProvider as WalletAdapterConnectionProvider, // Renamed the import alias
   WalletProvider,
} from '@solana/wallet-adapter-react';

import {
   PublicKey,
   SystemProgram,
   Cluster,
   clusterApiUrl,
} from '@solana/web3.js';
import { WalletModalProvider as ReactUIWalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
   PhantomWalletAdapter,
   SolflareWalletAdapter,
   SolletExtensionWalletAdapter,
   SolletWalletAdapter,
   TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';

import {
   FC,
   ReactNode,
   createContext,
   useContext,
   useEffect,
   useState,
   useMemo,
   useCallback,
} from 'react';
import { AutoConnectProvider, useAutoConnect } from './AutoConnectProvider';
import { notify } from '../utils/notifications';
import {
   NetworkConfigurationProvider,
   useNetworkConfiguration,
} from './NetworkConfigurationProvider';

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
   const { autoConnect } = useAutoConnect();
   const { networkConfiguration } = useNetworkConfiguration();
   const network = networkConfiguration as WalletAdapterNetwork;

   const originalendPoint = useMemo(() => clusterApiUrl(network), [network]);

   let endpoint;

   if (network == 'mainnet-beta') {
      endpoint = 'URL';
   } else if (network == 'devnet') {
      endpoint = originalendPoint;
   } else {
      endpoint = originalendPoint;
   }

   const wallets = useMemo(
      () => [
         new PhantomWalletAdapter(),
         new SolflareWalletAdapter(),
         new SolletExtensionWalletAdapter(),
         new SolletWalletAdapter(),
         new TorusWalletAdapter(),
      ],
      [network]
   );

   const onError = useCallback((error: WalletError) => {
      notify({
         type: 'error',
         message: error.message
            ? `${error.name} : ${error.message}`
            : error.name,
      });
      console.error(error);
   }, []);

   return (
      <WalletAdapterConnectionProvider endpoint={endpoint}>
         <WalletProvider
            wallets={wallets}
            onError={onError}
            autoConnect={autoConnect}
         >
            <ReactUIWalletModalProvider>{children}</ReactUIWalletModalProvider>
         </WalletProvider>
      </WalletAdapterConnectionProvider>
   );
};

export const ConnectionProvider: FC<{ children: ReactNode }> = ({
   children,
}) => {
   return (
      <>
         <NetworkConfigurationProvider>
            <AutoConnectProvider>
               <WalletContextProvider>{children}</WalletContextProvider>
            </AutoConnectProvider>
         </NetworkConfigurationProvider>
      </>
   );
};
