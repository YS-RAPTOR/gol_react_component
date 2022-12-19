import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import GOLComponent from "../components/GOL";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Game of Life</title>
                <meta name="description" content="Game of Life" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <iframe src="/background" className="absolute top-0 left-0 w-full h-full -z-10" />
            <div className="flex h-screen flex-col justify-center">
                <div className="flex w-screen justify-center">
                    <canvas width={800} height={800} />
                </div>
            </div>
        </>
    );
};

export default Home;
