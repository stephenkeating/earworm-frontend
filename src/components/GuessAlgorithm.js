import distance from 'jaro-winkler';

const GuessAlgorithm = (trackName, guess) => {

  let lowecaseTrackName = trackName.toLowerCase()
  
  // Strip punctuation, spaces, and capitalization from track titles and guess to make guessing easier
  let currentTrackSplitAtComma = lowecaseTrackName.split(',')[0].replace(/[^\w]/g, '')
  let currentTrackBeforeDash = lowecaseTrackName.split('-')[0].replace(/[^\w]/g, '')
  let currentTrackBeforeParenthesis = lowecaseTrackName.split('(')[0].replace(/[^\w]/g, '')
  let currentTrackBetweenParenthesis = trackName.split(/[()]+/)[1] ? lowecaseTrackName.split(/[()]+/)[1].replace(/[^\w]/g, '') : trackName
  let currentTrackBeforePtPeriod = lowecaseTrackName.split('Pt.')[0].replace(/[^\w]/g, '')
  // let currentTrackAfterParenthesis = trackName.split('(')[1].replace(/[^\w]/g, '').toLowerCase()
  let jarowBeforePunctuationScore = distance(guess.split('(')[0].split('-')[0].replace(/[^\w]/g, ''), trackName.split('(')[0].split('-')[0].replace(/[^\w]/g, ''), { caseSensitive: false })
  let jarowWholeStringScore = distance(guess, trackName, { caseSensitive: false })
  
  // consider implementing a JS Switch
  if ( guess === currentTrackSplitAtComma
    || guess === currentTrackBeforeDash 
    || guess === currentTrackBeforeParenthesis 
    || guess === currentTrackBetweenParenthesis 
    || guess === currentTrackBeforePtPeriod 
    || jarowBeforePunctuationScore > .9
    || jarowWholeStringScore > .85) {
      return true
    } else {
      return false
    }
}

export default GuessAlgorithm;
