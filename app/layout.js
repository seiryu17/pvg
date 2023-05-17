"use client";

import { RecoilRoot } from "recoil";
import Search from "./components/search";
import "./style/globals.css";
import Head from "next/head";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>PVG Technical Test</title>
        <meta name="description" content="Image generator using Unsplash API" />
      </Head>
      <RecoilRoot>
        <body>
          <nav className="bg-zinc-300 p-4">
            <Search />
          </nav>
          {children}
        </body>
      </RecoilRoot>
    </html>
  );
}
