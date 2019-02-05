
/*
for Slots get module
 */
module.exports = function (valueName, req) {

  let value = '';
  if (req.body.request.intent.hasOwnProperty('slots')) {
    if (req.body.request.intent.slots === null) {
      /**
       * 값 없음.
       * null 값 방지.
       * undefined 출력
       */
      value = undefined
    } else {
      /**
       * parameters 값 있음
       */
      const slots = req.body.request.intent.slots
      //파라메터의 이름 찾기
      if (slots.hasOwnProperty(valueName)) {
        value = slots[valueName].value
      } else {
        value = undefined
      }
    }
  } else {
    value = undefined
  }
  return value
}
