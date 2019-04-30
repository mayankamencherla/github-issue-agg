# Github Issue Aggregator

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
<!-- [![Packagist](https://img.shields.io/packagist/v/symfony/symfony.svg)]() -->

> This app allows your to query a repositories issues and track its open issues.

## Pre-requisities:
> Some key things to set up / understand to use this app:

- **[NodeJS v9](https://nodejs.org/en/)**
- **[npm](https://www.npmjs.com/)**

## Downloading
```bash
$ git clone https://github.com/mayankamencherla/github-issue-agg.git
```

## Setup Locally
> To get the app working locally, follow the instructions below.
> If any of the commands below are denied due to a permission error, please prepend a sudo to the command.

1. Navigate to the app's root directory

1. Run the following command to install all the dependencies:
```bash
$ npm install
```

1. Run the app on localhost by typing the following command:
```bash
$ npm start
```

1. Head over to <a href="http://localhost:3000/public" target="_blank">localhost:3000/public</a> on your browser

1. To use this app on heroku, please head over to <a href="https://shielded-bastion-41517.herokuapp.com/public" target="_blank">heroku</a>

1. You can add the github URL and the app will magically retrieve its issue statistics for you!