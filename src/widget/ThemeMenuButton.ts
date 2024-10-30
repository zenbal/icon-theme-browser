import { register, property } from "@/lib/gobject"
import GObject from "gi://GObject"
import Gtk from "gi://Gtk"

interface ThemeMenuButtonProps extends Gtk.Button.ConstructorProps {
    theme_name: string
}

@register({
    GTypeName: "ThemeMenuButton",
    Template: "resource:///dev/aylur/icon-theme-browser/ui/ThemeMenuButton.ui",
})
export default class ThemeMenuButton extends Gtk.Button {
    @property(String) declare theme_name: string
    @property(Boolean) declare is_selected: boolean

    constructor(props: Partial<ThemeMenuButtonProps>) {
        super(props)

        this.add_css_class("theme-menu-button")

        const settings = Gtk.Settings.get_default()!

        // @ts-expect-error incorrect type
        settings.bind_property_full(
            "gtk-icon-theme-name",
            this,
            "is-selected",
            GObject.BindingFlags.SYNC_CREATE,
            (_, value: string) => [true, value == this.theme_name],
            null,
        )
    }

    on_clicked() {
        return Gtk.Settings.get_default()!.gtk_icon_theme_name = this.theme_name
    }
}
