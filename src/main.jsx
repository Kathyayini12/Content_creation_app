import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BadgeCheck,
  Bot,
  BrainCircuit,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  Clapperboard,
  Cloud,
  FileText,
  Github,
  GraduationCap,
  Lightbulb,
  Linkedin,
  ListChecks,
  MessageSquareText,
  Mic2,
  Play,
  RefreshCw,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Tags,
  Upload,
  Video,
  Wand2,
  Youtube,
  Zap
} from "lucide-react";
import "./styles.css";

const topics = [
  "Why 90% of resumes get rejected",
  "Top DevOps interview mistakes",
  "How recruiters scan LinkedIn profiles",
  "Body language mistakes killing your interviews",
  "How to answer tell me about yourself",
  "Top AI skills to learn in 2026",
  "Public speaking tips for introverts",
  "Cloud interview roadmap",
  "How to sound confident in technical interviews"
];

const audience = [
  "Students",
  "Fresh graduates",
  "Career switchers",
  "DevOps learners",
  "Cloud learners",
  "Cybersecurity beginners",
  "AI/ML aspirants"
];

const agentList = [
  { name: "Trend Research Agent", icon: Search, status: "Researching Reddit, LinkedIn, YouTube, GitHub, blogs, job posts" },
  { name: "Interview Insight Agent", icon: MessageSquareText, status: "Extracting rejection patterns, recruiter advice, question banks" },
  { name: "Script Writer Agent", icon: FileText, status: "Writing beginner-friendly career stories with practical examples" },
  { name: "Hook Generator Agent", icon: Zap, status: "Testing curiosity, urgency, humor, and career anxiety angles" },
  { name: "Thumbnail Agent", icon: Clapperboard, status: "Designing high-contrast CTR concepts with minimal clutter" },
  { name: "SEO Agent", icon: Tags, status: "Optimizing tags, description, hashtags, keywords, and retention signals" },
  { name: "Shorts Repurposing Agent", icon: Play, status: "Converting long-form chapters into 3 to 5 caption-first Shorts" },
  { name: "Career Coach Agent", icon: GraduationCap, status: "Checking tone, confidence, practical value, and authenticity" },
  { name: "YouTube Upload Assistant", icon: Upload, status: "Preparing metadata, captions, thumbnail, and manual publish gate" }
];

const sourceTypes = [
  { label: "Reddit", icon: MessageSquareText, quality: "Real learner pain points" },
  { label: "LinkedIn", icon: Linkedin, quality: "Recruiter and hiring manager advice" },
  { label: "YouTube Trends", icon: Youtube, quality: "Search demand and retention formats" },
  { label: "GitHub Trends", icon: Github, quality: "Requested tools and project signals" },
  { label: "Hiring Reports", icon: BadgeCheck, quality: "Market-backed skill direction" },
  { label: "Job Descriptions", icon: ListChecks, quality: "Technology and soft skill frequency" }
];

const formatOptions = [
  { id: "long", label: "Long-form", detail: "5 to 10 min" },
  { id: "shorts", label: "Shorts", detail: "Under 60 sec" },
  { id: "both", label: "Full package", detail: "Video plus Shorts" }
];

const dimensionPresets = [
  { id: "youtube", label: "YouTube Video", size: "1920 x 1080", width: 1920, height: 1080, ratio: "16:9", use: "Long-form upload" },
  { id: "short", label: "YouTube Short", size: "1080 x 1920", width: 1080, height: 1920, ratio: "9:16", use: "Shorts feed" },
  { id: "square", label: "Square Clip", size: "1080 x 1080", width: 1080, height: 1080, ratio: "1:1", use: "Repurposed social cut" },
  { id: "custom", label: "Custom", size: "Manual", width: 1280, height: 720, ratio: "Custom", use: "Creator-defined render" }
];

const sampleInsights = [
  "Recruiters skim for role match, project proof, metrics, and keywords before reading details.",
  "Entry-level candidates are often rejected for vague bullets, tool lists without outcomes, and weak explanations of projects.",
  "AI-era hiring favors people who can explain tradeoffs, use automation responsibly, and communicate clearly with non-technical teams.",
  "Interviewers reward candidates who define terms simply, narrate their thinking, and admit uncertainty with a recovery plan."
];

const integrations = [
  { name: "OpenAI API", role: "Research synthesis, scripts, hooks, SEO, Shorts", icon: Sparkles },
  { name: "Supabase", role: "Projects, approvals, generated assets, source logs", icon: Cloud },
  { name: "n8n self-hosted", role: "Scheduled research and publish preparation workflows", icon: RefreshCw },
  { name: "ElevenLabs free", role: "Voiceover text handoff and narration settings", icon: Mic2 },
  { name: "Canva free", role: "Animated slide prompts and thumbnail layouts", icon: Clapperboard },
  { name: "YouTube Data API", role: "Metadata upload draft with manual publish control", icon: Youtube }
];

const generatedPackage = {
  titles: [
    "Why Your Tech Resume Gets Rejected in 7 Seconds",
    "Stop Writing Resumes Like a Software Manual",
    "The AI-Era Resume Fix Recruiters Actually Notice"
  ],
  hook:
    "If your resume says 'hardworking team player with Python skills,' congratulations, you have described 48,000 people and one very ambitious toaster.",
  script: [
    { label: "Hook", text: "Open with a funny recruiter scan: hundreds of resumes, one coffee, and seven seconds to decide who gets a closer look." },
    { label: "Problem", text: "Most beginner resumes list tools, classes, and responsibilities, but hiring teams need evidence that you can solve job-like problems." },
    { label: "Real-world example", text: "Compare 'Used AWS' with 'Deployed a containerized API to AWS, added health checks, and reduced manual setup to one command.'" },
    { label: "Step-by-step guidance", text: "Pick the target role, mirror legitimate job description language, rewrite bullets with action plus tool plus outcome, then place your strongest project above weaker filler." },
    { label: "Terminology", text: "Explain keywords like CI/CD, IAM, vector database, incident response, and model evaluation in plain language before using them confidently." },
    { label: "Motivation", text: "You do not need ten years of experience to show clarity. You need proof, context, and a resume that respects the reader's time." },
    { label: "Action tips", text: "Add project links, measurable outcomes, role-specific keywords, one clean summary, and a skills section that matches the jobs you actually want." },
    { label: "Mistakes to avoid", text: "Avoid fake expertise, giant paragraphs, unrelated certificates, broken links, and copying AI-generated bullets without checking truth." },
    { label: "CTA", text: "Comment the role you want, and the next video will turn that role into a resume checklist." }
  ],
  scenes: [
    "Fast zoom on a recruiter inbox with resume cards flying in.",
    "Split screen: weak bullet vs strong bullet, highlighted like a code review.",
    "Animated roadmap: job post to keywords to proof to interview invite.",
    "Friendly mentor character translating technical terms into plain English.",
    "Checklist finale with resume, LinkedIn, project proof, and mock interview blocks."
  ],
  seo: {
    description:
      "Learn how to build an AI-era tech resume that recruiters can understand quickly. This video covers beginner-friendly resume structure, project proof, technical keywords, common rejection mistakes, and practical examples for students, fresh graduates, DevOps learners, cloud learners, cybersecurity beginners, and AI/ML aspirants.",
    hashtags: ["#TechResume", "#AIJobs", "#CareerAdvice", "#DevOps", "#EntryLevelTech"],
    keywords: ["entry level tech resume", "AI era jobs", "resume mistakes", "cloud resume", "DevOps resume", "LinkedIn optimization"],
    tags: ["resume tips", "tech careers", "job seekers", "AI jobs", "interview preparation", "career switcher", "cloud careers"]
  },
  thumbnail: {
    text: "RESUME REJECTED?",
    prompt:
      "Bright yellow and electric teal YouTube thumbnail, worried job seeker holding resume, recruiter scan timer at 7 seconds, bold text 'RESUME REJECTED?', clean tech dashboard background, high contrast, expressive face, minimal clutter."
  },
  voiceover:
    "Use a warm, energetic mentor voice. Keep sentences short. Add a smile on the humor line, then slow down slightly when explaining the strong resume bullet.",
  subtitles:
    "Caption-first style with 4 to 7 words per line. Highlight keywords: rejected, proof, keywords, project, outcome, interview.",
  broll: ["Resume heatmap", "LinkedIn profile scan", "Job description keyword highlights", "GitHub project demo", "Mock interview setup"],
  canva: [
    "Animated inbox avalanche with resume cards",
    "Before and after resume bullet slide",
    "Three-step AI-era resume formula",
    "Common mistakes warning wall",
    "Final checklist with CTA"
  ],
  shorts: [
    { title: "The 7-second resume test", hook: "Your resume has less time than a microwave burrito.", tip: "Put role match and project proof in the first third." },
    { title: "Stop listing tools like groceries", hook: "Python, AWS, Docker... cool. What did they do?", tip: "Connect every tool to an outcome." },
    { title: "The bullet formula", hook: "This one sentence can rescue a weak resume.", tip: "Action + tool + context + result." },
    { title: "The fake expertise trap", hook: "Do not let AI make you sound senior in a topic you cannot explain.", tip: "Use truthful terms you can defend in an interview." }
  ]
};

const exportAssets = [
  "Rendered MP4 video with selected dimensions",
  "SRT caption file",
  "Voiceover script for ElevenLabs",
  "Canva scene prompt list",
  "CapCut editing checklist",
  "YouTube title, description, hashtags, and tags",
  "Thumbnail text and design prompt"
];

function App() {
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [format, setFormat] = useState("both");
  const [approved, setApproved] = useState(false);
  const [activeTab, setActiveTab] = useState("script");
  const [tone, setTone] = useState(72);
  const [dimension, setDimension] = useState("short");
  const [customWidth, setCustomWidth] = useState(1280);
  const [customHeight, setCustomHeight] = useState(720);

  const completion = useMemo(() => (approved ? 92 : 74), [approved]);
  const currentFormat = formatOptions.find((item) => item.id === format);
  const selectedDimension = dimensionPresets.find((item) => item.id === dimension);
  const renderSpec = useMemo(() => {
    const width = dimension === "custom" ? Number(customWidth) || 1280 : selectedDimension.width;
    const height = dimension === "custom" ? Number(customHeight) || 720 : selectedDimension.height;
    return {
      width,
      height,
      ratio: dimension === "custom" ? `${width}:${height}` : selectedDimension.ratio,
      label: dimension === "custom" ? "Custom YouTube render" : selectedDimension.label
    };
  }, [customHeight, customWidth, dimension, selectedDimension]);

  return (
    <main className="min-h-screen bg-[#070b12] text-slate-100">
      <div className="app-shell">
        <aside className="sidebar">
          <div className="brand">
            <div className="brand-mark">
              <BrainCircuit size={26} />
            </div>
            <div>
              <p className="brand-kicker">AI CareerTube</p>
              <h1>Creator Studio</h1>
            </div>
          </div>
          <nav className="nav-list">
            {[
              ["Dashboard", Sparkles],
              ["Research", Search],
              ["Scripts", FileText],
              ["Thumbnails", Clapperboard],
              ["Shorts", Play],
              ["Upload", Upload]
            ].map(([label, Icon]) => (
              <button className={label === "Dashboard" ? "nav-item active" : "nav-item"} key={label}>
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
          <div className="sidebar-panel">
            <div className="flex items-center gap-2 text-teal-200">
              <ShieldCheck size={18} />
              <span className="text-sm font-semibold">Source Guard</span>
            </div>
            <p>Outputs are structured to cite legitimate sources, separate research from opinion, and flag claims that need verification.</p>
          </div>
        </aside>

        <section className="content">
          <header className="topbar">
            <div>
              <p className="eyebrow">Career mentor plus YouTube automation studio</p>
              <h2>Generate YouTube-ready career videos in the exact dimensions you need.</h2>
            </div>
            <div className="top-actions">
              <button className="icon-button" aria-label="Refresh research">
                <RefreshCw size={18} />
              </button>
              <button className="primary-button">
                <Wand2 size={18} />
                Generate video
              </button>
            </div>
          </header>

          <section className="hero-grid">
            <div className="studio-panel generator-panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Video brief</p>
                  <h3>Video Generator</h3>
                </div>
                <span className="pill">{currentFormat.detail}</span>
              </div>

              <label className="field-label" htmlFor="topic">Topic</label>
              <select id="topic" value={selectedTopic} onChange={(event) => setSelectedTopic(event.target.value)} className="select-input">
                {topics.map((topic) => (
                  <option key={topic}>{topic}</option>
                ))}
              </select>

              <div className="segmented" role="group" aria-label="Video format">
                {formatOptions.map((option) => (
                  <button
                    key={option.id}
                    className={format === option.id ? "segment active" : "segment"}
                    onClick={() => setFormat(option.id)}
                  >
                    <span>{option.label}</span>
                    <small>{option.detail}</small>
                  </button>
                ))}
              </div>

              <label className="field-label" htmlFor="tone">Humor and motivation balance</label>
              <input id="tone" className="slider" type="range" min="0" max="100" value={tone} onChange={(event) => setTone(event.target.value)} />

              <label className="field-label">Output dimensions</label>
              <div className="dimension-grid">
                {dimensionPresets.map((preset) => (
                  <button
                    key={preset.id}
                    className={dimension === preset.id ? "dimension-card active" : "dimension-card"}
                    onClick={() => setDimension(preset.id)}
                  >
                    <strong>{preset.label}</strong>
                    <span>{preset.size}</span>
                    <small>{preset.use}</small>
                  </button>
                ))}
              </div>

              {dimension === "custom" && (
                <div className="custom-size-row">
                  <label>
                    Width
                    <input value={customWidth} min="320" type="number" onChange={(event) => setCustomWidth(event.target.value)} />
                  </label>
                  <label>
                    Height
                    <input value={customHeight} min="320" type="number" onChange={(event) => setCustomHeight(event.target.value)} />
                  </label>
                </div>
              )}

              <div className="audience-row">
                {audience.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <div className="studio-panel output-panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">YouTube-ready render</p>
                  <h3>{selectedTopic}</h3>
                </div>
                <div className="score-ring" style={{ "--score": `${completion}%` }}>
                  {completion}%
                </div>
              </div>
              <div className="metric-grid">
                <Metric label="Canvas" value={`${renderSpec.width} x ${renderSpec.height}`} icon={Video} />
                <Metric label="Aspect ratio" value={renderSpec.ratio} icon={CalendarCheck} />
                <Metric label="Upload status" value="YouTube ready" icon={BadgeCheck} />
              </div>
              <div className="video-preview-shell">
                <div className="video-preview" style={{ aspectRatio: `${renderSpec.width} / ${renderSpec.height}` }}>
                  <div>
                    <span>{renderSpec.label}</span>
                    <strong>{renderSpec.width} x {renderSpec.height}</strong>
                    <small>MP4 + captions + metadata</small>
                  </div>
                </div>
              </div>
              <div className="approval-strip">
                <div>
                  <p>Pre-publish approval</p>
                  <span>{approved ? "Approved for upload assistant" : "Waiting for human review"}</span>
                </div>
                <button className={approved ? "approved-button" : "review-button"} onClick={() => setApproved(!approved)}>
                  <CheckCircle2 size={18} />
                  {approved ? "Approved" : "Approve"}
                </button>
              </div>
            </div>
          </section>

          <section className="research-band">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Trend Research Engine</p>
                <h3>Legitimate signals to collect before writing</h3>
              </div>
              <button className="ghost-button">
                <Search size={16} />
                Research brief
              </button>
            </div>
            <div className="source-grid">
              {sourceTypes.map(({ label, icon: Icon, quality }) => (
                <article className="source-card" key={label}>
                  <Icon size={20} />
                  <strong>{label}</strong>
                  <span>{quality}</span>
                </article>
              ))}
            </div>
            <div className="insight-grid">
              {sampleInsights.map((insight) => (
                <article key={insight}>
                  <Lightbulb size={17} />
                  <p>{insight}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="pipeline-band">
            <div>
              <p className="eyebrow">Free-tool video pipeline</p>
              <h3>Dimension-aware video export</h3>
            </div>
            <div className="pipeline-steps">
              {["Research", "Script", "Scenes", "Voiceover", "Render", "Upload pack"].map((step, index) => (
                <article key={step}>
                  <span>{index + 1}</span>
                  <strong>{step}</strong>
                </article>
              ))}
            </div>
          </section>

          <section className="main-grid">
            <div className="studio-panel">
              <div className="tabs" role="tablist" aria-label="Generated package">
                {["script", "video", "export", "seo", "shorts"].map((tab) => (
                  <button key={tab} className={activeTab === tab ? "tab active" : "tab"} onClick={() => setActiveTab(tab)}>
                    {tab}
                  </button>
                ))}
              </div>
              <PackageView activeTab={activeTab} renderSpec={renderSpec} />
            </div>

            <div className="studio-panel agents-panel">
              <div className="section-heading compact">
                <div>
                  <p className="eyebrow">AI Agents Architecture</p>
                  <h3>Modular workflow</h3>
                </div>
                <Bot className="text-teal-300" size={24} />
              </div>
              <div className="agent-list">
                {agentList.map(({ name, icon: Icon, status }) => (
                  <article className="agent-item" key={name}>
                    <div className="agent-icon">
                      <Icon size={18} />
                    </div>
                    <div>
                      <strong>{name}</strong>
                      <span>{status}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="upload-row">
            <div>
              <p className="eyebrow">YouTube Upload Assistant</p>
              <h3>Manual publish gate stays under creator control.</h3>
              <p>After approval, the assistant prepares the rendered MP4 spec, title, description, hashtags, tags, thumbnail, captions, subtitles, and voiceover files for YouTube Studio.</p>
            </div>
            <button className="primary-button" disabled={!approved}>
              <Upload size={18} />
              Prepare upload
            </button>
          </section>

          <section className="integration-band">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Production architecture</p>
                <h3>API and automation handoff points</h3>
              </div>
            </div>
            <div className="integration-grid">
              {integrations.map(({ name, role, icon: Icon }) => (
                <article key={name}>
                  <Icon size={20} />
                  <strong>{name}</strong>
                  <span>{role}</span>
                </article>
              ))}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

function Metric({ label, value, icon: Icon }) {
  return (
    <article className="metric-card">
      <Icon size={18} />
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function PackageView({ activeTab, renderSpec }) {
  if (activeTab === "video") {
    return (
      <div className="package-content">
        <ContentBlock title="Scene-by-scene breakdown" items={generatedPackage.scenes} />
        <ContentBlock title="Canva slide prompts" items={generatedPackage.canva} />
        <ContentBlock title="Voiceover direction" items={[generatedPackage.voiceover]} />
        <ContentBlock title="B-roll suggestions" items={generatedPackage.broll} />
      </div>
    );
  }

  if (activeTab === "export") {
    return (
      <div className="package-content">
        <div className="export-spec">
          <div>
            <span>Final video dimensions</span>
            <h4>{renderSpec.width} x {renderSpec.height}</h4>
            <p>Export as MP4, H.264 video, AAC audio, 30fps or 60fps, with safe captions inside the visible frame.</p>
          </div>
          <div className="export-badge">
            <Video size={30} />
            <strong>{renderSpec.ratio}</strong>
          </div>
        </div>
        <ContentBlock title="YouTube-ready assets" items={exportAssets} />
        <ContentBlock
          title="Render checklist"
          items={[
            `Canvas size locked to ${renderSpec.width} x ${renderSpec.height}`,
            "Captions stay inside mobile safe zones",
            "Thumbnail text is readable at small size",
            "First 3 seconds contain motion, face, or bold caption",
            "Audio peaks are clean and voice is louder than music",
            "Export package is reviewed before upload"
          ]}
        />
      </div>
    );
  }

  if (activeTab === "seo") {
    return (
      <div className="package-content">
        <div className="title-stack">
          {generatedPackage.titles.map((title) => (
            <button key={title}>
              <Youtube size={17} />
              {title}
              <ChevronRight size={16} />
            </button>
          ))}
        </div>
        <div className="seo-box">
          <h4>SEO description</h4>
          <p>{generatedPackage.seo.description}</p>
        </div>
        <TagCloud title="Hashtags" tags={generatedPackage.seo.hashtags} />
        <TagCloud title="Search keywords" tags={generatedPackage.seo.keywords} />
        <TagCloud title="YouTube tags" tags={generatedPackage.seo.tags} />
      </div>
    );
  }

  if (activeTab === "shorts") {
    return (
      <div className="shorts-grid">
        {generatedPackage.shorts.map((short) => (
          <article className="short-card" key={short.title}>
            <span>Short</span>
            <h4>{short.title}</h4>
            <p>{short.hook}</p>
            <strong>{short.tip}</strong>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div className="package-content">
      <div className="hook-card">
        <Sparkles size={18} />
        <p>{generatedPackage.hook}</p>
      </div>
      <div className="script-list">
        {generatedPackage.script.map((part) => (
          <article key={part.label}>
            <span>{part.label}</span>
            <p>{part.text}</p>
          </article>
        ))}
      </div>
      <div className="thumbnail-card">
        <div>
          <span>Thumbnail text</span>
          <h4>{generatedPackage.thumbnail.text}</h4>
          <p>{generatedPackage.thumbnail.prompt}</p>
        </div>
        <div className="thumbnail-preview">
          <Cloud size={34} />
          <strong>RESUME</strong>
          <span>REJECTED?</span>
        </div>
      </div>
    </div>
  );
}

function ContentBlock({ title, items }) {
  return (
    <div className="content-block">
      <h4>{title}</h4>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function TagCloud({ title, tags }) {
  return (
    <div className="tag-cloud">
      <h4>{title}</h4>
      <div>
        {tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
