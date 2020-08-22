import distance from 'jaro-winkler';

const GuessAlgorithm = (trackName, guess) => {

  let lowercaseTrackName = trackName.toLowerCase()
  
  // Strip punctuation, spaces, and capitalization from track titles and guess to make guessing easier
  // removing the comma from the split to make guessing a little bit harder
  let lowercaseTrackNameBeforePunctuation = lowercaseTrackName.split(/[(-]|pt./)[0].replace(/[^\w]/g, '')
  let lowercaseTrackNameBetweenParenthesis = trackName.split(/[()]+/)[1] ? lowercaseTrackName.split(/[()]+/)[1].replace(/[^\w]/g, '') : trackName
  let jarowBeforePunctuationScore = distance(guess.split(/[(-]|pt./)[0].replace(/[^\w]/g, ''), lowercaseTrackNameBeforePunctuation, { caseSensitive: false })
  let jarowBetweenParenthesisScore = distance(guess.replace(/[^\w]/g, ''), lowercaseTrackNameBetweenParenthesis, { caseSensitive: false })
  let jarowWholeStringScore = distance(guess, trackName, { caseSensitive: false })

  // console.log(lowercaseTrackName, guess, lowercaseTrackNameBeforePunctuation, lowercaseTrackNameBetweenParenthesis, jarowBeforePunctuationScore, jarowBetweenParenthesisScore, jarowWholeStringScore)
  
  if ( 
    // consider implementing a JS Switch
    // guess === lowercaseTrackNameBeforePunctuation|| 
    // guess === lowercaseTrackNameBetweenParenthesis || 
    jarowBeforePunctuationScore > .91 || 
    jarowWholeStringScore > .89 ||
    jarowBetweenParenthesisScore > .95

    ) {
      return true
    } else {
      return false
    }
}

export default GuessAlgorithm;
