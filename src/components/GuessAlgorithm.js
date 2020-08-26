import distance from 'jaro-winkler';

const GuessAlgorithm = (trackName, guess) => {

  let lowercaseTrackName = trackName.toLowerCase()
  
  let lowercaseTrackNameBeforePunctuation = lowercaseTrackName.split(/[(-]|pt./)[0].replace(/[^\w]/g, '')
  let lowercaseTrackNameBetweenParenthesis = trackName.split(/[()]+/)[1] ? lowercaseTrackName.split(/[()]+/)[1].replace(/[^\w]/g, '') : trackName
  let jarowBeforePunctuationScore = distance(guess.split(/[(-]|pt./)[0].replace(/[^\w]/g, ''), lowercaseTrackNameBeforePunctuation, { caseSensitive: false })
  let jarowBetweenParenthesisScore = distance(guess.replace(/[^\w]/g, ''), lowercaseTrackNameBetweenParenthesis, { caseSensitive: false })
  let jarowWholeStringScore = distance(guess, trackName, { caseSensitive: false })
  
  if ( 
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
