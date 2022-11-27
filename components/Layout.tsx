import React from 'react';
import Head from 'next/head';
import NavBar from './NavBar';

export default function Layout({ title, children }: any) {
  return (
    <>
      <Head>
        <title>{title ?? 'Amazona '}</title>
        <meta name="description" content="Ecommerce website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen justify-between">
        <header>
          <NavBar />
        </header>
        <main className="container m-auto mt-4 px-2">{children}</main>
        <footer className="flex justify-center items-center h-10 shadow-inner">
          <p>copyright © 2020 NaN Tuto</p>
        </footer>
      </div>
    </>
  );
}
