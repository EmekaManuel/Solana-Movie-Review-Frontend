import { FC } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

// removing hydration error
const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  { ssr: false }
);

export const AppBar: FC = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800">
      <Image src="/solanaLogo.png" alt="Solana Logo" height={25} width={200} />
      <span className="text-white font-semibold">Movie Reviews</span>
      <WalletMultiButton />
    </div>
  );
};
