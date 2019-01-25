'use strict';


module.exports = (str,endField  = {}) =>{
  let JsonField = {
    "version": "0.1.0",
    "sessionAttributes": {},
    "response": {
      "outputSpeech": {
        "type": "SimpleSpeech",
        "values": {
          "type": "PlainText",
          "lang": "ko",
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
