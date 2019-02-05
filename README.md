
## Clova JS ##

[English]

Naver CLOVA ™'s request and response is made easier by npm.
It is the npm that can be used for the development of CLOVA ™ Extension. I made it by referring to Naver CLOVA ™ Reference [Document] (https://developers.Clova.co.kr/docs/).

The characteristics of this npm are as follows.

* You do not need to create a response json.
* When you enter a value, it is automatically sent to the response.
* Value can be obtained simply by entering the key name of the parameter.
* Resolving the complexity of parsing Json in request.

* This npm is informal. The brand of CLOVA ™ is NAVER Corp.

[Korean]

Naver CLOVA™의 request 와 response 더욱 쉽게 하기 위해서 만든 npm입니다.
CLOVA™ Extension 개발시 사용이 가능한 npm이며, Naver CLOVA™의 레퍼런스 [문서](https://developers.Clova.co.kr/docs/)를 참조하여 만들었습니다.

본 npm의 특징은 다음과 같습니다.

* response json을 만들 필요가 없음.
* 값을 넣으면 자동으로 response에 넣어서 보내짐.
* 파라메터를 key 이름만 입력하면 간단하게 Value를 얻을 수 있음.
* request의 Json을 parsing하는 복잡함 해결.

* 본 npm은 비공식입니다. CLOVA™의 브랜드는 네이버주식회사(NAVER Corp) 있습니다.

[Japanese]

LINE CLOVA™のrequestとresponseさらに容易にするために作成されたnpmです。
CLOVA™Extension開発時に使用が可能なnpmであり、LINE CLOVA™のリファレンスドキュメント（https://clova-developers.line.biz/guide/）を参照して、作成しました。

本npmの特徴は次のとおりです。

* response jsonを作成する必要がありません。
* 値を挿入すると自動的にresponseに入れ送られます。
* パラメータをkeyの名前を入力すれば簡単にValueを得ることができます。
* requestのJsonをparsingする複雑解決します。

* 本npmは非公式です。CLOVA™のブランドは、株式会社LINE（LINE Corp）があります。

## Version History ##

* 0.1.1 : Multi language support. (support Japan)
* 0.1.0 A : First version. PlainText.

## How to use ##

* 1. First, npm install clovajs --save

    npm install clovajs --save

* 2. And write require('clovajs') like below text

    const clovaApp = require('clovajs').ko; //korean
    const clovaApp = require('clovajs').ja; //japanese

Must select ko or ja. If not select, it response to  korean lang Json mode.
뒤에 언어를 선택해야 합니다. 선택하지 않았다면 한국어 response로 보냅니다.

> 현재로서는 언어를 구분할수 있는 방법이 없기 때문에 이런 방식을 사용하였지만, 언어를 구분할수 있는 response가 나온다면 지원할 예정입니다.

* 3. Put the request and response in the following code and use the clova function.

    const clova = clovaApp(reqest, response);

### Request ###

#### Get value in slots ###

	const value1 = clova.get("SlotsName")

If not have value, output **undefined**.
만약 값이 없다면 **undefined** 가 나옵니다.
もし値がない場合は **undefined** が出ます。

#### Get Intent' Name ####

	const name = clova.name("intent.actionName")
	//return String ActionName

#### Get Intent's Type ####

	const type = clova.type()
	// return String Type name

Get one in Three type
 - Start(LaunchRequest)
 - EXIT(SessionEndedRequest)
 - Custom conversation(IntentRequest)

### Visit New or before use ###

	const new = clova.new()
	// return Boolean : true or false

###  Get Slots's Value ###

	 const value = clova.get('slotsName')
   //return Slot Value
   //If not have slot value, return undefined


###  Get application id ###

    const applicationId = clova.application()
    //return com.domain.name

###  Get display Size ###

    const displaySize = clova.displaySize()
    //return String

###  Get landscape mode ###

    const orientation = clova.orientation()
    //return String mode (ex: landscape)

###  Get content Layer ###

    const contentLayer = clova.contentLayer()
    const width = contentLayer.width
    const height = contentLayer.height
    // return json. It have width and height.
    // Width and Height have Int number

### Response ###

###  Common conversations  ###

	let speechText = 'Day before yesterday I saw a rabbit, and yesterday a deer, and today, you'
	clova.ask(speechText)
	//Auto response.send(json)

### End Conversation ###

	let speechText = 'The Quick Brown Fox Jumps Over The Lazy Dog.'
	clova.tell(speechText)
	//Auto response.send(json)

Chat bot exit.

### NodeJS Express Engine Sample ###

    const express = require('express')
    const clovaApp = require('clovajs');
    const app = express()

    app.get('/say',  (req, res) => {
      const clova = clovaApp(req, res);
      let speechText = 'Day before yesterday I saw a rabbit, and yesterday a deer, and today, you'
      clova.say(speechText);
    })

    app.get('/getSlots',  (req, res) => {
      const clova = clovaApp(req, res);
      let value  = clova.get('slotsName')
      clova.say('Get slots ' + value);
    })

    app.get('/tell',  (req, res) => {
      const clova = clovaApp(req, res);
      let speechText = 'Day before yesterday I saw a rabbit, and yesterday a deer, and today, you'
      clova.tell(speechText);
    })

    app.listen(3000)
    console.log('Start Server')


### Use Google cloud Functions Sample ###

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

      // conversation
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
          //EXIT function
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

## Question ##

mail to **Dev.LunaStratos@gmail.com**
