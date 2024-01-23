import { useLocalStorage } from '@solana/wallet-adapter-react';

import { FC, ReactNode, createContext, useContext } from 'react';

export interface NetwotkConfigurationState {
   networkConfiguration: string;
   setNetworkConfiguration(netwotkConfiguration: string): void;
}

export const NetworkConfigurationContext =
   createContext<NetwotkConfigurationState>({} as NetwotkConfigurationState);

export function useNetworkConfiguration(): NetwotkConfigurationState {
   return useContext(NetworkConfigurationContext);
}

export const NetworkConfigurationProvider: FC<{ children: ReactNode }> = ({
   children,
}) => {
   const [networkConfiguration, setNetworkConfiguration] = useLocalStorage(
      'network',
      'devnet'
   );

   return (
      <NetworkConfigurationContext.Provider
         value={{ networkConfiguration, setNetworkConfiguration }}
      >
         {children}
      </NetworkConfigurationContext.Provider>
   );
};
