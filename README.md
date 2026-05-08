# Content Creation App: AI CareerTube Studio

A React + Tailwind web app for generating YouTube-ready career videos for job seekers in the AI-driven tech world. The app lets creators choose output dimensions, generate scripts and scenes, prepare captions, voiceover, thumbnails, metadata, and assemble a publish-ready video package.

## What It Includes

- Trend research dashboard for Reddit, LinkedIn, YouTube, GitHub, hiring reports, job descriptions, and interview experiences.
- Dimension-aware video generator for YouTube long-form, YouTube Shorts, square clips, and custom canvas sizes.
- Modular AI agent architecture for research, hooks, scripts, thumbnails, SEO, Shorts, interview insights, career coaching, and upload preparation.
- Long-form video package with titles, hook, full script structure, scene prompts, Canva prompts, voiceover notes, subtitles, B-roll, thumbnail prompt, SEO description, hashtags, keywords, and tags.
- YouTube-ready export checklist for MP4, captions, thumbnail, voiceover, and metadata.
- Shorts repurposing cards for turning long videos into 3 to 5 under-60-second clips.
- Pre-publish approval gate so uploading stays manual.
- Dark creator-studio UI with responsive layouts.

## Run Locally

```bash
npm install
npm run dev
```

If PowerShell blocks `npm`, use:

```bash
npm.cmd run dev
```

Build for production:

```bash
npm.cmd run build
```

The production build is written to `dist/` and uses relative asset paths, so `dist/index.html` can be opened directly if a dev server is not available.

## Deploy With GitHub Actions

This repo includes `.github/workflows/deploy-pages.yml`, which builds the Vite app and deploys `dist/` to GitHub Pages on every push to `main`.

In GitHub, open the repository settings and set:

- Pages source: `GitHub Actions`
- Branch: push changes to `main`

After the workflow finishes, the live URL appears in the workflow summary and the repository Pages settings.

## Suggested Backend Routes

- `POST /api/research`: collect source URLs, summarize trustworthy trends, and store citations.
- `POST /api/generate`: generate titles, hooks, scripts, scenes, Shorts, thumbnail prompts, and SEO.
- `POST /api/review`: save creator approval state in Supabase.
- `POST /api/voiceover`: prepare ElevenLabs voiceover text and settings.
- `POST /api/upload-draft`: create a YouTube draft payload, leaving publish manual.

## Automation Flow

1. n8n scheduled workflow gathers career and hiring signals.
2. OpenAI summarizes evidence and extracts interview insights.
3. Supabase stores source logs, generated packages, and approval state.
4. The app shows a pre-publish review.
5. After approval, YouTube metadata, captions, thumbnail, and voiceover assets are prepared for manual publishing.
