import { describe, expect, it } from 'vitest';
import {
  buildRoundSequence,
  getEnglishVocabulary,
  getMathHint,
  getStage,
  normalizeRound,
} from './gameEngine';

describe('buildRoundSequence', () => {
  const rounds = [
    { question: '2 + 3 = ?', answer: '5', codeLength: 1 },
    { question: '9 - 4 = ?', answer: '5', codeLength: 1 },
  ];

  it('keeps only pasted questions when repetition is off', () => {
    expect(buildRoundSequence(rounds, 10, false)).toHaveLength(2);
  });

  it('repeats pasted questions until the target when repetition is on', () => {
    const result = buildRoundSequence(rounds, 5, true);
    expect(result).toHaveLength(5);
    expect(result.map((round) => round.question)).toEqual([
      '2 + 3 = ?', '9 - 4 = ?', '2 + 3 = ?', '9 - 4 = ?', '2 + 3 = ?'
    ]);
  });
});

describe('learning helpers', () => {
  it('creates a guided hint for a simple subtraction equation', () => {
    expect(getMathHint('68 - 24 = ?', 'MATH')).toContain('68 - 20');
  });

  it('finds English Maths vocabulary used in a question', () => {
    expect(getEnglishVocabulary('Twenty minus five equals ?')).toEqual(['minus', 'equals']);
  });

  it('assigns four story stages over a game', () => {
    expect(getStage(0, 20).title).toBe('Candy House');
    expect(getStage(19, 20).title).toBe('Iron Gate');
  });

  it('uses teacher-defined reward type when supplied', () => {
    expect(normalizeRound({ question: '3 + 3', answer: '6', codeLength: 1, challengeType: 'TREASURE' }).challengeType)
      .toBe('TREASURE');
  });
});
