'use client';

import Link from 'next/link';
import { FileText, Code, Inbox, Mail, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-blue-100 bg-gradient-to-b from-slate-50 to-slate-100 mt-16">
      {/* Main Footer Content */}
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-slate-900">Currículo<span className="text-blue-600">Pro</span></span>
            </div>
            <p className="text-sm text-slate-600">Plataforma profissional para gerenciar seus currículos.</p>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Navegação</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/sistema/curiculos/visualizar" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Meus Currículos
                </Link>
              </li>
              <li>
                <Link href="/sistema/curiculos/cadastrar" className="text-slate-600 hover:text-blue-600 transition-colors">
                  Novo Currículo
                </Link>
              </li>
            </ul>
          </div>

          {/* Features Section */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Recursos</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-slate-600">✓ Cadastro Rápido</li>
              <li className="text-slate-600">✓ Design Profissional</li>
              <li className="text-slate-600">✓ Exportação de Dados</li>
            </ul>
          </div>

          {/* Social Section */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Contato</h3>
            <div className="flex gap-4">
              <a href="mailto:contato@curriculospro.com" className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                <Code className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                <Inbox className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-100 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-600 flex items-center gap-1">
              © {currentYear} CurrículosPro. Todos os direitos reservados. Feito com <Heart className="h-4 w-4 text-red-500" />
            </p>
            <div className="flex gap-6 text-sm text-slate-600">
              <a href="#" className="hover:text-blue-600 transition-colors">Privacidade</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Termos</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Contato</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}