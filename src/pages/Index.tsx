import { useState } from "react";
import { Header } from "@/components/Header";
import { PromptGenerator } from "@/components/PromptGenerator";
import { MidjourneyGenerator } from "@/components/MidjourneyGenerator";
import { PromptOptimizer } from "@/components/PromptOptimizer";
import { ClaudeGenerator } from "@/components/ClaudeGenerator";
import { PromptChecker } from "@/components/PromptChecker";
import { ToolsSection } from "@/components/ToolsSection";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const Index = () => {
  const [activeTab, setActiveTab] = useState("chatgpt");

  const handleToolSelect = (toolId: string) => {
    setActiveTab(toolId);
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "chatgpt":
        return <PromptGenerator />;
      case "midjourney":
        return <MidjourneyGenerator />;
      case "optimizer":
        return <PromptOptimizer />;
      case "claude":
        return <ClaudeGenerator />;
      case "checker":
        return <PromptChecker />;
      default:
        return <PromptGenerator />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="pt-8">
        <ErrorBoundary>
          {renderActiveComponent()}
        </ErrorBoundary>
      </main>
      
      <ToolsSection onToolSelect={handleToolSelect} />
    </div>
  );
};

export default Index;
