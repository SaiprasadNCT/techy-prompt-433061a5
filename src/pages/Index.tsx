import { useState } from "react";
import { Header } from "@/components/Header";
import { PromptGenerator } from "@/components/PromptGenerator";
import { ToolsSection } from "@/components/ToolsSection";

const Index = () => {
  const [activeTab, setActiveTab] = useState("chatgpt");

  const handleToolSelect = (toolId: string) => {
    setActiveTab(toolId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="pt-8">
        {activeTab === "chatgpt" && <PromptGenerator />}
        {activeTab === "midjourney" && (
          <div className="max-w-4xl mx-auto p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Midjourney Prompt Generator</h2>
            <p className="text-muted-foreground">Coming soon! This tool will help you create amazing image prompts.</p>
          </div>
        )}
        {activeTab === "optimizer" && (
          <div className="max-w-4xl mx-auto p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Prompt Optimizer</h2>
            <p className="text-muted-foreground">Coming soon! Enhance your existing prompts for better results.</p>
          </div>
        )}
        {activeTab === "claude" && (
          <div className="max-w-4xl mx-auto p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Claude Prompt Generator</h2>
            <p className="text-muted-foreground">Coming soon! Specialized prompts for Claude AI.</p>
          </div>
        )}
        {activeTab === "checker" && (
          <div className="max-w-4xl mx-auto p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Prompt Checker</h2>
            <p className="text-muted-foreground">Coming soon! Analyze and validate your prompt quality.</p>
          </div>
        )}
      </main>
      
      <ToolsSection onToolSelect={handleToolSelect} />
    </div>
  );
};

export default Index;
