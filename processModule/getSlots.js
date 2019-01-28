
/*
for Slots get module
 */
module.exports = function (valueName, req) {

  let value = '';
  if (req.body.request.intent.hasOwnProperty('slots')) {
    if (Object.keys(req.body.request.intent.slots).length === 0) {
      /**
       * 값 없음.
       * {} 값 방지.
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
