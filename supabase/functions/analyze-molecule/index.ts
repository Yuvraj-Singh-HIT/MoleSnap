import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { moleculeName } = await req.json();
    
    if (!moleculeName) {
      console.error('No molecule name provided');
      return new Response(
        JSON.stringify({ error: 'Molecule name is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Analyzing molecule: ${moleculeName}`);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are an expert pharmaceutical chemist and drug discovery scientist. Analyze the given molecule and provide comprehensive insights in a structured JSON format.

For the molecule, provide:
1. Basic Information: chemical formula, molecular weight, IUPAC name, common names/brand names
2. Mechanism of Action: how the drug works at molecular level
3. Therapeutic Uses: current approved uses and potential repurposing opportunities
4. Pharmacokinetics: absorption, distribution, metabolism, excretion (ADME)
5. Side Effects: common and serious adverse effects
6. Drug Interactions: significant interactions with other medications
7. Market Analysis: current market status, key manufacturers, patent status
8. Research Potential: ongoing clinical trials, emerging applications
9. Safety Score: rate from 0-100 based on overall safety profile
10. Market Potential: rate as "Low", "Medium", "High", or "Very High"

IMPORTANT: Return ONLY valid JSON without any markdown formatting or code blocks.`;

    const userPrompt = `Analyze the molecule: ${moleculeName}

Return a JSON object with this exact structure:
{
  "basicInfo": {
    "chemicalFormula": "string",
    "molecularWeight": "string with unit",
    "iupacName": "string",
    "commonNames": ["array of strings"],
    "drugClass": "string"
  },
  "mechanismOfAction": "detailed explanation string",
  "therapeuticUses": {
    "approved": ["array of approved uses"],
    "potential": ["array of potential repurposing opportunities"]
  },
  "pharmacokinetics": {
    "absorption": "string",
    "distribution": "string",
    "metabolism": "string",
    "excretion": "string",
    "halfLife": "string"
  },
  "sideEffects": {
    "common": ["array of common side effects"],
    "serious": ["array of serious side effects"],
    "contraindications": ["array of contraindications"]
  },
  "drugInteractions": ["array of significant drug interactions"],
  "marketAnalysis": {
    "status": "string (approved/investigational/etc)",
    "manufacturers": ["array of key manufacturers"],
    "patentStatus": "string",
    "globalMarketSize": "string"
  },
  "researchPotential": {
    "ongoingTrials": ["array of trial descriptions"],
    "emergingApplications": ["array of emerging uses"]
  },
  "safetyScore": number (0-100),
  "marketPotential": "Low" | "Medium" | "High" | "Very High",
  "summary": "brief 2-3 sentence summary"
}`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`AI gateway error: ${response.status} - ${errorText}`);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;
    
    if (!content) {
      console.error('No content in AI response');
      throw new Error('No response from AI');
    }

    console.log('AI response received, parsing JSON...');
    
    // Clean the response - remove markdown code blocks if present
    let cleanedContent = content.trim();
    if (cleanedContent.startsWith('```json')) {
      cleanedContent = cleanedContent.slice(7);
    } else if (cleanedContent.startsWith('```')) {
      cleanedContent = cleanedContent.slice(3);
    }
    if (cleanedContent.endsWith('```')) {
      cleanedContent = cleanedContent.slice(0, -3);
    }
    cleanedContent = cleanedContent.trim();

    const analysisData = JSON.parse(cleanedContent);
    
    console.log(`Successfully analyzed ${moleculeName}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        molecule: moleculeName,
        analysis: analysisData 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-molecule function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        success: false 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
