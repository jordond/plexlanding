# Plex Landing

Update: May 28
- Re-writes are fun, taking a simpler approach.
- The install and build process is going to be completely different.

**Under active development, not ready for use**

**This will be removed when a beta version is ready**

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
  - See if possible to scrape plex instance and add user to invite list **spoiler: it is**
- Dockerize the application

## Installing

- **TODO**

## Running

- **TODO**

## Development

- Clone the repo `git clone https://github.com/jordond/plexlanding`
- Check out new repo `git checkout develop`
- Enable precommit hook `npm run hook-install` **optional**
- Build and run the server `npm run dev`

## License

```
The MIT License (MIT)

Copyright (c) 2016 Jordon de Hoog

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
