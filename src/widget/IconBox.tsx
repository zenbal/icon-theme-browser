import Gtk from "gi://Gtk"
import IconItem from "./IconItem"
import { register } from "gjsx/gobject"

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
