import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; 
import { Button } from "@/components/ui/button";
import { Brain, Image, Zap, User, CheckCircle, ArrowRight } from "lucide-react";

const tools = [
  {
    id: "chatgpt",
    title: "ChatGPT Prompt Generator",
    description: "Create optimized prompts specifically designed for ChatGPT. Uses advanced frameworks to maximize response quality.",
    icon: Brain,
    features: ["Role-based prompts", "Context optimization", "Output formatting"],
    popular: true
  },
  {
    id: "midjourney", 
    title: "Midjourney Prompt Generator",
    description: "Generate detailed prompts for stunning AI-generated images. Includes style, composition, and technical parameters.",
    icon: Image,
    features: ["Art style selection", "Composition guidance", "Technical parameters"],
    popular: false
  },
  {
    id: "optimizer",
    title: "Prompt Optimizer", 
    description: "Enhance existing prompts for better AI responses. Analyzes structure and suggests improvements.",
    icon: Zap,
    features: ["Structure analysis", "Performance boost", "Clarity enhancement"],
    popular: true
  },
  {
    id: "claude",
    title: "Claude Prompt Generator",
    description: "Specialized prompts optimized for Claude AI's unique capabilities and response patterns.",
    icon: User,
    features: ["Claude-specific optimization", "Reasoning frameworks", "Long-form content"],
    popular: false
  },
  {
    id: "checker",
    title: "Prompt Checker",
    description: "Analyze prompt quality and effectiveness. Get insights on clarity, specificity, and potential improvements.",
    icon: CheckCircle, 
    features: ["Quality scoring", "Improvement suggestions", "Best practice validation"],
    popular: false
  }
];

interface ToolsSectionProps {
  onToolSelect: (toolId: string) => void;
}

export const ToolsSection = ({ onToolSelect }: ToolsSectionProps) => {
  return (
    <section className="py-16 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Complete AI Prompt Toolkit
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional-grade tools for creating, optimizing, and validating AI prompts across different platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <Card 
                key={tool.id}
                className="relative hover:shadow-elegant transition-smooth cursor-pointer group"
                onClick={() => onToolSelect(tool.id)}
              >
                {tool.popular && (
                  <Badge 
                    className="absolute -top-2 -right-2 bg-gradient-primary text-primary-foreground border-0"
                  >
                    Popular
                  </Badge>
                )}
                
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-lg">{tool.title}</CardTitle>
                  </div>
                  <CardDescription className="text-sm leading-relaxed">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      {tool.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-smooth"
                    >
                      Try {tool.title.split(' ')[0]}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};