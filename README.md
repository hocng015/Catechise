# ✠ Catechise

A daily catechesis app for children and adults — the whole *Catechism of the
Catholic Church*, one small step at a time. Built as a **native mobile app for iOS
and Android** (Expo / React Native), with a web companion.

## What it does

- **Complete coverage of the Catechism.** The curriculum follows the Catechism's own
  four pillars — the Profession of Faith, the Celebration of the Christian Mystery,
  Life in Christ, and Christian Prayer. Every lesson is keyed to specific CCC
  paragraphs, and together the 85 lessons walk through all of ¶1–2865 (2nd edition,
  including the latest revisions, e.g. the 2018 text of ¶2267).
- **Personalized for every age.** Every lesson is written in three voices: **child**
  (ages 5–9), **youth** (10–15), and **adult** (16+). Create a profile per family
  member and switch between them anytime; each keeps its own progress, pace, streak,
  and journal. Any lesson can be flipped between voices on the spot — handy for
  parents teaching children.
- **Daily pacing.** Choose gentle (a lesson every other day), steady (one a day), or
  eager (two a day). The Today tab plans your day, tracks your streak, and estimates
  your finish date. Badges keep younger learners motivated.
- **Daily Gospel reflections.** The Gospel tab pulls the day's liturgical Gospel
  (with a built-in fallback passage when offline), offers age-appropriate reflection
  prompts, and keeps a private journal on your device.
- **Magisterium AI integration.** The Ask tab answers questions about the faith with
  citations from official Church documents, tuned to the learner's age. Each lesson
  has a "Go deeper" button, and the Gospel tab can generate a guided reflection —
  powered by [Magisterium AI](https://www.magisterium.com).

Each lesson includes: a tiered teaching, key points with CCC references, a memory
verse or prayer, a three-question quiz with explanations, a reflection question, and
a small concrete practice for the day.

## Repository layout

```
packages/shared/   The curriculum (85 lessons, all three voices), pacing, and
                   profile logic — pure TypeScript shared by both apps
mobile/            The iOS/Android app (Expo + expo-router)
web/               Web companion (Next.js), including a server-side
                   Magisterium AI proxy you can deploy for the household
```

## Running the mobile app (iOS & Android)

> **New to this?** [SETUP.md](SETUP.md) walks through everything from scratch —
> installing the tools, getting the app on your phone, and troubleshooting —
> with no experience assumed.

```bash
npm install
cd mobile
npx expo start
```

- Scan the QR code with the **Expo Go** app (iOS App Store / Google Play) to run it
  on your phone, or press `i` / `a` for an iOS simulator / Android emulator.
- For store-ready binaries, use [EAS Build](https://docs.expo.dev/build/introduction/):
  `npx eas build --platform ios` / `--platform android`.

**Enabling Magisterium AI on mobile:** create a key at
[magisterium.com](https://www.magisterium.com), then open **Settings** (gear icon on
the Today tab) and paste it. The key is stored in the device's secure storage
(Keychain / Keystore) and requests go directly to Magisterium. Everything else in
the app works fully without a key.

## Running the web companion

```bash
npm install
npm run web        # from the repo root
```

For AI features on the web, copy `web/.env.example` to `web/.env.local` and set
`MAGISTERIUM_API_KEY`; the key stays on the server behind `/api/magisterium`.

## A note on fidelity

Lesson texts summarize the Catechism faithfully at three reading levels and cite the
paragraphs they cover, so learners can always go to the source. This app is a study
companion, not a substitute for parish catechesis, the sacraments, or the Catechism
itself.

## License

This project is licensed under the
[PolyForm Noncommercial License 1.0.0](LICENSE.md). **Commercial use is not
permitted.** You are free to use, share, and adapt it for noncommercial purposes —
including personal study, family use, religious observance, and use by parishes,
charities, and schools.
