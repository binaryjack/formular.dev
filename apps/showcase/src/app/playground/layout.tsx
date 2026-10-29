"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: "React (@formular/atomos)", path: "/playground/react", doc: "https://react.dev" },
    { name: "Vue.js (Composition API)", path: "/playground/vue", doc: "https://vuejs.org" },
    { name: "Svelte (Stores)", path: "/playground/svelte", doc: "https://svelte.dev" },
    { name: "Solid JS (Signals)", path: "/playground/solid", doc: "https://solidjs.com" },
    { name: "Synetics (Signals)", path: "/playground/synetics", doc: "https://github.com/binaryjack/synetics.dev" },
    { name: "Angular (Reactive)", path: "/playground/angular", doc: "https://angular.io" },
    { name: "Vanilla JS (DOM API)", path: "/playground/vanilla", doc: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model" },
  ];

  const uiVendors = [
    { name: "Shadcn UI", path: "/playground/shadcn", doc: "https://ui.shadcn.com" },
    { name: "Material UI (MUI)", path: "/playground/mui", doc: "https://mui.com" },
    { name: "Ant Design", path: "/playground/ant-design", doc: "https://ant.design" },
    { name: "Chakra UI", path: "/playground/chakra", doc: "https://chakra-ui.com" },
  ];

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full p-4 md:p-8 gap-8">
      <div className="flex flex-col md:flex-row gap-8 w-full">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-[#0c0e14] border border-white/[0.03] rounded-xl p-5 shadow-xl space-y-4 md:sticky md:top-20">
            <div className="text-[11px] font-mono tracking-wider text-neutral-400 uppercase">Frameworks</div>
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.path || (item.path === "/playground/react" && pathname === "/playground");
                return (
                  <div key={item.path} className="flex items-center gap-1.5">
                    <Link
                      href={item.path}
                      className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all block border ${
                        isActive
                          ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/25 shadow-sm font-semibold"
                          : "text-neutral-400 border-transparent hover:text-neutral-100 hover:bg-white/[0.02]"
                      }`}
                    >
                      {item.name}
                    </Link>
                    <a href={item.doc} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-indigo-400 p-1.5" title="Official Documentation">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                  </div>
                );
              })}
            </nav>
            
            <div className="text-[11px] font-mono tracking-wider text-neutral-400 uppercase pt-3 border-t border-white/[0.03]">UI Libraries</div>
            <nav className="flex flex-col gap-1">
              {uiVendors.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <div key={item.path} className="flex items-center gap-1.5">
                    <Link
                      href={item.path}
                      className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all block border ${
                        isActive
                          ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/25 shadow-sm font-semibold"
                          : "text-neutral-400 border-transparent hover:text-neutral-100 hover:bg-white/[0.02]"
                      }`}
                    >
                      {item.name}
                    </Link>
                    <a href={item.doc} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-indigo-400 p-1.5" title="Official Documentation">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                  </div>
                );
              })}
            </nav>
            <div className="border-t border-white/[0.03] pt-3 text-[11px] text-neutral-400 space-y-1 leading-relaxed">
              <span className="font-semibold text-neutral-300 block">Framework Agnostic</span>
              Formular core executes independently of the view layer with sub-millisecond reactive channels.
            </div>
          </div>
        </aside>

        {/* Main playground content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
