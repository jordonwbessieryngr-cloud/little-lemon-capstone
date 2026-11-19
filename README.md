# Little Lemon — Table Booking

An independent, AI-assisted reference implementation for the Meta Front-End Developer Capstone. Review the code, adapt the design to your own Figma work and verify the course's academic-integrity requirements before using it for an assessment. This is not connected to a real restaurant or the TalentBay project.

## Run locally

Requirements: Node.js 20+ and npm. From this folder:

```bash
npm install
npm start
```

Open the local URL printed by Vite (normally http://localhost:5173). Create a production build with `npm run build`, then use `npm run preview`.

## Features

- Responsive home, menu, about, reservation and confirmation screens; hash navigation supports static hosting.
- Two-step reservation form: date, available time, guest count and occasion, followed by contact details and review.
- Local simulated availability, including past date/time restrictions and alternate Friday/Saturday availability. No external API, persistent records, email or real table reservation.
- `useState`, `useReducer` for time options and `useEffect` for navigation/focus. Reusable layout and field components.
- Required fields, inline validation, focus on invalid fields, loading state and error feedback.
- Semantic HTML, explicit labels, status announcements, keyboard navigation, active page indication and reduced-motion styles.
- Little Lemon-inspired colors and fallback typefaces (Georgia/Arial if Markazi Text/Karla are not installed). Original SVG illustrations; no third-party image dependencies.

## Tests

```bash
npm test       # Built-in Node test runner; validation, availability and simulated submit
npm run test:ui # React Testing Library / Vitest; component behavior after npm install
```

The submit service is in `src/lib/booking.js`; replace it with an authorized real reservation API only when one is available. Frontend checks are not a substitute for server-side validation in production.

## Suggested manual checks

1. Open the home page and use Reserve a table.
2. Try continuing without a time; verify the inline error and focus.
3. Choose a future date, time, guest count and occasion. Continue.
4. Attempt an invalid email, then a valid email and name. Confirm and verify the reference and booking details.
5. Navigate back and check that chosen values are retained; test at a narrow mobile viewport and with keyboard only.
6. Check that Friday/Saturday unavailable time is omitted and past dates are rejected.

## Structure

`src/components`: reusable navigation, layout and field components. `src/pages`: UI screens. `src/lib`: pure business rules and simulated submission. `tests`: Node unit tests. `public`: self-contained artwork.

## GitHub

Create a separate repository named `little-lemon-capstone`. Do not put this project inside TalentBay. From the extracted directory, initialize git, commit the files, and push to that new repository. The `.gitignore` excludes installed dependencies and build output.
