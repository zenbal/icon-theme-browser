import { gettext as _ } from "gettext"
import { register } from "gjsx/gobject"
import { apply, css as scss } from "gjsx/style"
import Adw from "gi://Adw"
import Gtk from "gi://Gtk"
import Gio from "gi://Gio"
import Window from "./widget/Window"
import Preferences from "./widget/Preferences"
import { initialize_settings } from "./lib"

scss`
toast {
    background: black;
}
`

@register({ GTypeName: "IconThemeBrowser" })
export default class IconThemeBrowser extends Adw.Application {
    window!: Window
    preferences!: Preferences
    about!: Adw.AboutDialog

    constructor() {
        super({ application_id: pkg.name })
        this.set_action("about", this.show_about)
        this.set_action("preferences", this.show_settings)
        this.set_accels_for_action("app.preferences", ["<Control>comma"])
    }

    on_activate() {
        initialize_settings()
        apply()

        if (!this.window)
            this.window = new Window(this)

        this.window.present()
    }

    set_action(name: string, callback: () => void) {
        const action = new Gio.SimpleAction({ name })
        action.connect("activate", callback.bind(this))
        this.add_action(action)
    }

    show_settings() {
        if (!this.preferences)
            this.preferences = new Preferences()

        this.preferences.present(this.window)
    }

    show_about() {
        if (!this.about) {
            this.about = new Adw.AboutDialog({
                application_name: _("Icon Theme Browser"),
                application_icon: "application-x-executable",
                developer_name: "Aylur",
                issue_url: "https://github.com/aylur/icon-theme-browser",
                version: pkg.version,
                license_type: Gtk.License.MIT_X11,
            })
        }

        this.about.present(this.window)
    }

    static main(args: string[]) {
        return new IconThemeBrowser().runAsync(args)
    }
}
