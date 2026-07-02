# ✠ Catechise

A daily catechesis companion for children and adults — the whole *Catechism of the
Catholic Church*, one small step at a time.

## What it does

- **Complete coverage of the Catechism.** The curriculum follows the Catechism's own
  four pillars — the Profession of Faith, the Celebration of the Christian Mystery,
  Life in Christ, and Christian Prayer. Every lesson is keyed to specific CCC
  paragraphs, and together the lessons walk through all of ¶1–2865 (2nd edition,
  including the latest revisions).
- **Personalized for every age.** Every lesson is written in three voices: **child**
  (ages 5–9), **youth** (10–15), and **adult** (16+). Create a profile per family
  member and switch between them anytime; each keeps its own progress, pace, streak,
  and journal. You can also flip any lesson between voices on the spot — handy for
  parents teaching children.
- **Daily pacing.** Choose gentle (a lesson every other day), steady (one a day), or
  eager (two a day). The Today page plans your day, tracks your streak, and estimates
  your finish date. Badges keep younger learners motivated.
- **Daily Gospel reflections.** The Gospel page pulls the day's liturgical Gospel
  (with a built-in fallback passage when offline), offers age-appropriate reflection
  prompts, and keeps a private journal on your device.
- **Magisterium AI integration.** An "Ask" chat answers questions about the faith
  with citations from official Church documents, tuned to the learner's age. Each
  lesson has a "Go deeper" button, and the Gospel page can generate a guided
  reflection — all powered by [Magisterium AI](https://www.magisterium.com).

Each lesson includes: a tiered teaching, key points with CCC references, a memory
verse or prayer, a three-question quiz with explanations, a reflection question, and
a small concrete practice for the day.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 and create your first learner profile.

### Enabling Magisterium AI

1. Create an account and API key at [magisterium.com](https://www.magisterium.com).
2. Copy `.env.example` to `.env.local` and set `MAGISTERIUM_API_KEY`.
3. Restart the dev server.

Without a key, the rest of the app works fully; the AI features show a friendly
setup hint. The key stays on the server — requests are proxied through
`/api/magisterium` and never expose it to the browser.

## Where things live

```
src/data/types.ts             Lesson/Unit/Pillar schema
src/data/curriculum/          The full curriculum (one file per pillar section)
src/lib/pacing.ts             Daily plan, streaks, estimates
src/lib/storage.ts            Profiles & progress (localStorage; no account needed)
src/app/                      Pages: Today, Curriculum, Lesson, Gospel, Ask, Progress
src/app/api/magisterium/      Server-side proxy to Magisterium AI
src/app/api/gospel/           Daily Gospel (lectionary + fallback)
```

## A note on fidelity

Lesson texts summarize the Catechism faithfully at three reading levels and cite the
paragraphs they cover, so learners can always go to the source. This app is a study
companion, not a substitute for parish catechesis, the sacraments, or the Catechism
itself.
