'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, Zap, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto text-center space-y-6">
          <h1 className="text-5xl font-bold">Gestão de Currículos</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Crie, organize e gerencie seus currículos de forma simples e profissional.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/sistema/curiculos/visualizar">Começar Agora</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
              <Link href="/sistema/curiculos/cadastrar">Criar Novo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Por que usar?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition">
              <FileText className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Múltiplos Currículos</h3>
              <p className="text-gray-600">
                Crie e gerencie vários currículos adaptados para diferentes posições.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition">
              <Zap className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Rápido e Fácil</h3>
              <p className="text-gray-600">
                Interface intuitiva para criar e editar seus currículos em minutos.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition">
              <Shield className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Seguro e Privado</h3>
              <p className="text-gray-600">
                Seus dados são armazenados localmente e nunca são compartilhados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="container mx-auto space-y-6">
          <h2 className="text-3xl font-bold">Pronto para começar?</h2>
          <p className="text-xl max-w-2xl mx-auto">
            Crie seu primeira currículo agora e esteja pronto para as oportunidades.
          </p>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Link href="/sistema/curiculos/cadastrar">Criar Currículo</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
