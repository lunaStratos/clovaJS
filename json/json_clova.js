'use strict';

/*
response moduel
 */
module.exports = (str,lang, endField  = {}) =>{
  let JsonField = {
    "version": "0.1.0",
    "sessionAttributes": {},
    "response": {
      "outputSpeech": {
        "type": "SimpleSpeech",
        "values": {
          "type": "PlainText",
          "lang": lang,
          "value": str
        }
      },
      "card": {},
      "directives": [],
      "shouldEndSession": endField
    }
  };
  return JsonField;

}

/*
"en": 영어
"ja": 일본어
"ko": 한국
 */
