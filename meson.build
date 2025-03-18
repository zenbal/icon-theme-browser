project(
  'icon-browser',
  version: run_command('cat', meson.project_source_root() / 'version').stdout().strip(),
)

app_id = 'dev.aylur.icon-browser'
resource = '/dev/aylur/icon-browser'

prefix = get_option('prefix')
datadir = prefix / get_option('datadir')
bindir = prefix / get_option('bindir')
pkgdatadir = datadir / app_id

dependency('gtk4')
dependency('libadwaita-1')

subdir('data')
subdir('src')

import('gnome').post_install(
  # gtk_update_icon_cache: true,
  glib_compile_schemas: true,
  update_desktop_database: true,
)
