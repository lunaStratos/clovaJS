'use strict';

/**
 * 클로바용으로 만들어진 CLOVA JS
 * REF: https://developers.naver.com/console/clova/guide/
 * CLOVA™의 브랜드는 네이버에 있습니다.
 * Copyright (c) LunaStratos (LunaStratos@gmail.com)
 */

//jsonReturn 모듈
const makeJson = require('./json/json_clova.js')
//프로세스 모듈 분리
const processGet = require('./processModule/getSlots.js')

module.exports = (rq, re = {}) => {

  const req = rq
  const res = re

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
      const jsonResult = makeJson(str, false)
      return res.send(jsonResult)
    },
    /**
     * 말하면 종료
     * clova.tell("내용") 형태로 사용
     */
    tell: (str) => {
      const jsonResult = makeJson(str, true)
      return res.send(jsonResult)
    },
  }
}
