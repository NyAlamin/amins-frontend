"use client";

import { useAuth } from "@/context/auth-context";
import AdminSidebar from "@/components/dashboard/admin-sidebar";
import CustomerSidebar from "@/components/dashboard/customer-sidebar";
import Loading from "@/components/ui/loading";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  // While the auth check is in flight, or once it's resolved with no user
  // (the auth context will redirect to /login), show a spinner instead of
  // flashing the dashboard shell before the redirect kicks in.
  if (loading || !user) return <Loading />;

  const isCustomer = user?.role?.name === "CUSTOMER";

  return (
    <div className="min-h-screen bg-brand-mist">
      {isCustomer ? <CustomerSidebar /> : <AdminSidebar />}
      <main className={`md:ml-[230px] pt-16 md:pt-0 min-h-screen`}>
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}