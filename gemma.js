async function explainCode(filename, code) {
  const panel = document.getElementById("panelExplanation");
  panel.innerHTML = `<div class="explain-loading"><span class="dot-anim">AI is reading your code</span></div>`;

  const prompt = `You are a Java DSA tutor. Explain this Java program called "${filename}" to a beginner learner.

Structure your response exactly like this (use these exact headings):

## What it does
One clear sentence about what this program does.

## How it works
Step by step explanation of the logic (2-4 steps max, keep it simple).

## Key concept
The main programming concept this program teaches.

## Time & Space Complexity
Only include this if it's a sorting or searching algorithm. Format: Time: O(...) | Space: O(...)

## Tip
One helpful tip for the learner to remember.

Keep it short, friendly and beginner-focused. No jargon without explanation.

Here is the code:
\`\`\`java
${code}
\`\`\``;

  try {
    const apiKey = typeof CONFIG !== "undefined" ? CONFIG.OPENROUTER_KEY : "";

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://github.com/nallaballenandini24-hue/Java-Practice",
        "X-Title": "Java Learning Tracker"
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b:free",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 600,
        temperature: 0.5
      })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err?.error?.message || "API error");
    }

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content || "No explanation returned.";
    renderExplanation(text);

  } catch (e) {
    panel.innerHTML = `
      <div class="explain-content">
        <p style="color: var(--accent2);">⚠️ Could not get explanation: ${e.message}</p>
        <p style="margin-top:12px; color: var(--muted);">Check your API key in config.js or try again.</p>
      </div>`;
  }
}

function renderExplanation(text) {
  const panel = document.getElementById("panelExplanation");

  let html = '<div class="explain-content">';
  const lines = text.split("\n");
  let inList = false;

  lines.forEach(line => {
    line = line.trim();
    if (!line) {
      if (inList) { html += "</ul>"; inList = false; }
      return;
    }

    if (line.startsWith("## ")) {
      if (inList) { html += "</ul>"; inList = false; }
      html += `<h4>${line.replace("## ", "")}</h4>`;
      return;
    }

    if (line.toLowerCase().startsWith("time:") || line.toLowerCase().includes("time: o(")) {
      if (inList) { html += "</ul>"; inList = false; }
      const timeMatch = line.match(/time:\s*(O\([^)]+\))/i);
      const spaceMatch = line.match(/space:\s*(O\([^)]+\))/i);
      if (timeMatch) html += `<span class="complexity-tag time">⏱ Time: ${timeMatch[1]}</span>`;
      if (spaceMatch) html += `<span class="complexity-tag space">💾 Space: ${spaceMatch[1]}</span>`;
      html += "<br>";
      return;
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      if (!inList) { html += "<ul>"; inList = true; }
      const content = line.replace(/^[-*]\s+/, "").replace(/`([^`]+)`/g, "<code>$1</code>");
      html += `<li>${content}</li>`;
      return;
    }

    if (/^\d+\.\s/.test(line)) {
      if (!inList) { html += "<ul>"; inList = true; }
      const content = line.replace(/^\d+\.\s+/, "").replace(/`([^`]+)`/g, "<code>$1</code>");
      html += `<li>${content}</li>`;
      return;
    }

    if (inList) { html += "</ul>"; inList = false; }
    const content = line.replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    html += `<p>${content}</p>`;
  });

  if (inList) html += "</ul>";
  html += "</div>";
  panel.innerHTML = html;
}