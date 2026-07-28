// api/analyze.js
export default async function handler(req, res) {
  // فقط متد POST قبول میشه
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { jobTitle, jobCode, jobLevel, organizationalUnit, jobDescription } = req.body;

    // اعتبارسنجی ساده
    if (!jobTitle?.trim()) throw new Error("عنوان پست الزامی است.");
    if (!jobLevel) throw new Error("سطح پست الزامی است.");
    if (!organizationalUnit?.trim()) throw new Error("واحد سازمانی الزامی است.");
    if (!jobDescription?.trim() || jobDescription.trim().length < 40) {
      throw new Error("شرح شغل باید حداقل ۴۰ کاراکتر باشد.");
    }

    // کلید API از محیط (Environment Variable) خونده میشه
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "کلید API در سرور تنظیم نشده است." });
    }

    // پرامپت سیستم (همون کد قبلی)
    const systemPrompt = شما موتور تحلیل شایستگی هستید. فقط یک JSON معتبر برگردانید با کلیدهای: shaydaScore, matchScore, riskScore, riskLevel, jobSummary, riskExplanation, competencies, technicalSkills, behavioralSkills, softwareSkills, strengths, developmentRoadmap, trainingCourses, improvementAreas, managementRecommendation, analysisExplanation;

    const userPrompt = عنوان: ${jobTitle}\nسطح: ${jobLevel}\nواحد: ${organizationalUnit}\nشرح شغل: ${jobDescription};

    // فراخوانی Anthropic
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 4000,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }]
      })
    });

    const data = await response.json();
    const text = data.content.find(b => b.type === "text").text;
    const cleaned = text.replace(/`json\s*/i, "").replace(/```\s*$/i, "").trim();
    const analysis = JSON.parse(cleaned);

    // اضافه کردن اطلاعات پست
    analysis.postTitle = jobTitle.trim();
    analysis.postCode = jobCode?.trim() || "—";
    analysis.postLevel = jobLevel;
    analysis.organizationalUnit = organizationalUnit;

    res.status(200).json({ success: true, analysis });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message || "خطای ناشناخته" });
  }
}
