import { Outlet } from 'react-router-dom';

/* ─── RootLayout ─────────────────────────────────────────────
   Shared wrapper for all pages.
   Place here: Header, Footer, global navigation, etc.

   Outlet = the active page renders here.
   ─────────────────────────────────────────────────────────── */
export default function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <Header /> */}
      <main className="flex-1">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
