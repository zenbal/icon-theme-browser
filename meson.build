project(
  'icon-theme-browser',
  version: run_command('cat', meson.project_source_root() / 'version').stdout().strip(),
)

app_id = 'dev.aylur.icon-theme-browser'
resource = '/dev/aylur/icon-theme-browser'

prefix = get_option('prefix')
datadir = prefix / get_option('datadir')
bindir = prefix / get_option('bindir')
pkgdatadir = datadir / app_id

find_program('node', required: true)
find_program('blueprint-compiler', required: true)

dependency('gtk4')
dependency('libadwaita-1')

subdir('data')
subdir('src')

import('gnome').post_install(
  # gtk_update_icon_cache: true,
  glib_compile_schemas: true,
  update_desktop_database: true,
)
