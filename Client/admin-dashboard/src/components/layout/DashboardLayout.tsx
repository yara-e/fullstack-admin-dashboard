import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
 
import {Sheet, SheetContent } from '@/components/ui/sheet';
 

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden">

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Drawer */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <Sidebar closeSidebar={() => setOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main Area */}
      <div className="flex flex-col flex-1">

        <Navbar openSidebar={() => setOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;
