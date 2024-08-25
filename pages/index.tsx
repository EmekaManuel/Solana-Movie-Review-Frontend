import { Form } from "@/components/Form";
import { MovieList } from "@/components/MovieList";
import Head from "next/head";

const Home = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col items-center">
      <Head>
        <title>Movie Reviews</title>
      </Head>
      <div className="w-full items-center flex flex-col  px-4 mt-8">
        <h1 className="text-2xl font-semibold mb-4">Add a review</h1>
        <div className="w-[700px] items-center flex justify-center ">
          <Form />
        </div>
        <h1 className="text-2xl font-semibold mt-8 mb-4">Existing Reviews</h1>
        <div className=" ">
          <MovieList />
        </div>
      </div>
    </div>
  );
};

export default Home;
