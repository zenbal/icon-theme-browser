#!@GJS@ -m
/* eslint-disable no-undef */

import { exit, programArgs, programInvocationName } from "system"

imports.package.init({
  name: "@APP_ID@",
  version: "@VERSION@",
  prefix: "@PREFIX@",
  libdir: "@LIBDIR@",
})

pkg.initGettext()

const resource = "resource://@RESOURCE@"

const module = await import(`${resource}/icon-browser.js`)
const exitCode = await module.default.main([programInvocationName, ...programArgs])
exit(exitCode)
