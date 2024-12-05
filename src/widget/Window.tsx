import Adw from "gi://Adw"
import Gtk from "gi://Gtk"
import WindowTemplate from "./Window.blp"
import IconBox from "./IconBox"
import { property, register } from "gjsx/gobject"
import { get_settings, copy_to_clipboard, search_icons } from "@/lib"
import { gettext as _ } from "gettext"

@register({
    GTypeName: "Window",
    Template: WindowTemplate,
    InternalChildren: ["searchentry", "toastoverlay"],
})
export default class Window extends Adw.ApplicationWindow {
    @property(String) declare visible_child_name: "search" | "grid" | "not-found"
    @property(String) declare selected_icon: string
    @property(String) declare search_text: string
    @property(IconBox) declare icon_box: IconBox

    constructor(application: Adw.Application) {
        super({ application })

        this._searchentry.set_key_capture_widget(this)

        this.icon_box = new IconBox({
            on_selected: (icon) => {
                this.selected_icon = icon
                this.copy_to_clipboard()
            },
        })

        get_settings().app.connect("changed::colored", () => {
            this._searchentry.emit("search-changed")
        })
    }

    declare _searchentry: Gtk.SearchEntry
    declare _toastoverlay: Adw.ToastOverlay

    protected copy_to_clipboard() {
        copy_to_clipboard(this.selected_icon)

        this._toastoverlay.add_toast(new Adw.Toast({
            title: _("Copied to clipboard"),
            timeout: 1,
        }))
    }

    protected on_searchentry_search_changed({ text }: Gtk.SearchEntry) {
        this.selected_icon = ""

        if (text === "") {
            this.visible_child_name = "search"
        } else {
            const icons = search_icons(text)
            this.icon_box.set_icons(icons)

            this.visible_child_name = icons.length > 0
                ? "grid"
                : "not-found"
        }
    }

    protected on_searchentry_search_started(entry: Gtk.SearchEntry) {
        entry.grab_focus()
    }

    protected has_selected() {
        return this.selected_icon != ""
    }
}
