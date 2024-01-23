import Document, {
   DocumentContext,
   Head,
   Html,
   Main,
   NextScript,
} from 'next/document';

class MyDocument extends Document {
   static async getInitialProps(ctx: DocumentContext) {
      const initialProps = await Document.getInitialProps(ctx);
      return initialProps;
   }
   render() {
      return (
         <Html>
            <Head>
               <link rel="stylesheet" href="/favicon.icon" />
            </Head>
            <body>
               <Main />
               <NextScript />
            </body>
         </Html>
      );
   }
}
export default MyDocument;

// pages/_document.js (or _document.tsx for TypeScript)

// import Document, { Html, Head, Main, NextScript } from 'next/document';

// class MyDocument extends Document {
//    render() {
//       return (
// <Html>
//    <Head>
//       <link rel="stylesheet" href="/favicon.icon" />
//    </Head>
//    <body>
//       <Main />
//       <NextScript />
//    </body>
// </Html>
//       );
//    }
// }

// export default MyDocument;
