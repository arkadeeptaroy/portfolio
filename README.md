# ARKA.OS

Personal portfolio for Arkadeepta Roy. Product Manager and Educator are two views of the same work. The interface supports the case studies; it is not a separate product.

## Product decisions

- The first screen offers a clear choice between Product Manager and Educator.
- Only Product Manager launches the terminal boot sequence. Both the boot screen and Neofetch use the same lowercase ASCII `a`.
- Content is shared across modes. Routing uses URL hashes so direct links work on GitHub Pages.
- The portfolio does not record visits or request an external visitor-count API.

## Run locally

```bash
python3 -m http.server 4173
```

Open `http://127.0.0.1:4173/#/home`. There is no application build step.

## Repository

| File | Responsibility |
| --- | --- |
| `index.html` | Shared content, routing, boot sequence, Educator interface and drawing input |
| `arka-os.js` | PM workbench, project explorer and local session interactions |
| `arka-os.css` | Distro styles, mobile layout and accessibility overrides |
| `intro-avatar.png` | Opening illustration |
| `favicon.svg` | Lowercase `a` site icon |

## Verification

Requires Node.js 20+ and Python 3.

```bash
npm install
npx playwright install chromium
npm test
```

Playwright checks both desktop and mobile Chromium. Coverage includes the opening choice, boot trigger, keyboard-operated project links, preference reset, browser history, 320px layout and the removal of visitor telemetry. A real iOS Safari and Android Chrome pass remains a release requirement.

## Release criteria

1. The intro remains static until a mode is selected.
2. Product Manager displays the chosen ASCII mark in the boot screen and Neofetch.
3. Educator opens without the Linux boot sequence.
4. Direct project URLs and back/forward navigation work.
5. All interactive controls can be reached and activated by keyboard.
6. No horizontal overflow is visible at 320px or 390px.
7. Browser checks pass before the latest `main` commit is considered validated.

## State and privacy

Interface settings use local storage. Terminal history and route memory use session storage. There is no visitor counter or analytics API. Google Fonts is loaded as an external font dependency.

## Licensing

Source code is under the repository's MIT License. Portfolio content, personal branding and original illustrations are not provided as reusable templates; request permission before reusing them.
