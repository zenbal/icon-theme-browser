import Gtk from "gi://Gtk?version=4.0"
import Gdk from "gi://Gdk?version=4.0"
import IconItem from "./IconItem"
import { bind, Binding, State } from "gjsx/state"
import { For } from "gjsx/gtk4"

interface IconBoxProps {
  icons: Binding<Array<string>> | Array<string>
  onSelected: (icon: string) => void
}

export default function IconBox({ onSelected, icons }: IconBoxProps) {
  let flowbox: Gtk.FlowBox

  const arr =
    icons instanceof Binding
      ? icons.as((icons) => icons.map((icon) => ({ icon })))
      : bind(new State(icons.map((icon) => ({ icon }))))

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
      $={(self) => (flowbox = self)}
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
      <Gtk.EventControllerKey $keyPressed={onKeyPressed} />
      <For each={arr}>{({ icon }) => <IconItem icon={icon} />}</For>
    </Gtk.FlowBox>
  )
}
