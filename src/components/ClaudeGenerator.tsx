import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, User, Brain, FileText, Lightbulb } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const claudeFrameworks = {
  analytical: {
    name: "Analytical Thinking",
    description: "For complex analysis and reasoning tasks",
    template: "I need you to analyze {topic} systematically. Please break down the problem, consider multiple perspectives, examine the evidence, and provide a well-reasoned conclusion with supporting arguments."
  },
  creative: {
    name: "Creative Writing", 
    description: "For storytelling and creative content",
    template: "Help me create {content_type} about {topic}. Focus on engaging storytelling, vivid descriptions, and compelling characters. Make it creative and original while maintaining {tone}."
  },
  research: {
    name: "Research Assistant",
    description: "For comprehensive research and information gathering", 
    template: "Act as a research assistant specializing in {field}. Help me understand {topic} by providing comprehensive information, key insights, current developments, and reliable sources."
  },
  tutor: {
    name: "Educational Tutor",
    description: "For learning and educational support",
    template: "Be my tutor for {subject}. Explain {concept} in a clear, structured way. Use examples, analogies, and step-by-step explanations. Check my understanding and provide practice exercises."
  },
  consultant: {
    name: "Strategic Consultant", 
    description: "For business and strategic advice",
    template: "Act as a strategic consultant with expertise in {domain}. Analyze {situation} and provide actionable recommendations. Consider risks, opportunities, and implementation strategies."
  },
  editor: {
    name: "Content Editor",
    description: "For editing and improving written content",
    template: "Review and improve this {content_type}: {content}. Focus on clarity, coherence, style, and effectiveness. Provide specific suggestions for enhancement while maintaining the original intent."
  }
};

const quickSuggestions = [
  "Write a comprehensive business plan",
  "Analyze market trends and opportunities", 
  "Create educational content for students",
  "Develop a research methodology",
  "Edit and improve my writing",
  "Solve complex technical problems"
];

export const ClaudeGenerator = () => {
  const [task, setTask] = useState("");
  const [framework, setFramework] = useState("analytical");
  const [context, setContext] = useState("");
  const [outputStyle, setOutputStyle] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const { toast } = useToast();

  const generatePrompt = () => {
    if (!task.trim()) {
      toast({
        title: "Task required",
        description: "Please describe what you want Claude to help with",
        variant: "destructive",
      });
      return;
    }

    const selectedFramework = claudeFrameworks[framework as keyof typeof claudeFrameworks];
    let prompt = "";

    switch (framework) {
      case "analytical":
        prompt = `I need you to analyze ${task} systematically. Please break down the problem, consider multiple perspectives, examine the evidence, and provide a well-reasoned conclusion with supporting arguments.`;
        break;
      case "creative":
        prompt = `Help me create content about ${task}. Focus on engaging storytelling, vivid descriptions, and compelling elements. Make it creative and original while maintaining a ${outputStyle || 'professional'} tone.`;
        break;
      case "research":
        prompt = `Act as a research assistant. Help me understand ${task} by providing comprehensive information, key insights, current developments, and reliable sources.`;
        break;
      case "tutor":
        prompt = `Be my tutor and explain ${task} in a clear, structured way. Use examples, analogies, and step-by-step explanations. Check my understanding and provide practice exercises.`;
        break;
      case "consultant":
        prompt = `Act as a strategic consultant. Analyze ${task} and provide actionable recommendations. Consider risks, opportunities, and implementation strategies.`;
        break;
      case "editor":
        prompt = `Review and improve the following content: ${task}. Focus on clarity, coherence, style, and effectiveness. Provide specific suggestions for enhancement while maintaining the original intent.`;
        break;
      default:
        prompt = `Help me with ${task}. Please provide a comprehensive and thoughtful response.`;
    }

    if (context) {
      prompt += ` Additional context: ${context}`;
    }

    if (outputStyle && framework !== "creative") {
      prompt += ` Please respond in a ${outputStyle} manner.`;
    }

    setGeneratedPrompt(prompt);
    
    toast({
      title: "Claude prompt generated!",
      description: "Your specialized prompt is ready",
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    toast({
      title: "Copied!",
      description: "Prompt copied to clipboard",
    });
  };

  const handleSuggestionClick = (suggestion: string) => {
    setTask(suggestion);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-primary rounded-full text-primary-foreground">
          <User className="w-4 h-4" />
          <span className="text-sm font-medium">Claude Prompt Generator</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
          Specialized Claude Prompts
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Create optimized prompts tailored for Claude's capabilities. Leverage Claude's analytical and reasoning strengths.
        </p>
      </div>

      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Claude Prompt Builder
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  What do you want Claude to help with? *
                </label>
                <Textarea
                  placeholder="Describe your task or question..."
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  className="min-h-[120px] transition-smooth focus:shadow-glow"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Framework Type</label>
                <Select value={framework} onValueChange={setFramework}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(claudeFrameworks).map(([key, fw]) => (
                      <SelectItem key={key} value={key}>
                        {fw.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  {claudeFrameworks[framework as keyof typeof claudeFrameworks].description}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Additional Context
                </label>
                <Textarea
                  placeholder="Any specific requirements, constraints, or background information..."
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  className="min-h-[100px] transition-smooth focus:shadow-glow"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Output Style</label>
                <Select value={outputStyle} onValueChange={setOutputStyle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select output style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="formal">Formal & Professional</SelectItem>
                    <SelectItem value="conversational">Conversational</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="creative">Creative & Engaging</SelectItem>
                    <SelectItem value="concise">Concise & Direct</SelectItem>
                    <SelectItem value="detailed">Detailed & Comprehensive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Quick Suggestions</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickSuggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="suggestion"
                  size="sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-xs"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>

          <Button 
            onClick={generatePrompt}
            disabled={!task.trim()}
            variant="plum"
            size="lg"
            className="w-full"
          >
            <Brain className="w-4 h-4" />
            Generate Claude Prompt
          </Button>

          {generatedPrompt && (
            <Card className="bg-gradient-subtle border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Generated Claude Prompt
                  </CardTitle>
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="sm"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-background/50 rounded-lg border border-primary/10">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {generatedPrompt}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                    {claudeFrameworks[framework as keyof typeof claudeFrameworks].name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Optimized for Claude AI
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};