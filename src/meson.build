configure_file(
  input: app_id + '.in.js',
  output: app_id,
  configuration: {
    'GJS': find_program('gjs').full_path(),
    'APP_ID': app_id,
    'VERSION': meson.project_version(),
    'PREFIX': prefix,
    'RESOURCE': resource,
  },
  install: true,
  install_dir: pkgdatadir,
)

bundle = custom_target(
  'bundle',
  input: files('main.ts'),
  command: [
    find_program('esbuild', required: true),
    '--bundle', files('main.ts'),
    '--format=esm',
    '--outfile=' + meson.project_build_root() / 'resource/icon-browser.js',
    '--sourcemap=inline',
    '--external:gi://*',
    '--external:resource://*',
    '--external:gettext',
  ],
  output: ['icon-browser.js'],
)

import('gnome').compile_resources(
  app_id + '.src',
  configure_file(
    input: app_id + '.in.src.gresource.xml',
    output: app_id + '.src.gresource.xml',
    configuration: {
      'RESOURCE': resource,
      'APP_ID': app_id,
    },
  ),
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
