# CONTEXT RESUME — Hansel & Gretel V2

If the chat is reset, say:

> **“Đọc file `context-resume.md` trong thư mục `hansel-gretel-escape-v2` rồi tiếp tục làm việc.”**

## Project identity
- **Name:** Hansel & Gretel: Candy House Escape — V2
- **V2 GitHub repository:** `Aliuliu001/hansel_and_gretel_v2`
- **V2 online link:** https://aliuliu001.github.io/hansel_and_gretel_v2/
- **V2 local folder:** `/home/ubuntu/hansel-gretel-escape-v2`
- **V1 repository preserved without further changes:** `Aliuliu001/hansel_and_gretel`
- **V1 online link:** https://aliuliu001.github.io/hansel_and_gretel/

## Starting point copied from V1
- Classic numeric passcode, Maths solver, and English Maths solver.
- Teacher paste data format; 1–200 selected rounds; 1–10 digit lock.
- Normal/Hard modes, success/wrong effects, round progress, and win screen.

## V2 direction agreed by anh Trương
V2 will make the game more engaging for children learning Maths and English. First, build the fair learning loop:
1. Tell the teacher exactly how many pasted questions were read and how many rounds will actually play.
2. Offer a choice to repeat pasted questions up to the desired round target.
3. Give child-friendly Maths/English hints after mistakes.
4. Show a learning report at the end: correct first try, hints, mistakes, combo, and vocabulary seen.

Then build rewards and tension (Candy Backpack, stars/combo, Witch Chase), then the journey map and varied challenge formats. The full roadmap is in `plan.md`; status is in `tasks.md`.

## Important rules
- Change only V2 from now on; do not modify V1.
- Before publishing: `npm run lint`, `npm run build`, then browser smoke-test.
- Publish only V2 to its own `gh-pages` branch.
- Teacher content remains pasted into Settings; no student data is sent to a server.
