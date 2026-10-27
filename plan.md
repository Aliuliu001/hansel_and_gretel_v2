# Hansel & Gretel: Candy House Escape — V2 Roadmap

## Purpose
V2 is a separate, safe workspace for improving the game. The V1 repository remains unchanged.

- **V1 (unchanged):** `Aliuliu001/hansel_and_gretel`
- **V2 development:** `Aliuliu001/hansel_and_gretel_v2`

## V2 learning goal
Make children feel that they are using Maths and English to help Hansel and Gretel escape, rather than simply typing passcodes.

## Existing foundation copied from V1
- Classic numbers, Maths, and English Maths modes.
- Teacher paste input, 1–200 round setting, 1–10 digit locks.
- Normal/Hard difficulty, round progress, wrong-answer lockout, win screen.

## V2 improvements

### Phase A — Fair learning loop (first build)
1. Show the **actual playable round count** after pasted questions are read.
2. Add a teacher choice:
   - Play only the pasted questions, or
   - Repeat the pasted questions until the selected total is reached.
3. Add learning hints after wrong answers:
   - Maths: a guided calculation hint supplied by the teacher or generated from a simple equation.
   - English Maths: visual support for key words such as `plus`, `minus`, `times`, `divided by`, and `equals`.
4. Add end-of-game learning results: correct first try, hints used, total wrong attempts, combo, and vocabulary seen.

### Phase B — Tension and rewards
1. Add stars and a correct-answer combo.
2. Add a **Candy Backpack** with earned helpers:
   - Hint Candy: reveal one hint.
   - Shield Candy: protect one wrong attempt.
   - Word Lens: show a Vietnamese meaning for an English Maths word.
3. Add a light **Witch Chase** meter: correct answers make the children escape; mistakes let the witch catch up. Normal mode stays child-friendly and never restarts the whole game.

### Phase C — Adventure variety
1. Add a journey map: Candy House → Witch’s Kitchen → Dark Forest → Iron Gate → Freedom.
2. Add reward rounds every 5–7 questions.
3. Add varied challenge formats: solve, choose the maths sign, English word match, and teacher-defined treasure questions.
4. Add an Adventure Report with a copy button for teacher feedback.

## Delivery rules
- Every change is made and tested in V2 only.
- V1 is not modified after the V2 copy is created.
- Each phase must pass TypeScript check, production build, and browser smoke testing before it is published.
- Question content remains teacher-controlled through the paste box; no student data is sent to a server.
