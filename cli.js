#!/usr/bin/env node
const { setupConfig } = require('guld-git-config')
const { getName, getFullName, exists, validate, branches, getAlias } = require('guld-user')
const inquirer = require('inquirer')
const program = require('commander')
const global = require('window-or-global')
const thispkg = require(`${__dirname}/package.json`)
const runCLI = require('guld-cli-run')
var processing = false

/* eslint-disable no-console */
program
  .name(thispkg.name.replace('-cli', ''))
  .version(thispkg.version)
  .description(thispkg.description)
//  .description('Guld user management tools. Get, list, and check users of the guld group.')
  .option('-u --user <name>', 'The user name to run as.', (n) => {
    if (n) process.env.GULDNAME = global.GULDNAME = n
    return true
  })
program
  .command('init [user-name] [full-name]')
  .description('Initialize a new guld user.')
program
  .command('name')
  .description('Get the guld name of the current user.')
program
  .command('fullname')
  .description('Get the full name of the current user.')
program
  .command('branches')
  .description('List the user branches which are locally available.')
program
  .command('alias [name]')
  .description('List a user\'s usernames for known aliases for other networks. (i.e. github, bitbucket, gitlab, twitter)')
  .option('-n --network <network>', 'The network for which to get the user\'s alias.')
  .action(async (uname, options) => {
    uname = uname || getName()
    getAlias(uname, options.network).then(als => {
      if (options.network) console.log(als)
      else {
        console.log(Object.keys(als).map(a => {
          return `${a} ${als[a]}`
        }).join('\n'))
      }
      process.exit()
    })
    processing = true
  })
program
  .command('exists')
  .description('Check whether a guld name already exists.')
program
  .command('validate')
  .description('Check whether a guld name looks valid.')
/*
program
  .command('register')
  .option('-t,--type <ntype>', '', /^(individual|group|device|chain|ledger|address)$/i)
  .description('Register a name of particular type')
program
  .command('registered')
  .description('Check whether a guld name is registered.')
*/

/* eslint-disable no-console */

function inquireNames (user, full) {
  inquirer
    .prompt([
      {
        name: 'guldname',
        type: 'input',
        message: 'What is your individual guld name?',
        default: user
      },
      {
        name: 'fullname',
        type: 'input',
        message: 'What is your full name? (WARNING: public info!)',
        default: full
      }
    ]).then(answers => {
      answers.fullname = answers.fullname || answers.guldname
      setupConfig({
        'user': {
          'username': answers.guldname,
          'name': answers.fullname
        }
      })
    })
}

async function checkName (fn, n) {
  try {
    if (await fn(n)) console.log(true)
    else {
      console.log(false)
      process.exit(1)
    }
  } catch (e) {
    console.error(e.message)
    process.exit(1)
  }
}

function runner () {
  program.parse(process.argv)

  var cmd
  if (program.commands.map(c => c._name).indexOf(program.args[0]) !== -1) cmd = program.args.shift()
  if (!processing) {
    switch (cmd) {
      case 'init':
        if (program.args.length > 0) inquireNames(...program.args)
        else {
          getName().then(user => {
            getFullName().then(full => {
              inquireNames(user, full)
            })
          })
        }
        break
      case 'exists':
        if (program.args.length > 0) checkName(exists, program.args[0])
        else getName().then(n => checkName(exists, n))
        break
      case 'validate':
        if (program.args.length > 0) checkName(validate, program.args[0])
        else getName().then(n => checkName(validate, n))
        break
      case 'branches':
        branches().then(b => {
          console.log(b.join('\n'))
        })
        break
      case 'alias':
        break
      case 'fullname':
        getFullName().then(console.log)
        break
      case 'name':
      default:
        getName().then(console.log)
        break
    }
  }
}
/* eslint-enable no-console */
runCLI.bind(program)(program.help, runner)
module.exports = program
