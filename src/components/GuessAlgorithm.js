import distance from 'jaro-winkler';

const GuessAlgorithm = (trackName, guess) => {

  let lowercaseTrackName = trackName.toLowerCase()
  
  // Strip punctuation, spaces, and capitalization from track titles and guess to make guessing easier
  let lowercaseTrackNameBeforePunctuation = lowercaseTrackName.split(/[(,-]|pt./)[0].replace(/[^\w]/g, '')
  // let currentTrackSplitAtComma = lowercaseTrackName.split(',')[0].replace(/[^\w]/g, '')
  // let currentTrackBeforeDash = lowercaseTrackName.split('-')[0].replace(/[^\w]/g, '')
  // let currentTrackBeforeParenthesis = lowercaseTrackName.split('(')[0].replace(/[^\w]/g, '')
  let lowercaseTrackNameBetweenParenthesis = trackName.split(/[()]+/)[1] ? lowercaseTrackName.split(/[()]+/)[1].replace(/[^\w]/g, '') : trackName
  // let currentTrackBeforePtPeriod = lowercaseTrackName.split('Pt.')[0].replace(/[^\w]/g, '')
  // let currentTrackAfterParenthesis = trackName.split('(')[1].replace(/[^\w]/g, '').toLowerCase()
  let jarowBeforePunctuationScore = distance(guess.split('(')[0].split('-')[0].replace(/[^\w]/g, ''), trackName.split('(')[0].split('-')[0].replace(/[^\w]/g, ''), { caseSensitive: false })
  let jarowWholeStringScore = distance(guess, trackName, { caseSensitive: false })
  console.log(trackName, guess, lowercaseTrackName, lowercaseTrackNameBeforePunctuation, jarowBeforePunctuationScore, jarowWholeStringScore)
  // consider implementing a JS Switch
  if ( 
    // guess === currentTrackSplitAtComma
    // || guess === currentTrackBeforeDash 
    // || guess === currentTrackBeforeParenthesis 
    // || guess === currentTrackBeforePtPeriod
    guess === lowercaseTrackNameBeforePunctuation
    || guess === lowercaseTrackNameBetweenParenthesis 
    || jarowBeforePunctuationScore > .91
    || jarowWholeStringScore > .89
    ) {
      return true
    } else {
      return false
    }
}

export default GuessAlgorithm;
