import Adw from "gi://Adw"
import Gio from "gi://Gio"
import Gtk from "gi://Gtk"
import Gdk from "gi://Gdk"
import Template from "./Preferences.blp"
import { gettext as _ } from "gettext"
import { register, property } from "gjsx/gobject"
import { get_settings, get_theme_names, get_theme, set_theme } from "@/lib"

@register({ GTypeName: "Preferences", Template, InternalChildren: ["theme_names"] })
export default class Preferences extends Adw.PreferencesDialog {
    @property(Number) declare icon_size: number
    @property(Number) declare colored: number

    declare _theme_names: Adw.ActionRow

    constructor() {
        const { app } = get_settings()

        super({ title: _("Browser Preferences") })
        this.colored = app.get_enum("colored")
        this.setup_theme_names()

        app.bind("icon-size", this, "icon-size", Gio.SettingsBindFlags.DEFAULT)
        app.connect("changed::colored", () => this.colored = app.get_enum("colored"))
        this.connect("notify::colored", () => app.set_enum("colored", this.colored))
    }

    setup_theme_names() {
        const themes = get_theme_names()
        const dropdown = Gtk.DropDown.new_from_strings(themes)

        dropdown.enable_search = true
        dropdown.valign = Gtk.Align.CENTER
        dropdown.set_selected(themes.findIndex(v => v == get_theme()))
        dropdown.connect("notify::selected", () => {
            set_theme(themes[dropdown.selected])
        })

        this._theme_names.add_suffix(dropdown)
        this._theme_names.activatable_widget = dropdown
    }

    on_key_pressed(_: Gtk.EventControllerKey, keyval: number) {
        if (keyval === Gdk.KEY_Escape) {
            this.close()
        }
    }
}
