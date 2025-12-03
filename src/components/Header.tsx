import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Brain, Image, Zap, CheckCircle, User } from "lucide-react";
interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}
const toolTabs = [{
  id: "chatgpt",
  name: "ChatGPT Prompt Generator",
  icon: Brain,
  description: "Generate optimized prompts for ChatGPT"
}, {
  id: "midjourney",
  name: "Midjourney Prompt Generator",
  icon: Image,
  description: "Create detailed prompts for image generation"
}, {
  id: "optimizer",
  name: "Prompt Optimizer",
  icon: Zap,
  description: "Enhance and improve existing prompts"
}, {
  id: "claude",
  name: "Claude Prompt Generator",
  icon: User,
  description: "Specialized prompts for Claude AI"
}, {
  id: "checker",
  name: "Prompt Checker",
  icon: CheckCircle,
  description: "Analyze and validate prompt quality"
}];
export const Header = ({
  activeTab,
  onTabChange
}: HeaderProps) => {
  return <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Techyprompt</h1>
              <p className="text-sm text-muted-foreground">AI Prompt Generator Suite</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              Free Tool
            </Badge>
            <Button variant="plum" size="sm">
              Join Community
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto p-1 bg-muted/50">
            {toolTabs.map(tab => {
            const IconComponent = tab.icon;
            return <TabsTrigger key={tab.id} value={tab.id} className="flex flex-col items-center gap-2 p-3 h-auto data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-smooth">
                  <IconComponent className="w-4 h-4" />
                  <div className="text-center">
                    <div className="text-xs font-medium leading-tight">
                      {tab.name.split(' ').slice(0, 2).join(' ')}
                    </div>
                    <div className="text-xs font-medium leading-tight">
                      {tab.name.split(' ').slice(2).join(' ')}
                    </div>
                  </div>
                </TabsTrigger>;
          })}
          </TabsList>
        </Tabs>
      </div>
    </header>;
};