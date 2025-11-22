import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { input, framework } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Framework descriptions for the AI
    const frameworkGuides = {
      standard: "Standard Prompt - General use prompt generation with role, task, context, and output format",
      reasoning: "Reasoning Prompt - For complex problem solving with step-by-step analysis",
      race: "RACE Framework - Role, Action, Context, Explanation structure",
      care: "CARE Framework - Context, Action, Result, Example structure",
      ape: "APE Framework - Action, Purpose, Execution structure",
      create: "CREATE Framework - Character, Request, Examples, Adjustments, Type, Extras structure",
      tag: "TAG Framework - Task, Action, Goal structure",
      creo: "CREO Framework - Context, Request, Explanation, Outcome structure"
    };

    const systemPrompt = `You are an expert AI prompt engineer. Your task is to:
1. Detect the language of the user's input
2. Generate a high-quality AI prompt using the ${frameworkGuides[framework as keyof typeof frameworkGuides] || frameworkGuides.standard} framework
3. Write the ENTIRE prompt in the SAME LANGUAGE as the user's input

CRITICAL: The entire prompt must be in the same language as the user's input. If they write in Hindi, generate in Hindi. If in Gujarati, generate in Gujarati. If in English, generate in English.

Framework: ${framework}

Generate a comprehensive, well-structured prompt that follows the framework and is completely in the detected language.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: input }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const generatedPrompt = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ prompt: generatedPrompt }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in generate-prompt function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
