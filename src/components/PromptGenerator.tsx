import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Wand2, Sparkles, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const promptFrameworks = {
  standard: {
    name: "Standard Prompt",
    description: "For general use prompt generation",
    template: "I want you to act as {role}. {task}. {context}. {output_format}."
  },
  reasoning: {
    name: "Reasoning Prompt", 
    description: "For reasoning tasks and complex problem solving",
    template: "Think step by step. {problem}. Analyze the situation, consider multiple perspectives, and provide a logical solution with clear reasoning."
  },
  race: {
    name: "RACE Framework",
    description: "Role, Action, Context, Explanation",
    template: "Role: {role}\nAction: {action}\nContext: {context}\nExplanation: {explanation}"
  },
  care: {
    name: "CARE Framework", 
    description: "Context, Action, Result, Example",
    template: "Context: {context}\nAction: {action}\nResult: {result}\nExample: {example}"
  },
  ape: {
    name: "APE Framework",
    description: "Action, Purpose, Execution", 
    template: "Action: {action}\nPurpose: {purpose}\nExecution: {execution}"
  },
  create: {
    name: "CREATE Framework",
    description: "Character, Request, Examples, Adjustments, Type, Extras",
    template: "Character: {character}\nRequest: {request}\nExamples: {examples}\nAdjustments: {adjustments}\nType: {type}\nExtras: {extras}"
  },
  tag: {
    name: "TAG Framework", 
    description: "Task, Action, Goal",
    template: "Task: {task}\nAction: {action}\nGoal: {goal}"
  },
  creo: {
    name: "CREO Framework",
    description: "Context, Request, Explanation, Outcome", 
    template: "Context: {context}\nRequest: {request}\nExplanation: {explanation}\nOutcome: {outcome}"
  }
};

const quickSuggestions = [
  "Write a thank you email",
  "Write user requirements", 
  "Create content calendar",
  "Brainstorm marketing ideas",
  "Draft a job description",
  "Generate meeting agenda",
  "Write a blog post outline",
  "Draft a product description"
];

export const PromptGenerator = () => {
  const [input, setInput] = useState("");
  const [selectedFramework, setSelectedFramework] = useState("standard");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generatePrompt = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter what you want your prompt to do",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const framework = promptFrameworks[selectedFramework as keyof typeof promptFrameworks];
      let prompt = "";
      
      switch (selectedFramework) {
        case "standard":
          prompt = `You are an expert assistant. ${input}. Please provide a comprehensive and helpful response with clear explanations and practical examples where applicable.`;
          break;
        case "reasoning":
          prompt = `Think step by step about this problem: ${input}. Analyze the situation carefully, consider multiple perspectives, and provide a logical solution with clear reasoning for each step.`;
          break;
        case "race":
          prompt = `Role: Expert advisor\nAction: ${input}\nContext: This task requires careful consideration and expertise\nExplanation: Please provide detailed reasoning and practical steps to accomplish this effectively.`;
          break;
        case "care":
          prompt = `Context: ${input}\nAction: Provide comprehensive guidance\nResult: A clear, actionable solution\nExample: Include relevant examples to illustrate key points.`;
          break;
        case "ape":
          prompt = `Action: ${input}\nPurpose: To achieve the best possible outcome\nExecution: Provide step-by-step instructions with clear methodology.`;
          break;
        case "create":
          prompt = `Character: Expert in the relevant field\nRequest: ${input}\nExamples: Provide concrete examples\nAdjustments: Tailor the response to specific needs\nType: Comprehensive guide\nExtras: Include tips and best practices.`;
          break;
        case "tag":
          prompt = `Task: ${input}\nAction: Provide detailed guidance\nGoal: Achieve the desired outcome efficiently and effectively.`;
          break;
        case "creo":
          prompt = `Context: ${input}\nRequest: Comprehensive assistance\nExplanation: Provide clear reasoning and methodology\nOutcome: A practical, actionable solution.`;
          break;
        default:
          prompt = `You are an expert assistant. ${input}. Please provide a comprehensive and helpful response.`;
      }
      
      setGeneratedPrompt(prompt);
      setIsGenerating(false);
      
      toast({
        title: "Prompt generated!",
        description: "Your AI prompt has been created successfully.",
      });
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    toast({
      title: "Copied!",
      description: "Prompt copied to clipboard.",
    });
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-primary rounded-full text-primary-foreground">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Free AI Prompt Generator</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
          The Free AI Prompt Generator
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Create powerful AI prompts using proven frameworks. Choose from multiple prompt structures to get better results from AI tools.
        </p>
      </div>

      <Card className="shadow-elegant">
        <CardHeader>
          <div className="flex flex-wrap gap-2 justify-center">
            <Tabs value={selectedFramework} onValueChange={setSelectedFramework} className="w-full">
              <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-1">
                {Object.entries(promptFrameworks).map(([key, framework]) => (
                  <TabsTrigger 
                    key={key} 
                    value={key}
                    className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {framework.name.split(' ')[0]}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-primary">
              {promptFrameworks[selectedFramework as keyof typeof promptFrameworks].name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {promptFrameworks[selectedFramework as keyof typeof promptFrameworks].description}
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                What do you want your prompt to do?
              </label>
              <Textarea
                placeholder="I want a prompt that will..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[120px] resize-none transition-smooth focus:shadow-glow"
                rows={4}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-primary" />
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
              disabled={isGenerating || !input.trim()}
              variant="plum"
              size="lg"
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Prompt
                </>
              )}
            </Button>
          </div>

          {generatedPrompt && (
            <Card className="bg-gradient-subtle border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Generated Prompt
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
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {promptFrameworks[selectedFramework as keyof typeof promptFrameworks].name}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Framework used for this prompt
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