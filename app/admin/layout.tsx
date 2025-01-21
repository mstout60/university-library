import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import "@/styles/admin.css";
import SideBar from "@/components/admin/sidebar";
import Header from "@/components/admin/header";

const AdminLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session?.user?.id) redirect("/sign-in");
  return (
    <main className="flex min-h-screen w-full flex-row">
      <SideBar session={session} />
      <div className="admin-container">
        <Header session={session} />
        {children}
      </div>
    </main>
  );
};

export default AdminLayout;
