import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { categories } from "@/lib/tools";

export function ToolsSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-glass-border bg-sidebar">
      <SidebarContent className="pt-16">
        {categories.map((cat) => {
          const CatIcon = cat.icon;
          const hasActive = cat.tools.some((t) => location.pathname === t.path);
          return (
            <SidebarGroup key={cat.id}>
              <SidebarGroupLabel className="text-muted-foreground">
                <CatIcon className="w-4 h-4 mr-2 shrink-0" />
                {!collapsed && <span>{cat.name}</span>}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {cat.tools.map((tool) => {
                    const ToolIcon = tool.icon;
                    const isActive = location.pathname === tool.path;
                    return (
                      <SidebarMenuItem key={tool.id}>
                        <SidebarMenuButton asChild isActive={isActive}>
                          <Link to={tool.path} className="flex items-center gap-2">
                            <ToolIcon className="w-4 h-4 shrink-0" />
                            {!collapsed && <span className="truncate">{tool.name}</span>}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}
