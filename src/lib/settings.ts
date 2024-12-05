import Gtk from "gi://Gtk"
import Gio from "gi://Gio"
import { get_theme_names } from "./icon"

let app_settings: Gio.Settings

export function get_settings() {
    if (!app_settings)
        app_settings = new Gio.Settings({ schema_id: pkg.name })

    return {
        app: app_settings,
        gtk: Gtk.Settings.get_default()!,
    }
}

export function initialize_settings() {
    const { app, gtk } = get_settings()

    const setting = app.get_string("theme-name")

    if (get_theme_names().includes(setting)) {
        return (gtk.gtk_icon_theme_name = setting)
    }

    app.set_string("theme-name", gtk.gtk_icon_theme_name)
}

export function get_theme() {
    return get_settings().gtk.gtk_icon_theme_name
}

export function set_theme(theme: string) {
    const { app, gtk } = get_settings()

    app.set_string("theme-name", theme)
    gtk.gtk_icon_theme_name = theme
}
