import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { TabBar } from "./components/TabBar";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Hoje from "./pages/Hoje";
import Porque from "./pages/Porque";
import Selar from "./pages/Selar";
import Provas from "./pages/Provas";

function Router() {
  return (
    <Switch>
      {/* O Portão (Login por email) */}
      <Route path="/" component={Home} />

      {/* Quiz de decodificação → calibração → diagnóstico (Épico 3) */}
      <Route path="/quiz" component={Quiz} />

      {/* HOJE — coração do desafio (Épico 4) */}
      <Route path="/hoje" component={Hoje} />

      {/* O porquê do hábito + selar o dia (Épico 4/5) */}
      <Route path="/porque/:day" component={Porque} />
      <Route path="/selar/:day" component={Selar} />

      {/* Dossiês (mantido da v1, opcional) */}
      <Route path="/provas" component={Provas} />

      {/* 404 */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <TooltipProvider>
        <Toaster />
        <Router />
        {/* Tabbar inferior — enxuta (Hoje · Provas) */}
        <TabBar />
      </TooltipProvider>
    </ErrorBoundary>
  );
}

export default App;
