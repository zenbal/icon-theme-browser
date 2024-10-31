project('icon-theme-browser')

app_id = 'dev.aylur.icon-theme-browser'
resource = '/dev/aylur/icon-theme-browser'

prefix = get_option('prefix')
datadir = prefix / get_option('datadir')
bindir = prefix / get_option('bindir')
pkgdatadir = datadir / app_id

dependency('gjs-1.0', version: '>= 1.80.0')
dependency('gtk4')
dependency('libadwaita-1')

subdir('data')
subdir('src')

import('gnome').post_install(
  # gtk_update_icon_cache: true,
  glib_compile_schemas: true,
  update_desktop_database: true,
)
