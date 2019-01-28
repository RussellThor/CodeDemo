export interface DifficultSound {
  letters: SoundExampleLetters;
  soundNum: SoundNums;
  isSelected: boolean;
}

export enum SoundNums {
  TH = 13,
  R = 10,
  O = 4,
  SHORT_E = 1,
  K = 5,
  S = 6,
  P = 7,
  LONG_E = 2,
  N = 8,
  I = 3,
  V = 9,
  NG = 11,
  Z = 12,
  F = 14,
  G = 15
}

enum SoundExampleLetters {
  TH = "th",
  R = "r",
  O = "o"
  // should fill in for the other sounds such as SHORT_E, K, ...
};

export class LessonService {  
  getDifficultSounds() {
      // this data would normally be retrieved by an endpoint.
        return  [
          <DifficultSound>{ letters: SoundExampleLetters.TH, soundNum: SoundNums.TH, isSelected: false },
          <DifficultSound>{ letters: SoundExampleLetters.R, soundNum: SoundNums.R, isSelected: false },
          <DifficultSound>{ letters: SoundExampleLetters.O, soundNum: SoundNums.O, isSelected: false }
        ]
  }
}