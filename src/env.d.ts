import "@girs/gjs"
import "@girs/adw-1"

declare module "*.css" {
  const style: string
  export default style
}

declare module "*.blp" {
  const blp: string
  export default blp
}
