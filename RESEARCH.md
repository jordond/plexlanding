## Research

## Getting plex token

```
POST /users/sign_in.json HTTP/1.1
Host: plex.tv
X-Plex-Client-Identifier: <IDENTIFIER>
X-Plex-Device: Linux
X-Plex-Device-Name: Plex Landing
X-Plex-Platform-Version: 0.0.1
X-Plex-Product: Plex invitation helper
Cache-Control: no-cache
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="user[login]"

<EMAIL OR USERNAME>
----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="user[password]"

<PASSWORD>
----WebKitFormBoundary7MA4YWxkTrZu0gW
```

## Getting server id

```
GET /api/servers/ HTTP/1.1
Host: plex.tv
X-Plex-Client-Identifier: <IDENTIFIER>
X-Plex-Device: Linux
X-Plex-Device-Name: Plex Landing
X-Plex-Platform-Version: 0.0.1
X-Plex-Product: Plex invitation helper
X-Plex-Token: <TOKEN>
Accept: application/json
```

Note: it is the `Server.machineIdentifier` not the `MediaContainer.machineIdentifier`

# Get all users (excludes invite-pending), and all libraries
Includes which library is shared to the user

```
GET /api/servers/<SERVER ID>/shared_servers HTTP/1.1
Host: plex.tv
X-Plex-Client-Identifier: <IDENTIFIER>
X-Plex-Device: Linux
X-Plex-Device-Name: Plex Landing
X-Plex-Platform-Version: 0.0.1
X-Plex-Product: Plex invitation helper
X-Plex-Token: <TOKEN>
```

Example response
```xml
<?xml version="1.0" encoding="UTF-8"?>
<MediaContainer friendlyName="myPlex" identifier="com.plexapp.plugins.myplex" machineIdentifier="<SERVER ID>" size="9">
  <SharedServer id="111" username="fakeusername" email="fake@mail.com" userID="111111" accessToken="<TOKEN>" acceptedAt="1442189117" invitedAt="1442189117" allowSync="1" allowCameraUpload="0" allowChannels="0" owned="1" allLibraries="1" filterAll="" filterMovies="" filterMusic="" filterPhotos="" filterTelevision="">
      <Section id="157564282" key="2" title="Movies" type="movie" shared="1"/>
      <Section id="157564302" key="1" title="TV Shows" type="show" shared="1"/>
  </SharedServer>
  <SharedServer id="111" username="user" email="email@gmail.com" userID="111" accessToken="<TOKEN>" acceptedAt="1442189137" invitedAt="1442189137" allowSync="0" allowCameraUpload="0" allowChannels="0" owned="1" allLibraries="0" filterAll="" filterMovies="" filterMusic="" filterPhotos="" filterTelevision="">
      <Section id="157564282" key="2" title="Movies" type="movie" shared="1"/>
      <Section id="157564302" key="1" title="TV Shows" type="show" shared="1"/>
  </SharedServer>
</MediaContainer>
```

# Adding and sharing new user

## Creating a new plex account:

```
POST /users HTTP/1.1
Host: plex.tv
Cache-Control: no-cache
Postman-Token: c1b68831-6818-fb61-663f-f38c0bbef508
Content-Type: application/x-www-form-urlencoded

user%5Bemail%5D=relumiduru%40mswork.ru&user%5Busername%5D=testingaccount2233ll&user%5Bpassword%5D=SuperDuper123&user%5Bpassword_confirmation%5D=SuperDuper123

body:

user[email]:relumiduru@mswork.ru
user[username]:testingaccount2233ll
user[password]:SuperDuper123
user[password_confirmation]:SuperDuper123

```

## Inviting a user to your plex account

1. Get server id **above**
2. Get all the libraries for that server (the above method can be used, but this will just return libraries not an array of shared libraries)

```
GET /api/servers/<SERVER ID> HTTP/1.1
Host: plex.tv
X-Plex-Client-Identifier: <IDENTIFIER>
X-Plex-Device: Linux
X-Plex-Device-Name: Plex Landing
X-Plex-Platform-Version: 0.0.1
X-Plex-Product: Plex invitation helper
X-Plex-Token: <TOKEN>
Accept: application/json
```

3. Post the shared libraries using id's from previous step

```
POST https://plex.tv/api/servers/<SERVER_ID>/shared_servers
Host: plex.tv
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.63 Safari/537.36
Accept: application/json
X-Plex-Client-Identifier: <UNIQUE IDENTIFIER>
X-Plex-Device: Linux
X-Plex-Device-Name: Plex Landing
X-Plex-Platform-Version: 0.0.1
X-Plex-Product: Plex invitation helper
X-Plex-Token: <INSERT TOKEN HERE>
Cache-Control: no-cache
```

```javascript
Body:
{
  "server_id": "<SERVER ID>",
  "shared_server": {
    "library_section_ids": ["<LIBRARY IDS>"],
    "invited_email": "<EMAIL>"
  },
  "sharing_settings":{}
}
```

**Response**

```
<MediaContainer friendlyName="myPlex" identifier="com.plexapp.plugins.myplex" machineIdentifier="<SERVER_ID>" size="1">
  <SharedServer id="" username="" email="" userID="" accessToken="" name="" acceptedAt="0" invitedAt="" allowSync="0" allowCameraUpload="0" allowChannels="0" owned="0">
    <Section id="15756428" key="2" title="Movies" type="movie" shared="1"/>
  </SharedServer>
</MediaContainer>
```

**Note this will return the userID of the user, useful for the below options**


# Existing User tasks

## Get user information including ID's
Or get it from the previous request ^
```
GET /api/home/users HTTP/1.1
Host: plex.tv
X-Plex-Client-Identifier: <IDENTIFIER>
X-Plex-Device: Linux
X-Plex-Device-Name: Plex Landing
X-Plex-Platform-Version: 0.0.1
X-Plex-Product: Plex invitation helper
X-Plex-Token: <TOKEN>
```

### Delete user from home
Use user id from above

```
DELETE /api/home/users/<USER ID> HTTP/1.1
Host: plex.tv
Connection: keep-alive
X-Plex-Version: 2.6.1
Accept-Language: en
X-Plex-Client-Identifier: <IDENTIFIER>
X-Plex-Device-Name: Plex Web (Chrome)
X-Plex-Platform: Chrome
X-Plex-Product: Plex Web
Accept: text/plain, */*; q=0.01
X-Plex-Token: <TOKEN>
```

### Edit shared libraries
Use user id from above

1. Get the shared server id for the user (from above)
2. PUT the library ids

```
PUT /api/servers/<SERVER ID>/shared_servers/<SHARED SERVER ID> HTTP/1.1
Host: plex.tv
Accept-Language: en
X-Plex-Client-Identifier: <IDENTIFIER>
X-Plex-Device-Name: Plex Web (Chrome)
X-Plex-Platform: Chrome
Content-Type: application/json
Accept: text/plain, */*; q=0.01
X-Plex-Token: <TOKEN>
```

Body
```javascript
{
  "server_id": "<SERVER ID>",
  "shared_server": {
    "library_section_ids": ["<LIBRARY IDS>"]
  }
}
```