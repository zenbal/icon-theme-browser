# Icon Theme Browser

A simple application that lets you browse the icons of your icon themes.

![dark](https://github.com/Aylur/icon-theme-browser/blob/main/data/screenshots/dark.png)

## Nix

```sh
nix run github:aylur/icon-theme-browser
```

## Install from source

```sh
git clone https://github.com/Aylur/icon-theme-browser.git
cd icon-theme-browser
meson setup --prefix /usr build
meson install -C build
```

## TODO

- [ ] fuzzy query
- [ ] preferences page
- [ ] optimize somehow (currently lags when all icons are shown)
- [ ] preset categories similar to [icon-library](https://gitlab.gnome.org/World/design/icon-library)
- [ ] add desktop icon
