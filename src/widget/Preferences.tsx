import Adw from "gi://Adw"
import Gtk from "gi://Gtk"
import Gdk from "gi://Gdk"
import { gettext as _ } from "gettext"
import { getSettings, getThemeNames, getTheme, setTheme } from "@/lib"
import { jsx } from "gjsx/gtk4"
import { bind } from "gjsx/state"

export default function Preferences() {
    let dialog: Adw.PreferencesDialog
    const { app: settings } = getSettings()
    const themes = getThemeNames()

    function onKeyPressed(_: Gtk.EventControllerKey, keyval: number) {
        if (keyval === Gdk.KEY_Escape) {
            dialog.close()
        }
    }

    return (
        <Adw.PreferencesDialog
            $={self => dialog = self}
            title={_("Browser Preferences")}
        >
            <Gtk.EventControllerKey $key-pressed={onKeyPressed} />
            <Adw.PreferencesPage title={_("Browser Preferences")}>
                <Adw.PreferencesGroup>
                    <Adw.SpinRow
                        title={_("Icon Size")}
                        subtitle={_("Size of the icons in the grid")}
                        adjustment={jsx(Gtk.Adjustment, {
                            lower: 8,
                            upper: 128,
                            stepIncrement: 1,
                            pageIncrement: 4,
                            value: bind<number>(settings, "icon-size"),
                            $_value: ({ value }) => settings.set_int("icon-size", value),
                        })}
                    />
                    <Adw.ActionRow
                        title={_("Theme")}
                        subtitle={_("Theme of the icons in the grid")}
                    >
                        <Gtk.DropDown
                            enableSearch
                            valign={Gtk.Align.CENTER}
                            selected={themes.findIndex(v => v == getTheme())}
                            $_selected={({ selected }) => setTheme(themes[selected])}
                            _constructor={() => Gtk.DropDown.new_from_strings(themes)}
                        />
                    </Adw.ActionRow>
                    <Adw.ActionRow
                        title={_("Color")}
                        subtitle={_("What kind of icons to show")}
                    >
                        <Gtk.DropDown
                            valign={Gtk.Align.CENTER}
                            selected={bind<number>(settings, "colored")}
                            $_selected={({ selected }) => settings.set_enum("colored", selected)}
                            _constructor={() => Gtk.DropDown.new_from_strings([
                                _("Both"),
                                _("Symbolic Only"),
                                _("Colored Only"),
                            ])}
                        />
                    </Adw.ActionRow>
                </Adw.PreferencesGroup>
            </Adw.PreferencesPage>
        </Adw.PreferencesDialog>
    )
}
