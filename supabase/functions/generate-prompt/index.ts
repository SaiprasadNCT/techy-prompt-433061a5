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

    // Framework-specific detailed guidance based on GPT-5 prompting best practices
    const frameworkGuides: Record<string, string> = {
      standard: `
<framework_structure>
STANDARD PROMPT FRAMEWORK - Structure the prompt with these elements:
1. ROLE: Define who the AI should act as (persona, expertise, tone)
2. TASK: Clear, specific action the AI must perform
3. CONTEXT: Background information, constraints, relevant details
4. OUTPUT FORMAT: Exact format for the response (length, style, structure)

<quality_criteria>
- Role should be specific and relevant to the task
- Task should be actionable with clear success criteria
- Context should eliminate ambiguity
- Output format should be explicit and measurable
</quality_criteria>
</framework_structure>`,

      reasoning: `
<framework_structure>
REASONING PROMPT FRAMEWORK - For complex problem-solving:
1. PROBLEM STATEMENT: Clear definition of the problem to solve
2. STEP-BY-STEP ANALYSIS: Break down into logical steps
3. MULTIPLE PERSPECTIVES: Consider different viewpoints
4. EVIDENCE & LOGIC: Support conclusions with reasoning
5. FINAL SOLUTION: Clear, actionable conclusion

<quality_criteria>
- Each step should build on the previous
- Alternative viewpoints should be genuinely considered
- Conclusions should be supported by the analysis
- The reasoning chain should be traceable
</quality_criteria>
</framework_structure>`,

      race: `
<framework_structure>
RACE FRAMEWORK - Role, Action, Context, Explanation:
1. ROLE: The specific persona or expert identity
2. ACTION: The exact task or behavior required
3. CONTEXT: Situation, constraints, background
4. EXPLANATION: Expected reasoning or justification for the output

<quality_criteria>
- Role should establish credibility for the action
- Action should be single, clear, and achievable
- Context should provide all necessary information
- Explanation requirement ensures thoughtful responses
</quality_criteria>
</framework_structure>`,

      care: `
<framework_structure>
CARE FRAMEWORK - Context, Action, Result, Example:
1. CONTEXT: The situation, background, and constraints
2. ACTION: What needs to be done
3. RESULT: Expected outcome or deliverable
4. EXAMPLE: Concrete illustration of success

<quality_criteria>
- Context should set the stage clearly
- Action should be specific and achievable
- Result should be measurable
- Example should be realistic and helpful
</quality_criteria>
</framework_structure>`,

      ape: `
<framework_structure>
APE FRAMEWORK - Action, Purpose, Execution:
1. ACTION: The specific task to perform
2. PURPOSE: Why this action matters (goal/benefit)
3. EXECUTION: How to accomplish the action (method/approach)

<quality_criteria>
- Action should be concrete and verifiable
- Purpose should connect to real value
- Execution should provide clear methodology
</quality_criteria>
</framework_structure>`,

      create: `
<framework_structure>
CREATE FRAMEWORK - Comprehensive prompt engineering:
1. CHARACTER: The persona, expertise, and communication style
2. REQUEST: The specific task or question
3. EXAMPLES: Sample inputs/outputs for clarity
4. ADJUSTMENTS: Modifications, constraints, special requirements
5. TYPE: The format or category of output
6. EXTRAS: Additional context, edge cases, preferences

<quality_criteria>
- Character should be fully fleshed out
- Request should be unambiguous
- Examples should illustrate edge cases
- Adjustments should handle exceptions
- Type should specify exact deliverable format
- Extras should cover anything not in other sections
</quality_criteria>
</framework_structure>`,

      tag: `
<framework_structure>
TAG FRAMEWORK - Task, Action, Goal:
1. TASK: The specific assignment or problem
2. ACTION: Steps or methods to complete the task
3. GOAL: The desired end state or outcome

<quality_criteria>
- Task should be clearly scoped
- Action should be actionable and sequential
- Goal should be measurable and achievable
</quality_criteria>
</framework_structure>`,

      creo: `
<framework_structure>
CREO FRAMEWORK - Context, Request, Explanation, Outcome:
1. CONTEXT: Background, situation, constraints
2. REQUEST: The specific ask or question
3. EXPLANATION: Detailed description of requirements
4. OUTCOME: Expected result or deliverable

<quality_criteria>
- Context should establish the situation fully
- Request should be clear and direct
- Explanation should provide necessary depth
- Outcome should be specific and verifiable
</quality_criteria>
</framework_structure>`
    };

    const systemPrompt = `You are an expert AI prompt engineer trained on the latest prompting best practices from the GPT-5 Prompting Guide. Your task is to generate world-class AI prompts.

<language_detection>
CRITICAL INSTRUCTION: You MUST:
1. Detect the language of the user's input
2. Generate the ENTIRE prompt in that SAME language
3. If input is in Hindi, output in Hindi. If Gujarati, output in Gujarati. If English, output in English.
4. ALL sections, labels, instructions, and content must be in the detected language
5. Do NOT translate any part to English if the input is in another language
</language_detection>

<self_reflection>
Before generating the final prompt, internally:
1. Create a rubric with 5-7 categories for world-class prompt quality
2. Categories should include: Clarity, Specificity, Actionability, Structure, Context Completeness, Output Definition, Tone Consistency
3. Iterate on your response until it scores maximum on all categories
4. Do NOT show the rubric to the user - this is for your quality assurance only
</self_reflection>

<prompt_engineering_principles>
Apply these GPT-5 best practices:

1. CLEAR INSTRUCTION HIERARCHY
- Avoid contradictory instructions
- Use structured sections with clear purposes
- Instructions should flow logically

2. STRUCTURED FORMATTING
- Use XML-like tags or clear section headers
- Organize information hierarchically
- Make the prompt scannable and maintainable

3. EXPLICIT OUTPUT SPECIFICATIONS
- Define exact format expected
- Specify length, style, and structure
- Include success criteria

4. CONTEXT OPTIMIZATION
- Provide necessary background without overloading
- Include constraints and boundaries
- Define what NOT to do when helpful

5. PERSISTENCE & COMPLETENESS
- Ensure the prompt guides AI to fully complete tasks
- Include quality checks and verification steps
- Define clear completion criteria

6. STEERABILITY
- Allow for tone and style specification
- Include verbosity guidance
- Enable customization where beneficial
</prompt_engineering_principles>

${frameworkGuides[framework as string] || frameworkGuides.standard}

<output_requirements>
Generate a comprehensive, production-ready prompt that:
- Follows the specified framework structure precisely
- Is written ENTIRELY in the user's input language
- Incorporates all best practices from the principles above
- Is immediately usable with any modern AI model
- Includes clear sections with headers/labels in the target language
- Has specific, actionable instructions
- Defines expected output format clearly
</output_requirements>

<format_guidelines>
- Use clear section headers or XML-style tags
- Keep each section focused and concise
- Include example outputs when beneficial
- Add constraints and edge case handling
- Ensure the prompt can stand alone without additional context
</format_guidelines>`;

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
          { role: "user", content: `Generate a high-quality AI prompt for the following request. Remember to write the ENTIRE output in the same language as this input:\n\n${input}` }
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
