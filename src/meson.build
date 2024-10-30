configure_file(
  input: app_id + '.in.ts',
  output: app_id,
  configuration: {
    'GJS': find_program('gjs').full_path(),
    'APP_ID': app_id,
    'PACKAGE_VERSION': meson.project_version(),
    'PREFIX': prefix,
  },
  install: true,
  install_dir: pkgdatadir,
)

bundle = custom_target(
  'bundle',
  input: files('main.ts'),
  command: [
    find_program('esbuild'),
    '--bundle', meson.project_source_root() / 'src/main.ts',
    '--format=esm',
    '--outfile='
    + meson.project_build_root() / 'resource/icon-theme-browser.js',
    '--external:console',
    '--external:system',
    '--external:cairo',
    '--external:gettext',
    '--external:resource://*',
    '--external:gi://*',
    '--external:file://*',
  ],
  output: ['resource'],
)

import('gnome').compile_resources(
  app_id + '.src',
  app_id + '.src.gresource.xml',
  dependencies: bundle,
  source_dir: meson.project_build_root() / 'resource',
  gresource_bundle: true,
  install: true,
  install_dir: pkgdatadir,
)

install_symlink(
  meson.project_name(),
  install_dir: bindir,
  pointing_to: pkgdatadir / app_id,
)
