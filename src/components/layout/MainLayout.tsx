import Navbar  from "@/components/layout/Navbar";
import Footer  from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * MainLayout — Server Component
 * Composes SmoothScrollProvider (client) + Navbar (client) around page content.
 * Also renders ambient accent-blur orbs as fixed decorative elements.
 */
export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <SmoothScrollProvider>
      {/* Ambient decorative orbs */}
      <div aria-hidden style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        {/* Top-right orb */}
        <div
          className="accent-orb"
          style={{
            width:    "600px",
            height:   "600px",
            top:      "-180px",
            right:    "-160px",
            background: "radial-gradient(circle, rgba(229,64,79,0.14) 0%, transparent 70%)",
          }}
        />
        {/* Bottom-left orb */}
        <div
          className="accent-orb"
          style={{
            width:    "500px",
            height:   "500px",
            bottom:   "-120px",
            left:     "-140px",
            background: "radial-gradient(circle, rgba(18,72,152,0.10) 0%, transparent 70%)",
          }}
        />
      </div>

      <Navbar />

      <main
        style={{
          position:   "relative",
          zIndex:     1,
          paddingTop: "var(--nav-h)",
        }}
      >
        {children}
      </main>

      <Footer />
    </SmoothScrollProvider>
  );
}
