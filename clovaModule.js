
const makeJson = require('./json/json_clova.js')
const processGet = require('./processModule/getSlot.js')

module.exports = (request, response, lang = {}) => {

  const req = request;
  const res = response;
  const language = lang

  return {
    /**
     * 인텐트 Name (Custom 대화)
     * clova.name() 형태로 사용
     * return String
     */
    name: () => {
      const name = req.body.request.intent.name;
      return name
    },
    /**
     * 인텐트 Type (새로시작, 종료, 일반대화) 확인
     * clova.type() 형태로 사용
     * return String
     */
    type: () => {
      const type = req.body.request.type;
      return type
    },
    /**
     * 새로운 방문자인지 확인
     * clova.new() 형태로 사용 :
     * return Boolean : true or false
     */
    new: () => {
      const newComer = req.body.session.new;
      return newComer
    },
    /**
     * 어플리케이션 Id확인
     * return String : com.naver.naver
     */
    application: () => {
      const applicationId = req.body.context.System.application.applicationId;
      return applicationId
    },
    /**
     * Display Size
     * return String
     */
    displaySize: () => {
      const displaySize = req.body.context.System.device.display.size;
      return displaySize
    },
    /**
     * Display landscape mode
     * return String (landscape)
     */
    orientation: () => {
      const orientation = req.body.context.System.device.display.orientation;
      return orientation
    },
    /**
     * Content's Layer Size
     * return json ("width": 640,"height": 360)
     * Value: json.width, json.height
     */
    contentLayer: () => {
      const contentLayer = req.body.context.System.device.display.contentLayer;
      return contentLayer
    },
    /**
     * slots 얻을 수 있는 부분
     * clova.get("EntityName") 형태로 사용
     * 있을시 return slots Value
     * 없을시 return undefined
     */
    get: (valueName) => {
      let value = processGet(valueName, req)
      return value
    },
    /**
     * 말하면 대화 연결
     * clova.ask("내용") 형태로 사용
     */
    ask: (str) => {
      const jsonResult = makeJson(str, language, false)
      return res.send(jsonResult)
    },
    /**
     * 말하면 종료
     * clova.tell("내용") 형태로 사용
     */
    tell: (str) => {
      const jsonResult = makeJson(str, language, true)
      return res.send(jsonResult)
    },

  }
}
