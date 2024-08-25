import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@solana/wallet-adapter-react-ui/styles.css";
import { AppBar } from "@/components/AppBar";
import WalletContextProvider from "@/context/WalletContextProvider";
import { Toaster } from "@/components/ui/toaster";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WalletContextProvider>
      <div className="bg-gray-900 min-h-screen text-white">
        <AppBar />
        <Component {...pageProps} />
        <Toaster />
      </div>
    </WalletContextProvider>
  );
}
