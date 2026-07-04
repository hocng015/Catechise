# Setting up Catechise on your computer

This guide assumes **no experience with programming tools**. Follow it top to
bottom and you will have the app running on your own phone in about 15 minutes.

You need:

- A computer (Windows or Mac)
- Your phone (iPhone or Android)
- Both on the **same Wi-Fi network**

---

## Step 1 — Install Node.js (one time)

Node.js is the engine that runs the project on your computer.

1. Go to <https://nodejs.org>
2. Download the big green **LTS** button ("Long Term Support")
3. Run the installer and accept all the defaults

To check it worked: open a terminal — on **Windows** press the Start key and
type `PowerShell`; on **Mac** press Cmd+Space and type `Terminal` — then type:

```
node --version
```

You should see a version number like `v22.x.x`. (If you get "not recognized",
close the terminal and open a new one — it only picks up new installs on
launch.)

## Step 2 — Install Git (one time)

Git downloads the project and keeps it up to date.

- **Windows:** download from <https://git-scm.com/download/win>, run the
  installer, accept all the defaults.
- **Mac:** in the Terminal, type `git --version`. If it is not installed, your
  Mac will offer to install it — click Install.

## Step 3 — Install Expo Go on your phone (one time)

Search for **Expo Go** in the App Store (iPhone) or Google Play (Android) and
install it. It is free. This app lets your phone run Catechise instantly,
without going through the app stores.

## Step 4 — Download the project

In your terminal, type these three lines, pressing Enter after each:

```
git clone https://github.com/hocng015/Catechise.git
cd Catechise
npm install
```

The last command downloads everything the project needs. It takes a few
minutes and prints a lot of text — that is normal.

> **Windows note:** if `npm` gives an error about "running scripts is
> disabled", run this once in PowerShell and try again:
> `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`

## Step 5 — Start the app

```
cd mobile
npx expo start
```

After a moment a **QR code** appears in the terminal.

- **iPhone:** open the normal Camera app, point it at the QR code, and tap the
  yellow banner that appears.
- **Android:** open the Expo Go app and tap **Scan QR code**.

The app loads on your phone in a few seconds. Create a learner profile and
explore — lessons, quizzes, the games on the Play tab, the daily Gospel, and
streaks all work immediately.

**When you are done:** press `Ctrl+C` in the terminal to stop. Next time, you
only need Step 5 (from inside the `Catechise` folder: `cd mobile`, then
`npx expo start`).

### If the phone says it cannot connect

Some Wi-Fi networks (offices, campuses, some routers) block phones and
computers from talking to each other. Stop the app (`Ctrl+C`) and restart it
in tunnel mode, which goes over the internet instead:

```
npx expo start --tunnel
```

Say yes if it asks to install an extra package, then scan the new QR code.

---

## Optional extras

### Try it in a web browser instead

No phone needed: after `npx expo start`, press the **`w`** key in the
terminal and the app opens in your browser.

There is also a separate web companion app. From the main `Catechise` folder:

```
npm run web
```

then open <http://localhost:3000> in your browser.

### Turn on the AI features (Ask tab, "Go deeper")

Everything else works without this.

1. Create a free account at <https://www.magisterium.com> and generate an
   **API key** (a long password made of letters and numbers).
2. In the app, tap the ⚙️ gear on the Today screen and paste the key.

For the web companion, instead copy `web/.env.example` to `web/.env.local`,
paste the key after `MAGISTERIUM_API_KEY=`, and restart.

### Check the project's health

From the main `Catechise` folder:

```
npm run check
```

This verifies all the code compiles. If it prints nothing and ends without
errors, everything is in order.

---

## Troubleshooting

| Problem | Fix |
| --- | --- |
| `node` or `npm` "not recognized" | Close the terminal, open a new one. If it persists, reinstall Node.js. |
| QR code scan does nothing (iPhone) | Make sure Expo Go is installed first, then scan with the Camera app. |
| Phone can't connect / spins forever | Use `npx expo start --tunnel` (see above). |
| App shows something stale or odd | Stop it and restart with a clean cache: `npx expo start -c` |
| "port is already in use" | Another copy is running — close other terminals, or answer "yes" when it offers a different port. |
| Want to start over with fresh app data | In the app: My Journey → "Remove this learner". Or delete and reinstall Expo Go. |

If you get stuck on anything not listed here, copy the error message and ask —
error text that looks scary is usually a one-line fix.
