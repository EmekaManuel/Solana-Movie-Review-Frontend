import { FC, useState, useEffect } from "react";
import * as web3 from "@solana/web3.js";
import { Card } from "@/components/MovieCard";
import { MovieCoordinator } from "@/coordinator/MovieCoordinator";
import { Movie } from "@/models/Movie";

export const MovieList: FC = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
  const [movies, setMovies] = useState<Movie[]>([]); // Specify the type here
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    MovieCoordinator.fetchPage(connection, page, 5, search, search !== "").then(
      setMovies
    );
  }, [connection, page, search]);

  return (
    <div className="py-5 flex flex-col w-fullitems-center justify-center">
      <input
        id="search"
        className="w-[300px] p-2 mb-4 bg-gray-700 border border-gray-600 rounded text-gray-400"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
      />

      {movies.map((movie, i) => (
        <Card key={i} movie={movie} />
      ))}

      <div className="flex justify-between mt-4">
        {page > 1 && (
          <button
            onClick={() => setPage(page - 1)}
            className="p-2 bg-blue-600 rounded"
          >
            Previous
          </button>
        )}
        {movies.length === 5 && (
          <button
            onClick={() => setPage(page + 1)}
            className="p-2 bg-blue-600 rounded"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};
