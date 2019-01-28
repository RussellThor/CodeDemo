import  {SoundNums} from  '.././lesson/lesson.service';

export interface Sound {
  letters: string;
  soundNum: SoundNums;
  durationInMilliSeconds: number;
  isSelected: boolean;
}


export class SentenceService {
  soundStartTimeFlatArray = [];
  getSentenceData() {    
    // this data would normally be retrieved by an endpoint.
      return [
        [
          <Sound>{ letters: 'e', soundNum: SoundNums.SHORT_E, durationInMilliSeconds: 150, isSelected: false },
          <Sound>{ letters: 'x', soundNum: SoundNums.K, durationInMilliSeconds: 150, isSelected: false },
          <Sound>{ letters: '(s)', soundNum: SoundNums.S, durationInMilliSeconds: 150, isSelected: false },
          <Sound>{ letters: 'p', soundNum: SoundNums.P, durationInMilliSeconds: 150, isSelected: false },
          <Sound>{ letters: 'e', soundNum: SoundNums.LONG_E, durationInMilliSeconds: 100, isSelected: false },
          <Sound>{ letters: 'n', soundNum: SoundNums.N, durationInMilliSeconds: 200, isSelected: false },
          <Sound>{ letters: 's', soundNum: SoundNums.S, durationInMilliSeconds: 200, isSelected: false },
          <Sound>{ letters: 'i', soundNum: SoundNums.I, durationInMilliSeconds: 200, isSelected: false },
          <Sound>{ letters: 've', soundNum: SoundNums.V, durationInMilliSeconds: 600, isSelected: false }
        ],
        [
          <Sound>{ letters: 'r', soundNum: SoundNums.R, durationInMilliSeconds: 300, isSelected: false },
          <Sound>{ letters: 'i', soundNum: SoundNums.I, durationInMilliSeconds: 200, isSelected: false },
          <Sound>{ letters: 'ng', soundNum: SoundNums.NG, durationInMilliSeconds: 300, isSelected: false },
          <Sound>{ letters: 's', soundNum: SoundNums.Z, durationInMilliSeconds: 400, isSelected: false }
        ],
        [
          <Sound>{ letters: 'o', soundNum: SoundNums.O, durationInMilliSeconds: 200, isSelected: false },
          <Sound>{ letters: 'n', soundNum: SoundNums.N, durationInMilliSeconds: 300, isSelected: false }
        ],
        [
          <Sound>{ letters: 'th', soundNum: SoundNums.TH, durationInMilliSeconds: 200, isSelected: false },
          <Sound>{ letters: 'i', soundNum: SoundNums.I, durationInMilliSeconds: 150, isSelected: false },
          <Sound>{ letters: 'n', soundNum: SoundNums.N, durationInMilliSeconds: 500, isSelected: false }
        ],
        [
          <Sound>{ letters: 'f', soundNum: SoundNums.F, durationInMilliSeconds: 300, isSelected: false },
          <Sound>{ letters: 'i', soundNum: SoundNums.I, durationInMilliSeconds: 100, isSelected: false },
          <Sound>{ letters: 'ng', soundNum: SoundNums.NG, durationInMilliSeconds: 300, isSelected: false },
          <Sound>{ letters: '(g)', soundNum: SoundNums.G, durationInMilliSeconds: 300, isSelected: false },
          <Sound>{ letters: 'er', soundNum: SoundNums.SHORT_E, durationInMilliSeconds: 200, isSelected: false },
          <Sound>{ letters: 's', soundNum: SoundNums.Z, durationInMilliSeconds: 300, isSelected: false }
        ]
      ]
    }  

    formatDataForRealTimePlayback(words:[][]) {
      // flatten the times from the words/sounds structure to a single array with start times to make displaying the sounds in real time simpler.
      this.soundStartTimeFlatArray = [];
      let cumulativeTime: number = 0;
      words.forEach(word => {
        word.forEach( (sound: Sound) => {
          cumulativeTime += sound.durationInMilliSeconds;
          this.soundStartTimeFlatArray.push(cumulativeTime);
        }) 
      });
      return { flatTimingData: this.soundStartTimeFlatArray, totalSentenceTime: cumulativeTime };
    }

    formatDataForRealTimePlayback2(words:[][]) {
      // flatten the times from the words/sounds structure to a single array with start times to make displaying the sounds in real time simpler.
      this.soundStartTimeFlatArray = [];
      let cumulativeTime: number = 0;
      words.forEach(word => {
        word.forEach( (sound: Sound) => {
          cumulativeTime += sound.durationInMilliSeconds;
          this.soundStartTimeFlatArray.push(cumulativeTime/2);
        }) 
      });
      return { flatTimingData: this.soundStartTimeFlatArray, totalSentenceTime: cumulativeTime };
    }
    

  }