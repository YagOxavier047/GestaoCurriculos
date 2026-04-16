'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, List, Plus, Home, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname?.startsWith(path);
  };

  const linkClasses = (path: string) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium ${
      isActive(path)
        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
        : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container max-w-6xl mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 font-bold text-xl group">
          <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg group-hover:shadow-lg transition-shadow">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <span className="text-slate-900">Currículo<span className="text-blue-600">Pro</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <Link href="/" className={linkClasses('/')}>
            <Home className="h-4 w-4" /> Início
          </Link>
          <Link href="/sistema/curiculos/visualizar" className={linkClasses('/sistema/curiculos/visualizar')}>
            <List className="h-4 w-4" /> Currículos
          </Link>
          <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white ml-2">
            <Link href="/sistema/curiculos/cadastrar">
              <Plus className="h-4 w-4 mr-2" /> Novo Currículo
            </Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 hover:bg-blue-50 rounded-lg transition-colors"
        >
          {mobileOpen ? (
            <X className="h-6 w-6 text-slate-600" />
          ) : (
            <Menu className="h-6 w-6 text-slate-600" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden border-t border-blue-100 bg-slate-50">
          <nav className="container max-w-6xl mx-auto px-4 py-4 flex flex-col gap-2">
            <Link href="/" className={linkClasses('/')}>
              <Home className="h-4 w-4" /> Início
            </Link>
            <Link href="/sistema/curiculos/visualizar" className={linkClasses('/sistema/curiculos/visualizar')}>
              <List className="h-4 w-4" /> Currículos
            </Link>
            <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-700 w-full">
              <Link href="/sistema/curiculos/cadastrar">
                <Plus className="h-4 w-4 mr-2" /> Novo Currículo
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}