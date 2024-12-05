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
    'validate-gschema',
    glib_compile_schemas,
    args: ['--strict', '--dry-run', meson.current_source_dir()],
  )
endif

configure_file(
  input: app_id + '.in.gschema.xml',
  output: app_id + '.gschema.xml',
  configuration: {
    'RESOURCE': resource,
    'APP_ID': app_id,
  },
  install: true,
  install_dir: datadir / 'glib-2.0' / 'schemas',
)
