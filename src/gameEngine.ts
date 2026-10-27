export type GameMode = 'CLASSIC' | 'MATH' | 'MATH_EN';
export type ChallengeType = 'SOLVE' | 'TREASURE';
export interface EngineRound { question: string; answer: string; codeLength: number; challengeType?: ChallengeType; }
export interface StoryStage { title: string; emoji: string; line: string; }

export const STAGES: StoryStage[] = [
  { title: 'Candy House', emoji: '🍭', line: 'Find the first magic key!' },
  { title: "Witch's Kitchen", emoji: '🧙', line: 'Solve before the witch returns!' },
  { title: 'Dark Forest', emoji: '🌲', line: 'Use English magic words to run free!' },
  { title: 'Iron Gate', emoji: '🗝️', line: 'One final push to freedom!' },
];

export function normalizeRound(input: Partial<EngineRound>): EngineRound {
  const answer = String(input.answer || '0').replace(/\D/g, '').slice(0, 10) || '0';
  return {
    question: String(input.question || ''), answer,
    codeLength: Math.max(1, Math.min(10, Number(input.codeLength) || answer.length)),
    challengeType: input.challengeType === 'TREASURE' ? 'TREASURE' : 'SOLVE',
  };
}

export function buildRoundSequence(rounds: EngineRound[], target: number, repeat: boolean): EngineRound[] {
  const source = rounds.map(normalizeRound);
  const cappedTarget = Math.max(1, Math.min(200, Number(target) || source.length));
  if (!source.length) return [];
  if (!repeat) return source.slice(0, cappedTarget);
  return Array.from({ length: cappedTarget }, (_, i) => ({ ...source[i % source.length], challengeType: source[i % source.length].challengeType || ((i + 1) % 5 === 0 ? 'TREASURE' : 'SOLVE') }));
}

export function getStage(index: number, total: number): StoryStage {
  return STAGES[Math.min(STAGES.length - 1, Math.floor((index / Math.max(total, 1)) * STAGES.length))];
}

export function getEnglishVocabulary(question: string): string[] {
  const found = question.toLowerCase().match(/divided by|plus|minus|times|equals/g) || [];
  return [...new Set(found)];
}

export function getMathHint(question: string, mode: GameMode): string {
  if (mode === 'MATH_EN') {
    const words = getEnglishVocabulary(question);
    const glossary: Record<string, string> = { plus: 'plus = cộng', minus: 'minus = trừ', times: 'times = nhân', 'divided by': 'divided by = chia', equals: 'equals = bằng' };
    return words.length ? words.map(word => glossary[word]).join(' • ') : 'Read the English maths words slowly.';
  }
  const match = question.match(/(\d+)\s*([+\-*/×÷])\s*(\d+)/);
  if (!match) return 'Read the question again. What numbers and sign do you see?';
  const [, a, sign, b] = match;
  if (sign === '-') { const tens = Math.floor(Number(b) / 10) * 10; return `${a} - ${tens} first, then subtract ${Number(b) - tens}.`; }
  return `${a} ${sign} ${b}: calculate one step at a time.`;
}

export function parseTeacherPaste(text: string, mode: GameMode): EngineRound[] {
  return text.trim().split('\n').map(line => line.trim()).filter(Boolean).flatMap((line, i) => {
    const treasure = /^\s*(?:⭐|treasure:)\s*/i.test(line);
    const clean = line.replace(/^\s*(?:⭐|treasure:)\s*/i, '');
    if (mode === 'CLASSIC') { const answer = clean.replace(/\D/g, ''); return answer && answer.length <= 10 ? [normalizeRound({ answer, challengeType: treasure ? 'TREASURE' : (i + 1) % 5 === 0 ? 'TREASURE' : 'SOLVE' })] : []; }
    const matched = clean.match(/^(.+?)(?:\s*=\s*\??\s*|\s+)(\d{1,10})$/);
    return matched ? [normalizeRound({ question: matched[1], answer: matched[2], challengeType: treasure ? 'TREASURE' : (i + 1) % 5 === 0 ? 'TREASURE' : 'SOLVE' })] : [];
  });
}
