import { ChallengeType, EngineRound, parseTeacherPaste as parseRounds } from '../gameEngine';

export type ScreenId = 'TITLE' | 'PLAYING' | 'ROUND_SUCCESS' | 'WRONG_CODE' | 'WRONG_5_TIMES' | 'HARD_MODE_RESET' | 'WIN';
export type DifficultyMode = 'NORMAL' | 'HARD';
export type ModeSetting = 'NORMAL' | 'HARD' | 'BOTH';
export type GameMode = 'CLASSIC' | 'MATH' | 'MATH_EN';
export type { ChallengeType };

export interface RoundData extends EngineRound { challengeType?: ChallengeType; }
export interface GameSettings {
  gameMode: GameMode;
  totalRounds: number;
  rounds: RoundData[];
  repeatQuestions: boolean;
  difficultyMode: DifficultyMode;
  modeSetting: ModeSetting;
  normalPenaltySeconds: number;
  fiveWrongPenaltySeconds: number;
  soundEnabled: boolean;
}

export const DEFAULT_SETTINGS: GameSettings = {
  gameMode: 'CLASSIC', totalRounds: 2,
  rounds: [{ question: '', answer: '2301', codeLength: 4 }, { question: '', answer: '2906', codeLength: 4 }],
  repeatQuestions: false, difficultyMode: 'NORMAL', modeSetting: 'NORMAL',
  normalPenaltySeconds: 3, fiveWrongPenaltySeconds: 15, soundEnabled: true
};
export const SETTINGS_STORAGE_KEY = 'hanselGretelSettingsV2';

const cleanRound = (value: Partial<RoundData>): RoundData => {
  const answer = String(value.answer || '0').replace(/\D/g, '').slice(0, 10) || '0';
  return { question: String(value.question || ''), answer, codeLength: Math.max(1, Math.min(10, Number(value.codeLength) || answer.length)), challengeType: value.challengeType === 'TREASURE' ? 'TREASURE' : 'SOLVE' };
};

export function loadSettings(): GameSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS, rounds: DEFAULT_SETTINGS.rounds.map(cleanRound) };
    const parsed = JSON.parse(raw);
    const rawRounds = Array.isArray(parsed.rounds) ? parsed.rounds : DEFAULT_SETTINGS.rounds;
    const rounds = rawRounds.map(cleanRound);
    return { ...DEFAULT_SETTINGS, ...parsed, gameMode: ['CLASSIC', 'MATH', 'MATH_EN'].includes(parsed.gameMode) ? parsed.gameMode : DEFAULT_SETTINGS.gameMode,
      totalRounds: Math.min(200, Math.max(1, Number(parsed.totalRounds) || rounds.length)), rounds: rounds.length ? rounds : DEFAULT_SETTINGS.rounds.map(cleanRound),
      repeatQuestions: Boolean(parsed.repeatQuestions), difficultyMode: parsed.difficultyMode === 'HARD' ? 'HARD' : 'NORMAL',
      modeSetting: ['NORMAL', 'HARD', 'BOTH'].includes(parsed.modeSetting) ? parsed.modeSetting : 'NORMAL' };
  } catch { return { ...DEFAULT_SETTINGS, rounds: DEFAULT_SETTINGS.rounds.map(cleanRound) }; }
}
export function saveSettings(settings: GameSettings): void { try { localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings)); } catch { /* session still works */ } }
export function parseTeacherPaste(text: string, gameMode: GameMode): RoundData[] { return parseRounds(text, gameMode) as RoundData[]; }
