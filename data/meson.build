blueprints = custom_target(
  'blueprints',
  input: files(
    'ui/IconItem.blp',
    'ui/ThemeMenuButton.blp',
    'ui/Window.blp',
  ),
  output: '.',
  command: [
    find_program('blueprint-compiler'),
    'batch-compile',
    '@OUTPUT@',
    '@CURRENT_SOURCE_DIR@',
    '@INPUT@',
  ],
)

import('gnome').compile_resources(
  app_id + '.data',
  app_id + '.data.gresource.xml',
  dependencies: blueprints,
  source_dir: meson.project_build_root() / 'ui',
  gresource_bundle: true,
  install: true,
  install_dir: pkgdatadir,
)

configure_file(
  input: app_id + '.in.desktop',
  output: app_id + '.desktop',
  configuration: {'EXEC': bindir / meson.project_name()},
  install: true,
  install_dir: datadir / 'applications',
)

glib_compile_schemas = find_program('glib-compile-schemas')
if glib_compile_schemas.found()
  test(
    'validate-gschema', glib_compile_schemas,
    args: [
      '--strict', '--dry-run', meson.current_source_dir()
    ]
  )
endif

install_data(
  app_id + '.gschema.xml',
  install_dir: datadir / 'glib-2.0' / 'schemas',
)
