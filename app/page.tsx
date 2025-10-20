'use client';

import { useMemo, useState } from 'react';
import {
  HANDS,
  Hand,
  determineOutcome,
  initialOpponentGreeting,
  pickOpponentVictorySnipe,
  pickPhrase,
  pickPlayerVictoryCheer,
  pickRandomHand,
} from '@/lib/janken';

type Phase = 'idle' | 'awaiting-rematch' | 'quit';

const handLabels: Record<Hand, string> = {
  財力: '✊ 財力（ブラックカードでゴリ押し）',
  若さ: '✌️ 若さ（美容で発光中）',
  人脈: '✋ 人脈（六本木のVIPコネ）',
};

export default function Home() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [playerHand, setPlayerHand] = useState<Hand | null>(null);
  const [opponentHand, setOpponentHand] = useState<Hand | null>(null);
  const [playerPhrase, setPlayerPhrase] = useState<string>('');
  const [opponentPhrase, setOpponentPhrase] = useState<string>(
    initialOpponentGreeting,
  );
  const [result, setResult] = useState<'win' | 'lose' | 'draw' | null>(null);
  const [opponentSnipe, setOpponentSnipe] = useState('');
  const [victoryLine, setVictoryLine] = useState('');
  const [quitMessage, setQuitMessage] = useState('');

  const opponentImage = useMemo(
    () => (result === 'win' ? '/haiboku.png' : '/minatokujosi.png'),
    [result],
  );

  const opponentImageAlt =
    result === 'win'
      ? '敗北して悔しがる港区女子'
      : '華やかに微笑む港区女子';

  const resultMessage = useMemo(() => {
    if (result === 'win') {
      return 'あなたの勝ち！港区の頂点はあなたのもの！';
    }
    if (result === 'lose') {
      return '敗北…港区マウントはまだまだ険しい。';
    }
    if (result === 'draw') {
      return 'あいこ！マウント合戦はまだ終わらない…もう一戦！';
    }
    return 'どのマウントで勝負する？';
  }, [result]);

  const handleSelect = (hand: Hand) => {
    if (phase === 'awaiting-rematch' || phase === 'quit') {
      return;
    }

    const playerLine = pickPhrase(hand, 'player');
    const opponent = pickRandomHand();
    const opponentLine = pickPhrase(opponent, 'opponent');
    const outcome = determineOutcome(hand, opponent);

    setPlayerHand(hand);
    setOpponentHand(opponent);
    setPlayerPhrase(playerLine);
    setOpponentPhrase(opponentLine);
    setResult(outcome);
    setQuitMessage('');

    if (outcome === 'win') {
      setPhase('awaiting-rematch');
      setVictoryLine(pickPlayerVictoryCheer());
      setOpponentSnipe('');
    } else if (outcome === 'lose') {
      setPhase('awaiting-rematch');
      setVictoryLine('');
      setOpponentSnipe(pickOpponentVictorySnipe());
    } else {
      setPhase('idle');
      setVictoryLine('');
      setOpponentSnipe('');
    }
  };

  const handleRematch = () => {
    setPhase('idle');
    setPlayerHand(null);
    setOpponentHand(null);
    setPlayerPhrase('');
    setOpponentPhrase(initialOpponentGreeting);
    setResult(null);
    setOpponentSnipe('');
    setVictoryLine('');
    setQuitMessage('');
  };

  const handleQuit = () => {
    setPhase('quit');
    setQuitMessage('今日はこの辺で。次はもっと眩しいマウントを見せてね！');
  };

  return (
    <main>
      <h1>港区女子マウントじゃんけん</h1>
      <section className="arena">
        <div className="opponent">
          <img
            src={opponentImage}
            alt={opponentImageAlt}
            className={result === 'win' ? 'defeated' : undefined}
          />
          <div className="speech-bubble">
            {result === 'lose' && opponentSnipe
              ? opponentSnipe
              : opponentPhrase}
          </div>
        </div>

        <div className="controls">
          <p className="result">{quitMessage || resultMessage}</p>

          <div className="hand-buttons">
            {HANDS.map((hand) => (
              <button
                key={hand}
                type="button"
                className="hand"
                disabled={phase === 'awaiting-rematch' || phase === 'quit'}
                onClick={() => handleSelect(hand)}
                aria-label={handLabels[hand]}
              >
                {hand}
              </button>
            ))}
          </div>

          <div className="phrases">
            <div>
              <strong>あなた：</strong>{' '}
              {playerHand
                ? `${playerHand}で勝負！ ${playerPhrase}`
                : 'どれでマウントを取るか選んでね'}
            </div>
            <div>
              <strong>相手：</strong>{' '}
              {opponentHand
                ? `${opponentHand}で応戦！ ${opponentPhrase}`
                : '港区女子があなたの出方を待っている…'}
            </div>
            {victoryLine && (
              <div>
                <strong>勝利宣言：</strong> {victoryLine}
              </div>
            )}
          </div>

          {phase === 'awaiting-rematch' && (
            <div className="actions" role="group" aria-label="再戦オプション">
              <button type="button" onClick={handleRematch}>
                もう一度戦う
              </button>
              <button type="button" onClick={handleQuit}>
                やめる
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
