import * as React from "react";
import Header from "./header";
import Footer from "./Footer";
import RequestForm from "./RequestForm";
import { FormProvider } from "../context/FormContext";

const Layout = ({ children }) => {
  React.useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <FormProvider>
      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          background: "var(--field-bg)",
          overflowX: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 1,
            opacity: 0.5,
            mixBlendMode: "overlay",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
          }}
        />
        <Header />
        <main style={{ position: "relative", zIndex: 2 }}>{children}</main>
        <Footer />
        <RequestForm />
      </div>
    </FormProvider>
  );
};

export default Layout;
