import { type NextPage } from "next";
import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import GOLComponent from "../components/GOL";

const Home: NextPage = () => {

    useEffect(() => {
        const background = document.getElementById("back") as HTMLIFrameElement;
        if (!background) return;
    }, []);


    return (
        <>
            <Head>
                <title>Game of Life</title>
                <meta name="description" content="Game of Life" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <GOLComponent />
            <div className="flex h-screen flex-col justify-center">
                <div className="flex w-screen justify-center">
                    <div className="w-28 h-28 bg-white p-0 m-0" />
                </div>
            </div>
        </>
    );
};

export default Home;
