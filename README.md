# guld-user-cli

[![source](https://img.shields.io/badge/source-bitbucket-blue.svg)](https://bitbucket.org/guld/tech-js-node_modules-guld-user-cli) [![issues](https://img.shields.io/badge/issues-bitbucket-yellow.svg)](https://bitbucket.org/guld/tech-js-node_modules-guld-user-cli/issues) [![documentation](https://img.shields.io/badge/docs-guld.tech-green.svg)](https://guld.tech/cli/guld-user-cli.html)

[![node package manager](https://img.shields.io/npm/v/guld-user-cli.svg)](https://www.npmjs.com/package/guld-user-cli) [![travis-ci](https://travis-ci.org/guldcoin/tech-js-node_modules-guld-user-cli.svg)](https://travis-ci.org/guldcoin/tech-js-node_modules-guld-user-cli?branch=guld) [![lgtm](https://img.shields.io/lgtm/grade/javascript/b/guld/tech-js-node_modules-guld-user-cli.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/b/guld/tech-js-node_modules-guld-user-cli/context:javascript) [![david-dm](https://david-dm.org/guldcoin/tech-js-node_modules-guld-user-cli/status.svg)](https://david-dm.org/guldcoin/tech-js-node_modules-guld-user-cli) [![david-dm](https://david-dm.org/guldcoin/tech-js-node_modules-guld-user-cli/dev-status.svg)](https://david-dm.org/guldcoin/tech-js-node_modules-guld-user-cli?type=dev)

Guld user management tools. Get, list, and check users of the guld group.

### Install

##### Node

```sh
npm i -g guld-user-cli
```

### Usage

##### CLI

```sh
guld-user --help

  Usage: guld-user [options] [command]

  Guld user management tools. Get, list, and check users of the guld group.

  Options:

    -V, --version                 output the version number
    -u --user <name>              The user name to run as.
    -h, --help                    output usage information

  Commands:

    init [user-name] [full-name]  Initialize a new guld user.
    name                          Get the guld name of the current user.
    fullname                      Get the full name of the current user.
    branches                      List the user branches which are locally available.
    alias [options] [name]        List a user's usernames for known aliases for other networks. (i.e. github, bitbucket, gitlab, twitter)
    exists                        Check whether a guld name already exists.
    validate                      Check whether a guld name looks valid.

```

### License

MIT Copyright isysd
