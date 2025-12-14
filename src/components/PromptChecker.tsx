import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, Info, Copy, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useClipboard } from "@/hooks/useClipboard";

interface CheckResult {
  overallScore: number;
  clarity: number;
  specificity: number;
  structure: number;
  effectiveness: number;
  suggestions: string[];
  strengths: string[];
  warnings: string[];
}

export const PromptChecker = () => {
  const [prompt, setPrompt] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);
  const { toast } = useToast();
  const { copyToClipboard } = useClipboard();
  const timeoutRef = useRef<number | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const checkPrompt = () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt required",
        description: "Please enter a prompt to check",
        variant: "destructive",
      });
      return;
    }

    setIsChecking(true);
    
    // Simulate prompt analysis
    timeoutRef.current = window.setTimeout(() => {
      const wordCount = prompt.split(' ').length;
      const sentences = prompt.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
      const hasRole = prompt.toLowerCase().includes('you are') || prompt.toLowerCase().includes('act as');
      const hasContext = prompt.toLowerCase().includes('context') || prompt.length > 150;
      const hasSpecificInstructions = prompt.includes('please') || prompt.includes('make sure') || prompt.includes('ensure');
      const hasOutputFormat = prompt.toLowerCase().includes('format') || prompt.toLowerCase().includes('structure');
      const hasExamples = prompt.toLowerCase().includes('example') || prompt.toLowerCase().includes('for instance');
      
      let clarity = 70;
      let specificity = 60;
      let structure = 65;
      let effectiveness = 60;
      
      const suggestions = [];
      const strengths = [];
      const warnings = [];

      // Clarity analysis
      if (sentences < 2) {
        warnings.push("Prompt may be too brief for complex tasks");
        clarity -= 20;
      } else {
        strengths.push("Good sentence structure");
        clarity += 10;
      }

      if (wordCount > 300) {
        warnings.push("Prompt might be too lengthy - consider breaking it down");
        clarity -= 15;
      }

      // Specificity analysis  
      if (hasRole) {
        strengths.push("Clear role definition provided");
        specificity += 15;
      } else {
        suggestions.push("Add a specific role or persona for the AI");
        specificity -= 15;
      }

      if (hasOutputFormat) {
        strengths.push("Output format specified");
        specificity += 15;
      } else {
        suggestions.push("Specify desired output format");
        specificity -= 10;
      }

      // Structure analysis
      if (hasContext) {
        strengths.push("Good contextual information");
        structure += 15;
      } else {
        suggestions.push("Add more context and background information");
        structure -= 15;
      }

      if (hasSpecificInstructions) {
        strengths.push("Clear instructions provided");
        structure += 10;
      } else {
        suggestions.push("Include more specific instructions");
        structure -= 10;
      }

      // Effectiveness analysis
      if (hasExamples) {
        strengths.push("Examples provided for clarity");
        effectiveness += 20;
      } else {
        suggestions.push("Consider adding examples to clarify expectations");
        effectiveness -= 10;
      }

      if (prompt.toLowerCase().includes('step by step')) {
        strengths.push("Requests systematic approach");
        effectiveness += 15;
      }

      // Normalize scores
      clarity = Math.max(0, Math.min(100, clarity));
      specificity = Math.max(0, Math.min(100, specificity));
      structure = Math.max(0, Math.min(100, structure));
      effectiveness = Math.max(0, Math.min(100, effectiveness));
      
      const overallScore = Math.round((clarity + specificity + structure + effectiveness) / 4);

      const checkResult: CheckResult = {
        overallScore,
        clarity,
        specificity,
        structure,
        effectiveness,
        suggestions,
        strengths,
        warnings
      };

      setResult(checkResult);
      setIsChecking(false);
      
      toast({
        title: "Prompt analysis complete!",
        description: `Overall score: ${overallScore}/100`,
      });
    }, 2000);
  };

  const handleCopy = () => {
    copyToClipboard(prompt, "Prompt copied to clipboard");
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
          <CheckCircle className="w-4 h-4" />
          <span className="text-sm font-medium">Prompt Checker</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
          Analyze Prompt Quality
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Get detailed insights into your prompt's effectiveness. Analyze clarity, specificity, and structure.
        </p>
      </div>

      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            Prompt Quality Analysis
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Enter your prompt to analyze
            </label>
            <Textarea
              placeholder="Paste your prompt here for quality analysis..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[150px] transition-smooth focus:shadow-glow"
            />
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={checkPrompt}
              disabled={isChecking || !prompt.trim()}
              variant="plum"
              size="lg"
              className="flex-1"
            >
              {isChecking ? (
                <>
                  <Search className="w-4 h-4 animate-pulse" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Check Prompt Quality
                </>
              )}
            </Button>
            
            {prompt && (
              <Button
                onClick={handleCopy}
                variant="outline"
                size="lg"
              >
                <Copy className="w-4 h-4" />
              </Button>
            )}
          </div>

          {isChecking && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Search className="w-4 h-4 animate-pulse text-primary" />
                Analyzing prompt quality and structure...
              </div>
              <Progress value={75} className="w-full" />
            </div>
          )}

          {result && (
            <div className="space-y-6">
              {/* Overall Score */}
              <Card className="bg-gradient-subtle border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">Overall Quality Score</h3>
                      <p className="text-sm text-muted-foreground">Combined effectiveness rating</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-4xl font-bold ${getScoreColor(result.overallScore)}`}>
                        {result.overallScore}/100
                      </div>
                      <Badge variant="secondary" className={getScoreColor(result.overallScore)}>
                        {getScoreLabel(result.overallScore)}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={result.overallScore} className="w-full h-3" />
                </CardContent>
              </Card>

              {/* Detailed Scores */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Clarity", score: result.clarity },
                  { label: "Specificity", score: result.specificity },
                  { label: "Structure", score: result.structure },
                  { label: "Effectiveness", score: result.effectiveness }
                ].map((metric) => (
                  <Card key={metric.label}>
                    <CardContent className="pt-4">
                      <div className="text-center space-y-2">
                        <h4 className="font-medium text-sm">{metric.label}</h4>
                        <div className={`text-2xl font-bold ${getScoreColor(metric.score)}`}>
                          {metric.score}
                        </div>
                        <Progress value={metric.score} className="w-full h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Warnings */}
              {result.warnings.length > 0 && (
                <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
                      <AlertTriangle className="w-5 h-5" />
                      Warnings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.warnings.map((warning, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-yellow-800 dark:text-yellow-300">
                          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          {warning}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Strengths */}
              {result.strengths.length > 0 && (
                <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                      <CheckCircle className="w-5 h-5" />
                      Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-green-800 dark:text-green-300">
                          <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Suggestions */}
              {result.suggestions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-600">
                      <Info className="w-5 h-5" />
                      Improvement Suggestions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};