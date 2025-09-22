import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Copy, Zap, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface OptimizationResult {
  score: number;
  improvements: string[];
  optimizedPrompt: string;
  issues: string[];
}

export const PromptOptimizer = () => {
  const [originalPrompt, setOriginalPrompt] = useState("");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const { toast } = useToast();

  const optimizePrompt = () => {
    if (!originalPrompt.trim()) {
      toast({
        title: "Prompt required",
        description: "Please enter a prompt to optimize",
        variant: "destructive",
      });
      return;
    }

    setIsOptimizing(true);
    
    // Simulate optimization analysis
    setTimeout(() => {
      const wordCount = originalPrompt.split(' ').length;
      const hasRole = originalPrompt.toLowerCase().includes('you are') || originalPrompt.toLowerCase().includes('act as');
      const hasContext = originalPrompt.length > 100;
      const hasSpecificInstructions = originalPrompt.includes('please') || originalPrompt.includes('make sure');
      
      const issues = [];
      const improvements = [];
      let score = 60;

      if (!hasRole) {
        issues.push("Missing clear role definition");
        improvements.push("Add a specific role or persona for the AI");
        score -= 15;
      } else {
        score += 10;
      }

      if (!hasContext) {
        issues.push("Insufficient context provided");
        improvements.push("Add more background information and context");
        score -= 10;
      } else {
        score += 10;
      }

      if (!hasSpecificInstructions) {
        issues.push("Instructions could be more specific");
        improvements.push("Include specific output format requirements");
        score -= 10;
      } else {
        score += 10;
      }

      if (wordCount < 10) {
        issues.push("Prompt is too brief");
        improvements.push("Expand with more detailed requirements");
        score -= 15;
      }

      if (wordCount > 200) {
        issues.push("Prompt might be too lengthy");
        improvements.push("Consider breaking into smaller, focused prompts");
        score -= 5;
      }

      // Generate optimized version
      let optimized = originalPrompt;
      
      if (!hasRole) {
        optimized = `You are an expert assistant. ${optimized}`;
      }
      
      if (!hasSpecificInstructions) {
        optimized += ` Please provide a comprehensive response with clear explanations and examples where relevant.`;
      }

      if (!hasContext && wordCount < 50) {
        optimized += ` Consider the context and provide practical, actionable advice.`;
      }

      const optimizationResult: OptimizationResult = {
        score: Math.max(20, Math.min(100, score)),
        improvements,
        optimizedPrompt: optimized,
        issues
      };

      setResult(optimizationResult);
      setIsOptimizing(false);
      
      toast({
        title: "Optimization complete!",
        description: `Prompt score: ${optimizationResult.score}/100`,
      });
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Prompt copied to clipboard",
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Improvement";
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-primary rounded-full text-primary-foreground">
          <Zap className="w-4 h-4" />
          <span className="text-sm font-medium">Prompt Optimizer</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
          Optimize Your AI Prompts
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Analyze and improve your prompts for better AI responses. Get detailed insights and optimization suggestions.
        </p>
      </div>

      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Prompt Analysis & Optimization
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Enter your prompt to optimize
            </label>
            <Textarea
              placeholder="Paste your existing prompt here..."
              value={originalPrompt}
              onChange={(e) => setOriginalPrompt(e.target.value)}
              className="min-h-[150px] transition-smooth focus:shadow-glow"
            />
          </div>

          <Button 
            onClick={optimizePrompt}
            disabled={isOptimizing || !originalPrompt.trim()}
            variant="plum"
            size="lg"
            className="w-full"
          >
            {isOptimizing ? (
              <>
                <Zap className="w-4 h-4 animate-pulse" />
                Analyzing Prompt...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                Optimize Prompt
              </>
            )}
          </Button>

          {isOptimizing && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="w-4 h-4 animate-pulse text-primary" />
                Analyzing prompt structure and effectiveness...
              </div>
              <Progress value={66} className="w-full" />
            </div>
          )}

          {result && (
            <div className="space-y-6">
              {/* Score Card */}
              <Card className="bg-gradient-subtle border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Prompt Score</h3>
                      <p className="text-sm text-muted-foreground">Overall effectiveness rating</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${getScoreColor(result.score)}`}>
                        {result.score}/100
                      </div>
                      <Badge variant="secondary" className={getScoreColor(result.score)}>
                        {getScoreLabel(result.score)}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={result.score} className="w-full" />
                </CardContent>
              </Card>

              {/* Issues */}
              {result.issues.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600">
                      <AlertCircle className="w-5 h-5" />
                      Issues Found
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.issues.map((issue, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Improvements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    Improvement Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.improvements.map((improvement, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Optimized Prompt */}
              <Card className="bg-gradient-subtle border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      Optimized Prompt
                    </CardTitle>
                    <Button
                      onClick={() => copyToClipboard(result.optimizedPrompt)}
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
                      {result.optimizedPrompt}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};