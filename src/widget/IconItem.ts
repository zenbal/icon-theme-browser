import { register, property } from "@/lib/gobject"
import Gtk from "gi://Gtk"

interface IconProps extends Gtk.FlowBoxChild {
    icon_name: string
    icon_size: number
}

@register({
    GTypeName: "IconItem",
    Template: "resource:///dev/aylur/icon-theme-browser/ui/IconItem.ui",
})
export default class IconItem extends Gtk.FlowBoxChild {
    @property(String) declare icon_name: string
    @property(Number) declare icon_size: number

    constructor(props: Partial<IconProps>) {
        super(props)
        this.add_css_class("icon-item")
    }
}
