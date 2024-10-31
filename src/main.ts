import { register } from "./lib/gobject"
import Adw from "gi://Adw"
import Window from "@/widget/Window"
import Gio from "gi://Gio"

declare global {
    const resource: string
}

@register({ GTypeName: "IconThemeBrowser" })
export default class IconThemeBrowser extends Adw.Application {
    on_activate() {
        const win = new Window({
            application: this,
            app_settings: new Gio.Settings({
                schema_id: pkg.name,
            }),
        })

        win.present()
        win.update_list("")
    }

    static main(args: string[]) {
        const app = new IconThemeBrowser({
            application_id: pkg.name,
        })

        return app.runAsync(args)
    }
}
