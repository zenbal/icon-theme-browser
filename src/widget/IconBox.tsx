import Gtk from "gi://Gtk"
import Gio from "gi://Gio"
import { css as scss } from "gjsx/style"
import { register } from "gjsx/gobject"
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
class IconItem extends Gtk.FlowBoxChild {
    icon_name: string

    constructor(icon: string) {
        super({
            css_classes: ["icon-item"],
            child: new Gtk.Image({ icon_name: icon }),
        })

        this.icon_name = icon

        get_settings().app.bind(
            "icon-size",
            this.child,
            "pixel-size",
            Gio.SettingsBindFlags.DEFAULT,
        )
    }
}

@register({ GTypeName: "IconBox" })
export default class IconBox extends Gtk.FlowBox {
    constructor({ on_selected }: { on_selected: (icon: string) => void }) {
        super({
            valign: Gtk.Align.START,
            margin_top: 12,
            margin_bottom: 12,
            margin_end: 32,
            margin_start: 32,
            column_spacing: 4,
            row_spacing: 4,
            max_children_per_line: 99,
        })

        this.connect("child-activated", (_, { icon_name }: IconItem) => {
            on_selected(icon_name)
        })
    }

    set_icons(icons: string[]) {
        this.remove_all()
        for (const icon of icons) {
            this.append(new IconItem(icon))
        }
    }
}
