#!/usr/bin/env node
const { setupConfig } = require('guld-git-config')
const { getName, getFullName, exists, validate } = require('guld-user')
const inquirer = require('inquirer')
const program = require('commander')
const VERSION = require('./package.json').version

/* eslint-disable no-console */
program
  .description('Guld user management tools. Get, list, and check users of the guld group.')
  .version(VERSION)
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

program.parse(process.argv)

var cmd
if (program.commands.map(c => c._name).indexOf(program.args[0]) !== -1) cmd = program.args.shift()
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
  case 'fullname':
    getFullName().then(console.log)
    break
  case 'name':
  default:
    getName().then(console.log)
    break
}
/* eslint-enable no-console */
