import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, Zap, Shield, BarChart3, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative py-20 sm:py-32 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20"></div>
        </div>

        <div className="container max-w-5xl mx-auto relative z-10">
          <div className="space-y-8 text-center">
            <div className="inline-block">
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                Bem-vindo ao CurrículosPro
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 tracking-tight">
                Gestão de Currículos
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                  Simples e Profissional
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-slate-600">
                Organize, visualize e gerencie currículos de candidatos com uma interface moderna, intuitiva e responsiva.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <Link href="/sistema/curiculos/visualizar">
                  Meus Currículos <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="border-blue-200 text-blue-600 hover:bg-blue-50 font-semibold"
              >
                <Link href="/sistema/curiculos/cadastrar">
                  <FileText className="mr-2 h-5 w-5" /> Novo Currículo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Recursos Poderosos</h2>
            <p className="text-lg text-slate-600">Tudo o que você precisa para gerenciar currículos profissionalmente</p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="p-8 border border-blue-100 rounded-2xl hover:shadow-lg transition-all duration-300 group">
              <div className="inline-flex p-3 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Cadastro Rápido</h3>
              <p className="text-slate-600">
                Formulário intuitivo com validações automáticas e campos dinâmicos para experiências e formações.
              </p>
            </div>

            <div className="p-8 border border-blue-100 rounded-2xl hover:shadow-lg transition-all duration-300 group">
              <div className="inline-flex p-3 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors mb-4">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Visualização Clara</h3>
              <p className="text-slate-600">
                Cards profissionais que exibem todas as informações importantes de forma clara e organizada.
              </p>
            </div>

            <div className="p-8 border border-blue-100 rounded-2xl hover:shadow-lg transition-all duration-300 group">
              <div className="inline-flex p-3 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Dados Seguros</h3>
              <p className="text-slate-600">
                Seus currículos são armazenados localmente com suporte a exportação e backup em JSON.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 border border-blue-100 rounded-2xl hover:shadow-lg transition-all duration-300 group">
              <div className="inline-flex p-3 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Gerenciamento Completo</h3>
              <p className="text-slate-600">
                Edite, exporte, delete ou organize seus currículos com controles intuitivos e precisos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">100%</div>
              <p className="text-blue-100">Interface Responsiva</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">Rápido</div>
              <p className="text-blue-100">Carregamento Instant</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">Seguro</div>
              <p className="text-blue-100">Dados Encriptados</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final Section */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Pronto para começar?</h2>
          <p className="text-lg text-slate-600 mb-10">
            Crie seu primeiro currículo agora e organize sua vida profissional.
          </p>
          <Button 
            asChild 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <Link href="/sistema/curiculos/cadastrar">
              Começar Agora <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}