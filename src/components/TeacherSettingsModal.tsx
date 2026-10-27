import React, { useMemo, useState } from 'react';
import { X, Settings, Volume2, RotateCcw, Check, Gamepad2, ListOrdered, BookOpen, Repeat2 } from 'lucide-react';
import { DifficultyMode, DEFAULT_SETTINGS, GameMode, GameSettings, parseTeacherPaste } from '../types/game';

interface Props { isOpen: boolean; onClose: () => void; settings: GameSettings; onSaveSettings: (settings: GameSettings) => void; }
const MODES: { value: GameMode; label: string; hint: string; emoji: string }[] = [
  { value: 'CLASSIC', label: 'Classic Numbers', hint: 'Enter a secret number', emoji: '🔢' },
  { value: 'MATH', label: 'Math Solver', hint: 'Solve number equations', emoji: '➕' },
  { value: 'MATH_EN', label: 'English Maths', hint: 'Learn Maths words in English', emoji: '🔤' },
];
export const TeacherSettingsModal: React.FC<Props> = ({ isOpen, onClose, settings, onSaveSettings }) => {
  const [gameMode, setGameMode] = useState<GameMode>(settings.gameMode);
  const [totalRounds, setTotalRounds] = useState(settings.totalRounds);
  const [pasteText, setPasteText] = useState('');
  const [repeatQuestions, setRepeatQuestions] = useState(settings.repeatQuestions);
  const [difficultyMode, setDifficultyMode] = useState<DifficultyMode>(settings.difficultyMode);
  const [soundEnabled, setSoundEnabled] = useState(settings.soundEnabled);
  const [parseError, setParseError] = useState('');
  const parsedCount = useMemo(() => pasteText.trim() ? parseTeacherPaste(pasteText, gameMode).length : settings.rounds.length, [pasteText, gameMode, settings.rounds.length]);
  const actualRounds = repeatQuestions ? Math.min(200, Math.max(1, totalRounds)) : Math.min(Math.min(200, Math.max(1, totalRounds)), parsedCount);
  if (!isOpen) return null;
  const save = (event: React.FormEvent) => { event.preventDefault(); const rounds = pasteText.trim() ? parseTeacherPaste(pasteText, gameMode) : settings.rounds; if (!rounds.length) { setParseError('Please paste at least one valid question.'); return; }
    onSaveSettings({ ...settings, gameMode, totalRounds: Math.min(200, Math.max(1, totalRounds)), rounds, repeatQuestions, difficultyMode, modeSetting: difficultyMode, soundEnabled }); onClose(); };
  const reset = () => { setGameMode(DEFAULT_SETTINGS.gameMode); setTotalRounds(DEFAULT_SETTINGS.totalRounds); setPasteText(''); setRepeatQuestions(false); setDifficultyMode('NORMAL'); setSoundEnabled(true); setParseError(''); };
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"><div className="relative w-full max-w-2xl bg-gradient-to-b from-amber-900 via-amber-950 to-stone-950 border-4 border-amber-600 rounded-3xl p-6 shadow-2xl text-amber-50 max-h-[90vh] overflow-y-auto">
    <button onClick={onClose} className="absolute top-4 right-4"><X /></button><div className="flex gap-3 mb-5 border-b border-amber-700/60 pb-3"><Settings className="w-8 h-8 text-amber-300"/><div><h2 className="text-lg font-bold text-amber-200">Teacher Settings · V2</h2><p className="text-xs text-amber-300/80">Questions stay on this device. No student data is uploaded.</p></div></div>
    <form onSubmit={save} className="space-y-4 text-sm"><section className="bg-amber-950/70 p-3.5 rounded-2xl border border-amber-800"><b className="text-amber-300"><Gamepad2 className="inline w-4 mr-1"/>Learning mode</b><div className="space-y-2 mt-2">{MODES.map(mode => <label key={mode.value} className={`flex gap-3 p-2 rounded-xl border cursor-pointer ${gameMode === mode.value ? 'bg-amber-700 border-amber-400' : 'border-amber-800'}`}><input type="radio" name="gameMode" value={mode.value} checked={gameMode === mode.value} onChange={() => setGameMode(mode.value)}/><span>{mode.emoji}</span><span><b>{mode.label}</b><small className="block text-amber-300">{mode.hint}</small></span></label>)}</div></section>
    <section className="bg-amber-950/70 p-3.5 rounded-2xl border border-amber-800"><b className="text-amber-300"><ListOrdered className="inline w-4 mr-1"/>Adventure rounds (1–200)</b><input type="number" min="1" max="200" value={totalRounds} onChange={e => setTotalRounds(Number(e.target.value))} className="block mt-2 w-full bg-amber-900 border border-amber-600 rounded-xl px-3 py-2 text-center text-xl"/><label className="flex gap-2 mt-3 cursor-pointer"><input type="checkbox" checked={repeatQuestions} onChange={e => setRepeatQuestions(e.target.checked)}/><Repeat2 className="w-4"/><span><b>Repeat questions to reach the target</b><small className="block text-amber-300">Off = play each pasted question once only.</small></span></label></section>
    <section className="bg-amber-950/70 p-3.5 rounded-2xl border border-amber-800"><b className="text-amber-300"><BookOpen className="inline w-4 mr-1"/>Paste questions & answers</b><p className="mt-2 text-xs bg-amber-900/50 p-2 rounded">One per line. Maths: <code>68 - 24 = 44</code> · English: <code>Twenty plus five equals ? 25</code> · Mark a bonus treasure: <code>⭐ 6 + 7 = 13</code></p><textarea value={pasteText} onChange={e => { setPasteText(e.target.value); setParseError(''); }} rows={6} placeholder={gameMode === 'CLASSIC' ? '2301\n2906' : '68 - 24 = 44\n⭐ 6 + 7 = 13'} className="mt-2 w-full bg-amber-900 border border-amber-600 rounded-xl p-3 font-mono"/>
      {parseError && <p className="text-red-300">{parseError}</p>}<p className="mt-2 text-emerald-300">✓ {parsedCount} question(s) ready · this game will play <b>{actualRounds}</b> round(s){repeatQuestions && parsedCount < totalRounds ? ' (repeating the list)' : ''}.</p></section>
    <section className="bg-amber-950/70 p-3.5 rounded-2xl border border-amber-800"><b className="text-amber-300">Difficulty</b><div className="flex gap-3 mt-2">{(['NORMAL','HARD'] as DifficultyMode[]).map(level => <label key={level} className="cursor-pointer"><input type="radio" checked={difficultyMode === level} onChange={() => setDifficultyMode(level)}/> {level === 'NORMAL' ? '🍭 Normal: friendly learning' : '⚡ Hard: 3 mistakes restart'}</label>)}</div></section>
    <label className="flex gap-2"><input type="checkbox" checked={soundEnabled} onChange={e => setSoundEnabled(e.target.checked)}/><Volume2 className="w-4"/> Sound effects</label><div className="flex justify-between"><button type="button" onClick={reset} className="px-3 py-2 border rounded-xl"><RotateCcw className="inline w-4"/> Reset</button><button className="px-5 py-2 bg-emerald-600 rounded-xl font-bold"><Check className="inline w-4"/> Save Adventure</button></div></form>
  </div></div>;
};
