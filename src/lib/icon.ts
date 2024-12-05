import Gtk from "gi://Gtk"
import Gdk from "gi://Gdk"
import GLib from "gi://GLib"

function get_theme() {
    return Gtk.IconTheme.get_for_display(Gdk.Display.get_default()!)
}

function is_dir(...path: string[]) {
    return GLib.file_test(
        GLib.build_filenamev(path),
        GLib.FileTest.IS_DIR,
    )
}

function is_file(...path: string[]) {
    return GLib.file_test(
        GLib.build_filenamev(path),
        GLib.FileTest.IS_REGULAR | GLib.FileTest.IS_SYMLINK,
    )
}

export function get_theme_names() {
    return get_theme().get_search_path()
        ?.flatMap((path) => {
            if (!is_dir(path)) {
                return []
            }

            const dir = GLib.Dir.open(path, 0)
            const names: string[] = []

            let name: string
            while ((name = dir.read_name()) !== null) {
                if (is_dir(path, name) && is_file(path, name, "index.theme"))
                    names.push(name)
            }

            dir.close()
            return names
        })
        .filter(name => name !== "hicolor" && name !== "default")
        .reduce((acc, name) => acc.includes(name) ? acc : [name, ...acc], [] as string[])
        .sort()
        || []
}

export function search_icons(search: string, limit = 0) {
    const names = get_theme().icon_names
        .filter(name => name.includes(search))
        .sort()

    return limit > 0
        ? names.slice(0, limit)
        : names
}
