export type Hand = '財力' | '若さ' | '人脈';
export type Outcome = 'win' | 'lose' | 'draw';
export type PhraseRole = 'player' | 'opponent';

export const HANDS: Hand[] = ['財力', '若さ', '人脈'];

const BEATS: Record<Hand, Hand> = {
  財力: '若さ',
  若さ: '人脈',
  人脈: '財力',
};

const playerPhrases: Record<Hand, string[]> = {
  財力: [
    'ブラックカードは常に準備万端よ',
    '六本木ヒルズで買い占めてこようかしら',
    '推し活費用？桁が違うんだけど',
  ],
  若さ: [
    '最新美容は毎朝のルーティーンなの',
    '夜遊びしても肌が発光してるんだよね',
    '推しのライブも最前列で飛び跳ねちゃう！',
  ],
  人脈: [
    '港区のパーティーは顔パスよ？',
    '呼べばヘリが来ちゃうかも',
    'アッパー層のグループチャットでお馴染みなんだ',
  ],
};

const opponentPhrases: Record<Hand, string[]> = {
  財力: [
    '桁違いのワイン開けちゃう？',
    'お揃いのクルーザーでも買う？',
    '株価よりも私の価値が高いの',
  ],
  若さ: [
    '今日は肌診断が100点だったの',
    '推しのDJに年齢聞かれなかったもん',
    '寝起きでもアイドルに負けないって言われるの',
  ],
  人脈: [
    '外資のCEOもインフルエンサーも友だちよ',
    '青山の会員制ラウンジがホームなの',
    '一声かければイベントが埋まっちゃう',
  ],
};

const opponentVictorySnipes = [
  'あらあら、その程度で勝てると思った？',
  '港区レベル、もっと磨いてから挑んでね♡',
  'うふふ、格の違いってこういうことよ？',
  '悔しかったら私のサロンに来てみなさい？',
];

const playerVictoryCheers = [
  '勝利のシャンパン、開けちゃおう！',
  'やっぱり私が港区最強よね！',
  '格の違い、見せつけちゃった！',
];

export function determineOutcome(player: Hand, opponent: Hand): Outcome {
  if (player === opponent) {
    return 'draw';
  }
  if (BEATS[player] === opponent) {
    return 'win';
  }
  return 'lose';
}

export function pickRandomHand(randomFn: () => number = Math.random): Hand {
  const index = Math.floor(randomFn() * HANDS.length);
  return HANDS[index] ?? '財力';
}

export function pickPhrase(
  hand: Hand,
  role: PhraseRole,
  randomFn: () => number = Math.random,
): string {
  const source = role === 'player' ? playerPhrases : opponentPhrases;
  const options = source[hand];
  return options[Math.floor(randomFn() * options.length)] ?? options[0];
}

export function pickOpponentVictorySnipe(
  randomFn: () => number = Math.random,
): string {
  return opponentVictorySnipes[
    Math.floor(randomFn() * opponentVictorySnipes.length)
  ]!;
}

export function pickPlayerVictoryCheer(
  randomFn: () => number = Math.random,
): string {
  return playerVictoryCheers[
    Math.floor(randomFn() * playerVictoryCheers.length)
  ]!;
}

export const initialOpponentGreeting =
  '今日も港区女子の頂点は譲らないわよ？準備はいい？';
