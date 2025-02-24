import Gtk from "gi://Gtk"
import IconItem from "./IconItem"
import { Binding } from "gjsx/state"

interface IconBoxProps {
    icons: Binding<Array<string>>
    onSelected: (icon: string) => void
}

export default function IconBox({ onSelected, icons }: IconBoxProps) {
    let unsub: () => void

    return (
        <Gtk.FlowBox
            valign={Gtk.Align.START}
            marginTop={12}
            marginBottom={12}
            marginEnd={32}
            marginStart={32}
            columnSpacing={4}
            rowSpacing={4}
            maxChildrenPerLine={99}
            $childActivated={(_, { iconName }: IconItem) => onSelected(iconName)}
            $destroy={() => unsub()}
            $={self => unsub = icons.subscribe(icons => {
                self.remove_all()
                icons.map(icon => self.append(new IconItem({ icon })))
            })}
        />
    )
}
