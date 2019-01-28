## Clova JS ##

Naver CLOVA™의 request 와 response 더욱 쉽게 하기 위해서 만든 npm입니다.
CLOVA™ Extension 개발시 사용이 가능한 npm이며, Naver CLOVA™의 레퍼런스 [문서](https://developers.Clova.co.kr/docs/)를 참조하여 만들었습니다.

본 npm의 특징은 다음과 같습니다.

* response json을 만들 필요가 없음.
* 값을 넣으면 자동으로 response에 넣어서 보내짐.
* 파라메터를 key 이름만 입력하면 간단하게 Value를 얻을 수 있음.
* request의 Json을 parsing하는 복잡함 해결.

* 본 npm은 비공식입니다. CLOVA™의 브랜드는 네이버주식회사(NAVER Corp) 있습니다.


## Version History ##

* 0.1.0 : 최초 버전, Text input or output

## 사용방법 ##

    npm install clovajs --save

우선 **npm**을 설치합니다. 그리고 나서 **require**을 합니다.

    const clovaApp = require('clovajs');

그리고 나서

    const clova = clovaApp(reqest, response);

**request**와 **response**값을 **clovajs**안에 넣으면 사용이 가능합니다.

### Request 에서 값 얻기 ###

#### slots의 value를 얻을때 ###

	const value1 = clova.get("SlotsName")

slots에서 지정된 "SlotsName"의 **Value**가 나옵니다. 만약 값이 없다면 **undefined**가 나옵니다.

#### Intent의 name을 얻을때 ####

	const name = clova.name("intent.actionName")
	//return :ActionName }

Interaction에 설정한 Intent의 이름을 얻을수 있습니다.

#### Intent의 type을 얻을때 ####

	const type = clova.token()
	// type이 나옵니다.

시작(LaunchRequest), 종료(SessionEndedRequest) 그리고 일반 대화(IntentRequest)의 구분을 하는 부분입니다.

### 새로운 방문자인지 확인 ###

	const new = clova.new()
	// true or false

Boolean 형태로 나옵니다.

###  Slots의 값을 얻을때 ###

	 const value = clova.get('slotsName')

###  이어나가는 대화를 하려고 할때  ###

	let speechText = 'Day before yesterday I saw a rabbit, and yesterday a deer, and today, you'
	clova.ask(speechText)
	//res send가 자동으로 됩니다.

res.send()를 모듈에서 구현하고 있어, 따로 할 필요가 없습니다.

###   대화를 종료하려고 할때  ###

	let speechText = 'The Quick Brown Fox Jumps Over The Lazy Dog'
	clova.tell(speechText)
	//res send가 자동으로 됩니다.

res send가 자동으로 되며, 대화가 종료되어 챗봇이 끝납니다.

### Express 엔진에서 사용방법 ###



    const express = require('express')
    const clovaApp = require('clovajs');
    const app = express()

    app.get('/textSay',  (req, res) => {
      const clova = clovaApp(req, res);
      let speechText = 'Day before yesterday I saw a rabbit, and yesterday a deer, and today, you'
      clova.say(speechText);
    })

    app.get('/getslots',  (req, res) => {
      const clova = clovaApp(req, res);
      let value  = clova.get('slotsName')
      clova.say('받은 값은 ' + value);
    })

    app.listen(3000)

### GCP cloud Functions 에서 사용방법 ###

    'use strict';
    const clovaApp = require('clovajs')
    /**
     * for GCP cloud functions
     */
    exports.clovajs_temp = (req, res) => {
      let clova = clovaApp(req, res)

      // Welcome launchRequest
      function launchRequest() {
        let displayText = 'Day before yesterday I saw a rabbit, and yesterday a deer, and today, you';
        clova.ask(displayText)
      } // launchRequest

      //End Request
      function SessionEndedRequest() {
        console.log('SessionEndedRequest')
        let displayText = 'Wir müssen wissen, wir werden wissen';
        clova.tell(displayText)
      } // SessionEndedRequest

      // fallback
      function fallback() {
        let displayText = 'Champions are made from something they have deep inside them - a desire, a dream, a vision.'
        clova.ask(displayText)
      }

      // fallback
      function custom_func() {
        let displayText = 'Champions are made from something they have deep inside them - a desire, a dream, a vision.'
        clova.ask(displayText)
      }

      /**
       * intent switch
       */

      const CUSTOM_INTENT = 'intent.custom'

      function intent_select() {
        /*
        clova.name() is possible get a intent name.
        return :String.
         */
        switch (clova.name()) {
          case CUSTOM_INTENT:
            custom_func();
            break;
            /*
            If get a did't setting intent name, go to Fallback()
            */
          default:
            fallback();
        }
      }

      const LAUNCH_REQUEST = 'LaunchRequest';
      const INTENT_REQUEST = 'IntentRequest';
      const SESSION_ENDED_REQUEST = 'SessionEndedRequest';
      /*
      clova.type()) is possible get a Clova type name.
      return :String.
       */
      switch (clova.type()) {
        //First time open it
        case LAUNCH_REQUEST:
          launchRequest()
          break;
          /*
          If get custom type intent, functions are go to intent_select()
           */
        case INTENT_REQUEST:
          intent_select()
          //종료 기능
          break;
          /*
          End flow
           */
        case SESSION_ENDED_REQUEST:
          SessionEndedRequest()
          break;
          /*
          If get a did't setting  Type name, go to Fallback()
           */
        default:
          fallback();
      } //switch requests.type
    }

## GIT Address ##

https://github.com/lunaStratos/ClovaJS

## 문의사항 ##

**Dev.LunaStratos@gmail.com** 으로 메일 보내주시면 됩니다.
