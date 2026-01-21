import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { LessonProgressProvider } from "@/contexts/LessonProgressContext";
import Index from "./pages/Index";
import LessonPage from "./pages/LessonPage";
import QuizPage from "./pages/QuizPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LessonProgressProvider>
        <BrowserRouter>
          <SidebarProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/lesson/:id" element={<LessonPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SidebarProvider>
        </BrowserRouter>
      </LessonProgressProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
