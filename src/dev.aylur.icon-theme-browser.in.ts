#!@GJS@ -m

import { exit, programArgs, programInvocationName } from "system"

imports.package.init({
    name: "@APP_ID@",
    version: "@PACKAGE_VERSION@",
    prefix: "@PREFIX@",
    libdir: "@LIBDIR@",
})

pkg.initGettext()

Object.assign(globalThis, {
    resource: "resource://@RESOURCE@",
})

const module = await import(`${resource}/icon-theme-browser.js`)
const exitCode = await module.default.main([programInvocationName, ...programArgs])
exit(exitCode)
