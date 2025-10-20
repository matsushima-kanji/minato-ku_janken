import {
  determineOutcome,
  HANDS,
  pickOpponentVictorySnipe,
  pickPhrase,
  pickPlayerVictoryCheer,
  pickRandomHand,
} from './janken';

describe('determineOutcome', () => {
  const matchups: Array<[Parameters<typeof determineOutcome>, string]> = [
    [['財力', '若さ'], 'win'],
    [['若さ', '人脈'], 'win'],
    [['人脈', '財力'], 'win'],
    [['財力', '人脈'], 'lose'],
    [['若さ', '財力'], 'lose'],
    [['人脈', '若さ'], 'lose'],
  ];

  it.each(matchups)('%s vs %s -> %s', ([player, opponent], expected) => {
    expect(determineOutcome(player, opponent)).toBe(expected);
  });

  it('detects draw correctly', () => {
    expect(determineOutcome('財力', '財力')).toBe('draw');
  });
});

describe('random helpers', () => {
  const zero = () => 0;
  const nearOne = () => 0.999;

  it('returns a random hand deterministically when seeded', () => {
    expect(pickRandomHand(zero)).toBe('財力');
    expect(pickRandomHand(nearOne)).toBe('人脈');
  });

  it('picks player phrases', () => {
    expect(pickPhrase('財力', 'player', zero)).toMatch(/ブラックカード|六本木|推し活/);
  });

  it('picks opponent phrases', () => {
    expect(pickPhrase('若さ', 'opponent', zero)).toMatch(/肌診断|推し|アイドル/);
  });

  it('returns celebration lines and snipes', () => {
    expect(pickPlayerVictoryCheer(zero)).toMatch(/勝利|最強|格の違い/);
    expect(pickOpponentVictorySnipe(zero)).toMatch(/あらあら|港区|格の違い|サロン/);
  });

  it('exposes all hands', () => {
    expect(HANDS).toEqual(['財力', '若さ', '人脈']);
  });
});
