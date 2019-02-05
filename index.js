'use strict';

/**
 * 클로바용으로 만들어진 CLOVA JS
 * REF: https://developers.naver.com/console/clova/guide/
 * CLOVA™의 브랜드는 Naver(Line)에 있습니다.
 * Copyright (c) LunaStratos (LunaStratos@gmail.com)
 */

//Language module
const clovaModule = require('./clovaModule.js')
//Support Language
const jp = 'ja'
const ko = 'ko'
const en = 'en'

//Language select
module.exports = (req, res = {}) => clovaModule(req, res, ko)

module.exports.ko = (req, res = {}) => clovaModule(req, res, ko) //korean
module.exports.ja = (req, res = {}) => clovaModule(req, res, jp) //japanese
module.exports.en = (req, res = {}) => clovaModule(req, res, en) //english
