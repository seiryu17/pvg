"use client";

import { RecoilRoot } from "recoil";
import Search from "./components/search";
import "./style/globals.css";
import Head from "next/head";

export const metadata = {
  title: "PVG Technical Test",
  description: "Image generator using Unsplash API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
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
