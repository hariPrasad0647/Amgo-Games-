import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import { AppSidebar } from "./AppSidebar";
import { UserDropdown } from "./UserDropdown";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/campaigns": "Campaigns",
  "/jobs": "Jobs",
  
};

export function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const location = useLocation();

  const baseRoute = "/" + (location.pathname.split("/")[1] || "");
  const title = pageTitles[baseRoute] || "Campaign Detail";

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <AppSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-6">
          <h1 className="text-base font-semibold text-foreground">{title}</h1>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 w-64 rounded-md border border-input bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 transition-shadow"
              />
            </div>
            <UserDropdown />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
