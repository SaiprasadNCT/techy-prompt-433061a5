import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Image, Camera, Palette, Wand2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const aspectRatios = [
  { value: "1:1", label: "Square (1:1)" },
  { value: "16:9", label: "Landscape (16:9)" },
  { value: "9:16", label: "Portrait (9:16)" },
  { value: "4:3", label: "Classic (4:3)" },
  { value: "3:2", label: "Photo (3:2)" }
];

const artStyles = [
  "Photorealistic", "Digital Art", "Oil Painting", "Watercolor", "Sketch", 
  "Anime", "Cartoon", "Abstract", "Surreal", "Minimalist", "Vintage", "Cyberpunk"
];

const lightingOptions = [
  "Natural lighting", "Golden hour", "Blue hour", "Studio lighting", 
  "Dramatic lighting", "Soft lighting", "Neon lighting", "Candlelight"
];

const quickPrompts = [
  "A serene mountain landscape at sunset",
  "Portrait of a wise old wizard", 
  "Futuristic city skyline",
  "Mystical forest with glowing mushrooms",
  "Elegant woman in 1920s fashion",
  "Steampunk mechanical device"
];

export const MidjourneyGenerator = () => {
  const [subject, setSubject] = useState("");
  const [style, setStyle] = useState("");
  const [lighting, setLighting] = useState("");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const { toast } = useToast();

  const generatePrompt = () => {
    if (!subject.trim()) {
      toast({
        title: "Subject required",
        description: "Please describe what you want to create",
        variant: "destructive",
      });
      return;
    }

    let prompt = subject;
    
    if (style) {
      prompt += `, ${style} style`;
    }
    
    if (lighting) {
      prompt += `, ${lighting}`;
    }
    
    if (additionalDetails) {
      prompt += `, ${additionalDetails}`;
    }
    
    prompt += ` --ar ${aspectRatio} --v 6`;
    
    setGeneratedPrompt(prompt);
    
    toast({
      title: "Midjourney prompt generated!",
      description: "Your image prompt is ready to use",
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    toast({
      title: "Copied!",
      description: "Prompt copied to clipboard",
    });
  };

  const handleQuickPrompt = (prompt: string) => {
    setSubject(prompt);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-primary rounded-full text-primary-foreground">
          <Image className="w-4 h-4" />
          <span className="text-sm font-medium">Midjourney Prompt Generator</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
          Create Stunning Image Prompts
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Generate detailed prompts for Midjourney to create amazing AI-generated images with perfect composition and style.
        </p>
      </div>

      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary" />
            Image Prompt Builder
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Subject/Scene Description *
                </label>
                <Textarea
                  placeholder="Describe what you want to create..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="min-h-[100px] transition-smooth focus:shadow-glow"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Art Style</label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an art style" />
                  </SelectTrigger>
                  <SelectContent>
                    {artStyles.map((styleOption) => (
                      <SelectItem key={styleOption} value={styleOption.toLowerCase()}>
                        {styleOption}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Lighting</label>
                <Select value={lighting} onValueChange={setLighting}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select lighting" />
                  </SelectTrigger>
                  <SelectContent>
                    {lightingOptions.map((lightingOption) => (
                      <SelectItem key={lightingOption} value={lightingOption.toLowerCase()}>
                        {lightingOption}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Aspect Ratio</label>
                <Select value={aspectRatio} onValueChange={setAspectRatio}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {aspectRatios.map((ratio) => (
                      <SelectItem key={ratio.value} value={ratio.value}>
                        {ratio.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Additional Details
                </label>
                <Textarea
                  placeholder="Colors, mood, composition details..."
                  value={additionalDetails}
                  onChange={(e) => setAdditionalDetails(e.target.value)}
                  className="min-h-[100px] transition-smooth focus:shadow-glow"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Quick Prompts</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="suggestion"
                  size="sm"
                  onClick={() => handleQuickPrompt(prompt)}
                  className="text-xs"
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>

          <Button 
            onClick={generatePrompt}
            disabled={!subject.trim()}
            variant="plum"
            size="lg"
            className="w-full"
          >
            <Wand2 className="w-4 h-4" />
            Generate Midjourney Prompt
          </Button>

          {generatedPrompt && (
            <Card className="bg-gradient-subtle border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Image className="w-5 h-5 text-primary" />
                    Generated Midjourney Prompt
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
                  <p className="text-sm leading-relaxed font-mono">
                    {generatedPrompt}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Midjourney v6
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Ready to use in Midjourney
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