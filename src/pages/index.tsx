import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import GOL from "../components/GOL";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Game of Life</title>
        <meta name="description" content="Game of Life" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen flex-col justify-center">
        <div className="flex w-screen justify-center">
          <GOL width={800} height={800} />
        </div>
      </div>
    </>
  );
};

export default Home;
