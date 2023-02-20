import Head from "next/head";
import { useState } from "react";

import styles from "@/styles/Home.module.css";

import Search from "@/common/components/search";
import Forecast from "@/common/components/forecast";

import { Container } from "@mui/material";

export default function Home() {
  const [location, setLocation] = useState<any>(null);

  return (
    <>
      <Head>
        <title>Weather Forecast</title>
        <meta name="description" content="7 days Weather Forecast WebApp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Container>
          <Search onSearchChanged={(e: any) => setLocation(e)} />
          {location && location.label !== "" && (
            <Forecast location={location} />
          )}
        </Container>
      </main>
    </>
  );
}
