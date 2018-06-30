# guld-git-config-cli

CLI guld configuration helper manages git config files.

### Install

```
npm i -g guld-git-config-cli
```

### Usage

##### CLI

```
  Usage: guld-git-config <key> [value] Get or set a config key depending on pressence of value argument.

  Manage git config files the guld way.

  Options:

    -V, --version             output the version number
    --global                  Use the global config file
    --local                   Use the local config file
    --system                  Use the system config file.
    -f, --file <config-file>  Use the given config file.
    -h, --help                output usage information

  Commands:

    name                      Get the guld name of the current user.
    get <key>                 Get a config by key.
    set <key> <value>         Set a config key to the given value.
    unset                     Unset a config key.
    list                      List all config key/value pairs.
```
