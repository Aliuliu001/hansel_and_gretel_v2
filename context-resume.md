# CONTEXT RESUME — Hansel & Gretel V2

If the chat is reset, say:

> **“Đọc file `context-resume.md` trong thư mục `hansel-gretel-escape-v2` rồi tiếp tục làm việc.”**

## Project identity
- **Name:** Hansel & Gretel: Candy House Escape — V2
- **V2 GitHub repository:** `Aliuliu001/hansel_and_gretel_v2`
- **V2 online link:** https://aliuliu001.github.io/hansel_and_gretel_v2/
- **V2 local folder:** `/home/ubuntu/hansel-gretel-escape-v2`
- **V1 protected repository:** `Aliuliu001/hansel_and_gretel` — do not modify.

## V2 is complete
### Learning loop
- Settings show both pasted-question count and the actual number of rounds to play.
- “Repeat questions to reach target” lets a teacher reuse a short list up to 200 rounds.
- Wrong answers show Maths calculation guidance or English Maths word meanings.
- Win screen reports first-try answers, stars, hints, mistakes, best combo, time, and English vocabulary.

### Game loop
- Stars and candy rewards; 5-answer combos give extra reward.
- Hint Candy costs 2 candies. Shield Candy costs 3 and blocks one wrong-answer penalty.
- Witch Chase meter: correct answers push the witch back; mistakes bring her closer. Normal mode is child-friendly.
- Four story stages: Candy House → Witch’s Kitchen → Dark Forest → Iron Gate.
- Every fifth repeated/pasted item is a reward round; teacher can mark one explicitly with `⭐`:
  `⭐ 6 + 7 = 13`
- English Maths questions with `plus/minus/times/divided by/equals` show a Word Spell vocabulary mini challenge.
- End screen has **Copy report**.

## Key files
- `src/gameEngine.ts`: sequence/repeat logic, stages, teacher parser, learning hints, English vocabulary.
- `src/gameEngine.test.ts`: 6 logic tests.
- `src/components/TeacherSettingsModal.tsx`: teacher settings and live real-round count.
- `src/components/GamePlayView.tsx`: V2 gameplay, rewards, Witch Chase, Word Spell, final report.
- `plan.md`: roadmap; `tasks.md`: completed checklist.

## Verification before publish
- `npx vitest run` — passed (6 tests).
- `npm run lint` — passed.
- `npm run build` — passed.
- Browser smoke test passed for settings/repetition, wrong-answer English hint, and correct reward state.

## Publishing rule
Use only V2’s `main` and `gh-pages` branches. After a deployment wait for GitHub Pages status `built` and check that live HTML uses the new asset hash.
