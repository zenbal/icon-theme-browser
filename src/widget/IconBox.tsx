import Gtk from "gi://Gtk?version=4.0"
import Gdk from "gi://Gdk?version=4.0"
import IconItem from "./IconItem"
import { Binding } from "gjsx/state"
import { For } from "gjsx/gtk4"

interface IconBoxProps {
    icons: Binding<Array<string>>
    onSelected: (icon: string) => void
}

export default function IconBox({ onSelected, icons }: IconBoxProps) {
    let flowbox: Gtk.FlowBox

    const arr = icons.as(icons => icons.map(icon => ({ icon })))

    function onKeyPressed(_: Gtk.EventControllerKey, keyval: number) {
        if (keyval === Gdk.KEY_Return) {
            for (const child of flowbox.get_selected_children()) {
                onSelected((child as IconItem).iconName)
            }
        }
    }

    function childActivated(_: Gtk.FlowBox, { iconName }: IconItem) {
        onSelected(iconName)
    }

    return (
        <Gtk.FlowBox
            $={self => flowbox = self}
            valign={Gtk.Align.START}
            marginTop={12}
            marginBottom={12}
            marginEnd={32}
            marginStart={32}
            columnSpacing={4}
            rowSpacing={4}
            maxChildrenPerLine={99}
            $childActivated={childActivated}
        >
            <Gtk.EventControllerKey $key-pressed={onKeyPressed} />
            <For each={arr} cleanup={item => item.run_dispose()}>
                {({ icon }) => (<IconItem icon={icon} />)}
            </For>
        </Gtk.FlowBox>
    )
}
