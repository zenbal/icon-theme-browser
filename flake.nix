{
  description = "Browse icons from themes installed on system";
  inputs.nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";

  outputs = {
    self,
    nixpkgs,
  }: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};

    nativeBuildInputs = with pkgs; [
      wrapGAppsHook4
      gobject-introspection
      blueprint-compiler
      meson
      pkg-config
      ninja
      esbuild
      desktop-file-utils
    ];

    buildInputs = with pkgs; [
      gjs
      glib
      gtk4
      libadwaita
    ];
  in {
    packages.${system}.default = pkgs.stdenv.mkDerivation {
      inherit buildInputs nativeBuildInputs;
      pname = "icon-theme-browser";
      version = "0.1.0";
      src = ./.;
    };

    devShells.${system}.default = pkgs.mkShell {
      buildInputs = buildInputs ++ nativeBuildInputs;
    };
  };
}
