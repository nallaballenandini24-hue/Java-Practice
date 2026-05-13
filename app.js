// ── app.js ──
// Fetches Java files from GitHub and renders the tracker

const REPO = "nallaballenandini24-hue/Java-Practice";
const GITHUB_API = `https://api.github.com/repos/${REPO}/contents`;
const RAW_BASE   = `https://raw.githubusercontent.com/${REPO}/main`;

// ── Topic definitions ──
const TOPICS = [
  {
    name: "Basics & I/O",
    icon: "📥",
    keywords: ["input", "output", "hello", "variable", "datatype"],
    coming: ["DataTypes.java", "HelloWorld.java"]
  },
  {
    name: "Conditionals",
    icon: "🔀",
    keywords: ["even", "odd", "pass", "fail", "leap", "vote", "eligible",
               "check", "grade", "divisible", "absolute", "character",
               "large", "middle", "triangle", "switch", "arthematic", "number"],
    coming: []
  },
  {
    name: "Real-world Programs",
    icon: "🏧",
    keywords: ["atm", "electricity", "bill", "bank", "library"],
    coming: ["LibrarySystem.java"]
  },
  {
    name: "Arrays",
    icon: "📦",
    keywords: ["array", "pair"],
    coming: ["ArrayRotation.java", "MaxSubarray.java"]
  },
  {
    name: "Searching",
    icon: "🔍",
    keywords: ["search", "linear", "binary", "jump"],
    coming: ["JumpSearch.java", "TernarySearch.java"]
  },
  {
    name: "Sorting",
    icon: "🔃",
    keywords: ["sort", "bubble", "selection", "insertion", "merge", "quick", "heap"],
    coming: ["SelectionSort.java", "InsertionSort.java", "MergeSort.java", "QuickSort.java"]
  },
  {
    name: "Strings",
    icon: "🔤",
    keywords: ["string", "reverse", "palindrome", "anagram", "vowel", "count"],
    coming: ["ReverseString.java", "PalindromeCheck.java", "AnagramCheck.java"]
  },
  {
    name: "Recursion",
    icon: "🔁",
    keywords: ["recursion", "factorial", "fibonacci", "fib", "power"],
    coming: ["Factorial.java", "FibonacciRecursion.java", "PowerRecursion.java"]
  },
  {
    name: "Linked List",
    icon: "🔗",
    keywords: ["linked", "node", "list"],
    coming: ["LinkedList.java", "ReverseLinkedList.java", "DetectLoop.java"]
  },
  {
    name: "Stacks & Queues",
    icon: "📚",
    keywords: ["stack", "queue", "deque", "balanced", "bracket"],
    coming: ["Stack.java", "Queue.java", "BalancedBrackets.java"]
  }
];

function matchTopic(filename) {
  const lower = filename.toLowerCase().replace(".java", "");
  for (const topic of TOPICS) {
    if (topic.keywords.some(k => lower.includes(k))) return topic.name;
  }
  return "Other";
}

// ── Side Panel ──
function openPanel(filename, downloadUrl, filePath) {
  document.getElementById("panelFilename").textContent = filename;
  document.getElementById("panelCode").textContent = "// loading...";
  document.getElementById("panelExplanation").innerHTML =
    `<div class="explain-loading"><span class="dot-anim">Fetching code</span></div>`;

  document.getElementById("sidePanel").classList.add("open");
  document.getElementById("panelOverlay").classList.add("open");

  // Use the full path so subfolders work correctly
  const fetchPath = filePath || filename;

  fetch(`${RAW_BASE}/${fetchPath}`)
    .then(r => {
      if (!r.ok) throw new Error("File not found: " + fetchPath);
      return r.text();
    })
    .then(code => {
      document.getElementById("panelCode").textContent = code;
      explainCode(filename, code); // calls gemma.js
    })
    .catch(err => {
      document.getElementById("panelCode").textContent = "// Could not load code.\n// " + err.message;
      document.getElementById("panelExplanation").innerHTML =
        `<div class="explain-content"><p style="color:var(--accent2);">⚠️ Could not fetch the file. Check that it exists in the repo.</p></div>`;
    });
}

function closePanel() {
  document.getElementById("sidePanel").classList.remove("open");
  document.getElementById("panelOverlay").classList.remove("open");
}

document.getElementById("panelClose").addEventListener("click", closePanel);
document.getElementById("panelOverlay").addEventListener("click", closePanel);

// ── Main render ──
function render(files) {
  const map = {};
  TOPICS.forEach(t => { map[t.name] = { ...t, files: [] }; });
  map["Other"] = { name: "Other", icon: "📄", files: [], coming: [] };

  files.forEach(f => {
    const topic = matchTopic(f.name);
    if (!map[topic]) map[topic] = { name: topic, icon: "📄", files: [], coming: [] };
    map[topic].files.push({
      name: f.name,
      url: f.download_url,
      path: f.path  // full relative path e.g. "Conditionals/AbsoluteValue.java"
    });
  });

  // Stats
  const total      = files.length;
  const topicsDone = TOPICS.filter(t => map[t.name]?.files.length > 0).length;
  const topicsLeft = TOPICS.length - topicsDone;
  const pct        = Math.round((topicsDone / TOPICS.length) * 100);

  document.getElementById("totalFiles").textContent  = total;
  document.getElementById("topicsDone").textContent  = topicsDone;
  document.getElementById("topicsLeft").textContent  = topicsLeft;
  document.getElementById("progressPct").textContent = pct + "%";
  document.getElementById("progressLabel").textContent = `${topicsDone} of ${TOPICS.length} topics`;

  setTimeout(() => {
    document.getElementById("progressFill").style.width = pct + "%";
  }, 300);

  // Build cards
  let html = '<div class="topics-grid">';

  TOPICS.forEach(t => {
    const data = map[t.name];
    const comingFiltered = (t.coming || []).filter(c => !data.files.some(f => f.name === c));

    html += `<div class="topic-card">`;
    html += `
      <div class="topic-header">
        <div class="topic-icon">${t.icon}</div>
        <div class="topic-name">${t.name}</div>
        <div class="topic-count">${data.files.length} done</div>
      </div>
      <div class="topic-files">`;

    // Done files — clickable
    data.files.forEach(f => {
      // Escape path for safe use in onclick attribute
      const safePath = f.path.replace(/'/g, "\\'");
      html += `
        <div class="file-item" onclick="openPanel('${f.name}', '${f.url}', '${safePath}')">
          <div class="file-dot done"></div>
          <div class="file-name">${f.name}</div>
          <span class="file-badge done">✓ done</span>
        </div>`;
    });

    // Coming soon files
    comingFiltered.forEach(f => {
      html += `
        <div class="file-item soon">
          <div class="file-dot soon"></div>
          <div class="file-name soon">${f}</div>
          <span class="file-badge soon">soon</span>
        </div>`;
    });

    if (data.files.length === 0 && comingFiltered.length === 0) {
      html += `<div class="coming-soon-msg">not started yet</div>`;
    }

    html += `</div></div>`;
  });

  // Other / uncategorized
  if (map["Other"].files.length > 0) {
    html += `<div class="topic-card">
      <div class="topic-header">
        <div class="topic-icon">📄</div>
        <div class="topic-name">Other</div>
        <div class="topic-count">${map["Other"].files.length}</div>
      </div>
      <div class="topic-files">`;
    map["Other"].files.forEach(f => {
      const safePath = f.path.replace(/'/g, "\\'");
      html += `
        <div class="file-item" onclick="openPanel('${f.name}', '${f.url}', '${safePath}')">
          <div class="file-dot done"></div>
          <div class="file-name">${f.name}</div>
          <span class="file-badge new">new</span>
        </div>`;
    });
    html += `</div></div>`;
  }

  html += "</div>";
  document.getElementById("content").innerHTML = html;
}

// ── Fetch from GitHub (root + all subfolders) ──
async function loadRepo() {
  try {
    const res = await fetch(GITHUB_API);
    if (!res.ok) throw new Error("GitHub API error " + res.status);
    const items = await res.json();

    // Root-level Java files
    const rootFiles = items
      .filter(f => f.type === "file" && f.name.endsWith(".java"));

    // Subfolders
    const folders = items.filter(f => f.type === "dir");

    // Fetch each subfolder's contents in parallel
    const folderFetches = folders.map(folder =>
      fetch(`${GITHUB_API}/${folder.name}`)
        .then(r => r.json())
        .then(contents =>
          contents
            .filter(f => f.type === "file" && f.name.endsWith(".java"))
        )
        .catch(() => []) // if a folder fails, skip it gracefully
    );

    const nested = (await Promise.all(folderFetches)).flat();

    const allFiles = [...rootFiles, ...nested];

    if (allFiles.length === 0) {
      document.getElementById("content").innerHTML =
        `<div class="loading">No Java files found in the repo yet.</div>`;
      return;
    }

    render(allFiles);
  } catch (e) {
    document.getElementById("content").innerHTML =
      `<div class="loading">⚠️ Could not fetch repo: ${e.message}</div>`;
  }
}

loadRepo();