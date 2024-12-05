import Gdk from "gi://Gdk"

export * from "./icon"
export * from "./settings"

export function copy_to_clipboard(text: string) {
    const cb = Gdk.Display.get_default()!.get_clipboard()!
    cb.set_content(
        Gdk.ContentProvider.new_for_bytes(
            "text/plain",
            new TextEncoder().encode(text),
        ),
    )
}
