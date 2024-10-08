import { FC, useState } from "react";
import * as web3 from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useToast } from "@/components/ui/use-toast"; // Ensure this path is correct

import { Movie } from "@/models/Movie";

const MOVIE_REVIEW_PROGRAM_ID = "CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN";

export const Form: FC = () => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const { toast } = useToast();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const movie = new Movie(title, rating, description);
    handleTransactionSubmit(movie);
  };

  const handleTransactionSubmit = async (movie: Movie) => {
    if (!publicKey) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to submit a review.",
        variant: "destructive",
      });
      return;
    }

    const buffer = movie.serialize();
    const transaction = new web3.Transaction();

    const [pda] = web3.PublicKey.findProgramAddressSync(
      [publicKey.toBuffer(), Buffer.from(movie.title)],
      new web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID)
    );

    const instruction = new web3.TransactionInstruction({
      keys: [
        { pubkey: publicKey, isSigner: true, isWritable: false },
        { pubkey: pda, isSigner: false, isWritable: true },
        {
          pubkey: web3.SystemProgram.programId,
          isSigner: false,
          isWritable: false,
        },
      ],
      data: buffer,
      programId: new web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID),
    });

    transaction.add(instruction);

    try {
      const txid = await sendTransaction(transaction, connection);
      toast({
        title: "Transaction Submitted",
        description: `Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`,
        variant: "success",
      });
      console.log(
        `Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`
      );
    } catch (e) {
      toast({
        title: "Transaction Failed",
        description: JSON.stringify(e),
        variant: "destructive",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="py-4 px-6 max-w-[450px] flex items-center justify-center flex-col border border-gray-700 rounded-lg bg-gray-800 text-white"
    >
      <div className="mb-4">
        <label className="block text-gray-400 mb-2" htmlFor="title">
          Movie Title
        </label>
        <input
          id="title"
          className="p-2 w-[400px] bg-gray-700 border border-gray-600 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400 mb-2" htmlFor="review">
          Add Your Review
        </label>
        <textarea
          id="review"
          className="w-[400px] p-2 bg-gray-700 border border-gray-600 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400 mb-2" htmlFor="rating">
          Rating
        </label>
        <input
          type="number"
          id="rating"
          className="w-[400px] p-2 bg-gray-700 border border-gray-600 rounded"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          min={1}
          max={5}
        />
      </div>
      <button
        type="submit"
        className="w-[400px] p-2 bg-green-600 hover:bg-green-700 rounded"
      >
        Submit Review
      </button>
    </form>
  );
};
