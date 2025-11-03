import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";

import App from "./App.tsx";
import { config } from "./wagmi.ts";

import "./index.css";

const queryClient = new QueryClient();

// Fungsi untuk memanggil sdk.actions.ready() dan setTitle()
function callFarcasterReady() {
  if (window.sdk && window.sdk.actions) {
    try {
      window.sdk.actions.ready();
      // Set Title hanya jika fungsi setTitle ada
      if (window.sdk.actions.setTitle) {
        window.sdk.actions.setTitle("Fortune Cookie");
      }
      console.log("Farcaster SDK Ready dipanggil dari main.tsx!");
    } catch (e) {
      console.error("Gagal memanggil sdk.actions.ready():", e);
    }
  }
}

// Lakukan rendering React
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);

// PANGGIL FUNGSI READY SETELAH APLIKASI DIRENDER.
// Ini memastikan SDK sudah ter-load dan komponen React utama sudah siap.
callFarcasterReady();

// Tambahan opsional: Anda juga bisa menambahkan fallback
// jika ada delay pada pemuatan aset lain di App.tsx
// window.addEventListener("load", callFarcasterReady);