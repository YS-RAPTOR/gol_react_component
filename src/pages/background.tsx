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
            <GOLComponent />
        </>
    );
};

export default Home;
