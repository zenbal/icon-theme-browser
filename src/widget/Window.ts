import { property, register } from "@/lib/gobject"
import Adw from "gi://Adw"
import Gtk from "gi://Gtk"
import Gdk from "gi://Gdk"
import IconItem from "./IconItem"
import ThemeMenuButton from "./ThemeMenuButton"
import { search_icons, get_theme_names } from "@/lib/icons"
import { gettext as _ } from "gettext"
import GObject from "gi://GObject"
import Gio from "gi://Gio"

interface WindowProps extends Partial<Adw.ApplicationWindow.ConstructorProps> {
    app_settings: Gio.Settings
}

@register({
    GTypeName: "Window",
    Template: `${resource}/ui/Window.ui`,
    InternalChildren: ["flowbox", "view", "searchentry", "iconmenu", "toastoverlay"],
})
export default class Window extends Adw.ApplicationWindow {
    @property(String) declare selected_icon: string
    @property(String) declare visible_child_name: "flowbox" | "not-found"
    @property(Number) declare icon_size: number
    @property(Number) declare max_items: number
    @property(Boolean) declare copy_on_click: boolean

    constructor({ app_settings, ...props }: WindowProps) {
        super(props)

        this._searchentry.set_key_capture_widget(this._view)

        const settings = [
            "icon-size",
            "copy-on-click",
            "max-items",
        ]

        for (const setting of settings) {
            app_settings.bind(setting, this, setting, Gio.SettingsBindFlags.DEFAULT)
        }

        for (const name of get_theme_names()) {
            this._iconmenu.append(new ThemeMenuButton({
                theme_name: name,
            }))
        }

        Gtk.Settings.get_default()!.connect("notify::gtk-icon-theme-name", () => {
            this.update_list(this._searchentry.text)
            this.selected_icon = ""
        })
    }

    declare _flowbox: Gtk.FlowBox
    declare _view: Adw.ToolbarView
    declare _searchentry: Gtk.SearchEntry
    declare _iconmenu: Gtk.Box
    declare _toastoverlay: Adw.ToastOverlay

    update_list(text: string) {
        this._flowbox.remove_all()

        const icons = search_icons(text)

        for (const name of icons.slice(0, this.max_items)) {
            const icon = new IconItem({
                icon_name: name,
                icon_size: this.icon_size,
            })

            this.bind_property(
                "icon-size",
                icon,
                "icon-size",
                GObject.BindingFlags.SYNC_CREATE,
            )

            this._flowbox.append(icon)
        }

        this.visible_child_name = icons.length > 0 ? "flowbox" : "not-found"
        this._flowbox.unselect_all()
    }

    copy_to_clipboard() {
        const cb = Gdk.Display.get_default()!.get_clipboard()!
        cb.set_content(
            Gdk.ContentProvider.new_for_bytes(
                "text/plain",
                new TextEncoder().encode(this.selected_icon),
            ),
        )

        this._toastoverlay.add_toast(new Adw.Toast({
            title: _("Copied to clipboard"),
            timeout: 1,
        }))
    }

    protected on_searchentry_search_changed({ text }: Gtk.SearchEntry) {
        this.update_list(text)
        this.selected_icon = ""
    }

    protected on_searchentry_search_started(entry: Gtk.SearchEntry) {
        entry.grab_focus()
    }

    protected on_flowbox_child_activated(_: Gtk.FlowBox, child: IconItem) {
        this.selected_icon = child.icon_name

        if (this.copy_on_click) {
            this.copy_to_clipboard()
        }
    }

    protected has_selected() {
        return this.selected_icon != ""
    }

    protected decrease_icon_size() {
        if (this.icon_size > 16) {
            this.icon_size -= 4
        }
    }

    protected increase_icon_size() {
        if (this.icon_size < 128) {
            this.icon_size += 4
        }
    }
}
