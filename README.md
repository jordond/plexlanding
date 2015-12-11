# Plex Landing

**Under active development, not ready for use**

A landing page for a plex instance.  Allows users to see status of plex server, create an account and request access to your plex server.

## Features

- TODO

## To-do
- **Backend**
  - Auth for admin section
  - Scraping of plex.tv
  - Hitting the plex api for status
- **Frontend**
  - Create landing page
    - Featuring plex status, and misc info
  - Admin section
    - Pending users
    - All users
  - Scrape plex.tv to ease the creation of a plex account
  - See if possible to scrape plex instance and add user to invite list
- Dockerize the application

## Installing

1. Clone the repo `git clone git@github.com:jordond/plexlanding.git`
2. Install dependencies `npm install`
3. Compile by running `gulp build`

## Running

A config file (see example.config.json) needs to be placed in the project root.  Or for better safety pass the path of the config file in as an argument.

`--config=path/to/config | -c path/to/config`

1. Export production environment `export ENV=production`
2. Run the server `node build/server/app.js`
  - Optionally run `ENV=production node build/server/app.js`

### Issues

#### Bluebird warnings
I don't actually use bluebird in this app (save for a promisify maybe), as I wanted to try a ES6 experience.  However Sequelize depends on bluebirds for its promises.  With their latest update Bluebird introduced warnings if handling of promises wasn't done correctly.  Sequelize suffers from some of these warnings, and methods such as `.findAll() .findById() .count()` will display a huge block of warning code.  There is nothing I can do about that for the moment, so if you see them just ignore it. (My logger will not log bluebirds warnings)

----

## License

```
The MIT License (MIT)

Copyright (c) 2015 Jordon de Hoog

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
