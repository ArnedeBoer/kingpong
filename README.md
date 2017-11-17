# King Pong

This app allows you to create accounts to keep track of your ping pong matches against your friends.

## Background

We're currently enrolled in a coding bootcamp at the New York Code and Design academy which is a 12-week intensive course. This group project was created for the final assignment.

## Authors

* ** Arne de Boer **
* ** Vincent Kesumo **

## Getting Started

To set up the King Pong app, follow the instructions below.

### Prerequisites

You need a database. The credentials should be configured in a config.json file at /server/config. Also see the example file.

### Installing

Install the modules

```
$ npm install
```

Start the react server

```
$ npm start
```

Start nodemon

```
$ nodemon src/app
```

Optionally fill the database with initial data

```
$ sequelize db:seed:all
```
