import "./app.css";
import { Inter } from "next/font/google";
import ActiveSectionContextProvider from "@/context/active-section-context";
import ActiveSectionContextProviderHome from "@/context/active-section-context-home";
import FooterP from "@/components/PortfolioComponent/footer";
//import ThemeSwitch from "@/components/PortfolioComponent/theme-switch";
//import ThemeContextProvider from "@/context/theme-context";
import { ThemeProvider } from "@/components/common/theme-provider";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@/context/UserContext";
import { Web3ModalProvider } from "@/context/Web3Modal";
import { TournamentProvider } from "@/context/tournamentContext";
import { TournamentsProvider } from "@/context/tournamentsContext";

export const metadata = {
  title: "Tournament Hub",
  description: "THe best tournament organizer in the world.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Web3ModalProvider>
    <UserProvider>
      <TournamentProvider>
        <TournamentsProvider>
    <html lang="en" className="!scroll-smooth">
      <body >
        {/* <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]"></div>
        <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div> */}

        {/* <ThemeContextProvider> */}
        <ThemeProvider>
          <ActiveSectionContextProvider>
          <ActiveSectionContextProviderHome>
            {children}
            <FooterP />

            <Toaster position="top-right" />
            </ActiveSectionContextProviderHome>
          </ActiveSectionContextProvider>
        </ThemeProvider>
        {/* </ThemeContextProvider> */}
      </body>
    </html>
    </TournamentsProvider>
    </TournamentProvider>
    </UserProvider>
    </Web3ModalProvider>
  );
}
