"use client"
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Footer } from "../components/Footer";

export function ClientLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname.startsWith('/admin');

    if (isAdmin) {
        return <>{children}</>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}
