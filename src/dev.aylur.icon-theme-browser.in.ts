#!@GJS@ -m

import { exit, programArgs, programInvocationName } from "system"

imports.package.init({
    name: "@APP_ID@",
    version: "@PACKAGE_VERSION@",
    prefix: "@PREFIX@",
    libdir: "@LIBDIR@",
})

pkg.initGettext()

// @ts-expect-error missing path
const module = await import("resource:///dev/aylur/icon-theme-browser/icon-theme-browser.js")
const exitCode = await module.default.main([programInvocationName, ...programArgs])
exit(exitCode)
