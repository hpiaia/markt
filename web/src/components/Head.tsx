import NextHead from 'next/head';
import { FC } from 'react';

export const Head: FC = () => (
  <NextHead>
    <title>Markt.Chat - The chat platform that communicates with the market</title>
    <link rel="icon" href="/logo.svg" />
    <link rel="mask-icon" href="mask-icon.svg" color="#4F46E5" />
  </NextHead>
);
