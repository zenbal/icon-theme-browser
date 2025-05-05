import Adw from "gi://Adw"
import Gtk from "gi://Gtk"
import Gdk from "gi://Gdk"
import { gettext as _ } from "gettext"
import { getSettings, getThemeNames, getTheme, setTheme, Schmea } from "@/lib"
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
    <Adw.PreferencesDialog $={(self) => (dialog = self)} title={_("Browser Preferences")}>
      <Gtk.EventControllerKey $key-pressed={onKeyPressed} />
      <Adw.PreferencesPage title={_("Browser Preferences")}>
        <Adw.PreferencesGroup>
          <Adw.SwitchRow
            title={_("Show All Icons")}
            subtitle={_(
              "Turning this on might cause some lag if the theme contains a lot of icons",
            )}
            active={bind<boolean>(settings, Schmea.SHOW_ALL)}
            $$active={({ active }) => settings.set_boolean(Schmea.SHOW_ALL, active)}
          />
          <Adw.SpinRow title={_("Icon Size")} subtitle={_("Size of the icons in the grid")}>
            <Gtk.Adjustment
              lower={8}
              upper={128}
              stepIncrement={1}
              pageIncrement={4}
              value={bind<number>(settings, Schmea.ICON_SIZE)}
              $$value={({ value }) => settings.set_int(Schmea.ICON_SIZE, value)}
            />
          </Adw.SpinRow>
          <Adw.ComboRow
            title={_("Theme")}
            subtitle={_("Theme of the icons in the grid")}
            enableSearch
            model={Gtk.StringList.new(themes)}
            selected={themes.findIndex((v) => v == getTheme())}
            $$selected={({ selected }) => setTheme(themes[selected])}
          />
          <Adw.ComboRow
            title={_("Color")}
            subtitle={_("What kind of icons to show")}
            model={Gtk.StringList.new([_("Both"), _("Symbolic Only"), _("Colored Only")])}
            selected={bind<string>(settings, Schmea.COLORED).as(() =>
              settings.get_enum(Schmea.COLORED),
            )}
            $$selected={({ selected }) => settings.set_enum(Schmea.COLORED, selected)}
          />
        </Adw.PreferencesGroup>
      </Adw.PreferencesPage>
    </Adw.PreferencesDialog>
  )
}
