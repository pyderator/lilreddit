import Head from "next/head";
import Layout from "../components/layout";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Lil Reddit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-black">
        <h1 className="text-purple-900 text-4xl font-bold">
          Taidwind YIPEEEEE!!!!
        </h1>
      </div>
    </Layout>
  );
}
