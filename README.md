# upload-folder-demo
> Node example zipping and uploading the entire folder

## Create zip

```
$ npm ./zip
# creates example.zip from "test-folder"
```

The zip has images and text files

## The server

The server listening for the uploads can be started using `npm run dev`. You can see the source code in [server/index.js](./server/index.js)

```
$ npm run dev
```

## Uploads

We perform uploads using [got](https://github.com/sindresorhus/got#readme) in the streaming mode. See the code in [upload.js](./upload.js) file.

The uploaded buffer is unzipped into "received" folder. All files should be accessible and look the same as "test-folder".
