import Gtk from "gi://Gtk"
import Gio from "gi://Gio"
import { getThemeNames } from "./icon"

let app_settings: Gio.Settings

export enum Colored {
    BOTH,
    SYMBOLIC_ONLY,
    COLORED_ONLY,
}

export function getSettings() {
    if (!app_settings)
        app_settings = new Gio.Settings({ schema_id: pkg.name })

    return {
        app: app_settings,
        gtk: Gtk.Settings.get_default()!,
    }
}

export function initializeSettings() {
    const { app, gtk } = getSettings()

    const setting = app.get_string("theme-name")

    if (getThemeNames().includes(setting)) {
        return (gtk.gtk_icon_theme_name = setting)
    }

    app.set_string("theme-name", gtk.gtk_icon_theme_name)
}

export function getTheme() {
    return getSettings().gtk.gtk_icon_theme_name
}

export function setTheme(theme: string) {
    const { app, gtk } = getSettings()

    app.set_string("theme-name", theme)
    gtk.gtk_icon_theme_name = theme
}
