import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

export function getExplorerUrl(
   endpoint: string,
   viewTypeOrItemAddress: 'Inspector' | PublicKey | string,
   itemType = 'addres'
) {
   const getClusterUrlParam = () => {
      let cluster = '';
      if (endpoint === 'localnet') {
         cluster = `custome&customeUrl=${encodeURIComponent(
            'http://127.0.0.1:8899'
         )}`;
      } else if (endpoint === 'https://api.devnet.solana.com') {
         cluster = 'devnet';
      }
      return cluster ? `?cluster=${cluster}` : '';
   };
   return `https://explorer.solana.com/${itemType}/${viewTypeOrItemAddress}${getClusterUrlParam()}`;
}
