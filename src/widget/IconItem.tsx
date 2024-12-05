import Gtk from "gi://Gtk"
import Gio from "gi://Gio"
import GObject from "gi://GObject"
import { css as scss } from "gjsx/style"
import { register, property } from "gjsx/gobject"
import { get_settings } from "@/lib"

scss`
flowboxchild.icon-item {
    margin: 0;
    padding: 0;
    transition: all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

flowboxchild.icon-item image {
    margin: 8px;
}

flowboxchild.icon-item:hover {
    background: alpha(currentColor, .07);
}

flowboxchild.icon-item:active {
    background: alpha(currentColor, .16);
}

flowboxchild.icon-item:selected {
    background: alpha(currentColor, .1);
}
`

@register({ GTypeName: "IconItem" })
export default class IconItem extends Gtk.FlowBoxChild {
    @property(String) declare icon_name: string

    constructor(icon?: string) {
        super({
            child: new Gtk.Image(),
            css_classes: ["icon-item"],
        })

        if (icon) this.icon_name = icon

        this.bind_property(
            "icon-name",
            this.child,
            "icon-name",
            GObject.BindingFlags.SYNC_CREATE,
        )

        get_settings().app.bind(
            "icon-size",
            this.child,
            "pixel-size",
            Gio.SettingsBindFlags.DEFAULT,
        )
    }
}
