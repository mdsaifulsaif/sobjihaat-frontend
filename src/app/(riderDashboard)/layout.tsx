// export default function DashboardLayout({
//     children,
// }: Readonly<{
//     children: React.ReactNode;
// }>) {
//     return (
//         <div className="dashboard-wrapper">
//             {children}
//         </div>
//     );
// }


// app/(rider)/layout.tsx
"use client";
import { useRiderSocket } from "@/hooks/useRiderSocket";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    useRiderSocket(); // ✅ function body তে, return এর আগে

    return (
        <div className="dashboard-wrapper">
            {children}
        </div>
    );
}