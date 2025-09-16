import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CharactersPage } from "./pages/Characters";
import { CharacterDetailPage } from "./pages/CharacterDetail";
import { IndexPage } from "./pages/Index";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-green-900">
        <BrowserRouter>
          <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
            <div className="container mx-auto px-4 py-4">
              <a
                href="/characters?page=1"
                className="text-2xl font-bold text-green-400 hover:text-green-300 transition-colors"
              >
                Rick & Morty Characters
              </a>
            </div>
          </header>
          
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<IndexPage />} />
              <Route path="/characters" element={<CharactersPage />} />
              <Route path="/character/:id" element={<CharacterDetailPage />} />
            </Routes>
          </main>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
