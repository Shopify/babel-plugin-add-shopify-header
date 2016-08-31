# babel-plugin-add-shopify-header

This plugin will add a standardized Shopify comment header to transpiled files. Since transpiling via Babel is becoming one of the last steps of the build process it's handy to add some tooling around this final step.

A standard Shopify Comment Header contains:
- The license of the repo
- Current version number derived from git tag or from `package.json` version and last git commit

Example header:
```
/**
* The MIT License (MIT)
* Copyright (c) 2016 Shopify Inc.
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
* IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
* DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
* OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
* OR OTHER DEALINGS IN THE SOFTWARE.
* 
* 
* Version: 1.0.0 Commit: 2b93ca3
**/
```

This plugin is built ontop of [babel-plugin-add-header-comment](https://github.com/shopify/babel-plugin-add-header-comment).

## Installation
```bash
$ npm install babel-plugin-add-shopify-header
```

## Example

- [Simple Example](simple-example)
- [Header Per File](header-per-file)
- [Adding To Default Header](adding-to-default-header)
- [Adding To Header From Contents Of File](adding-to-default-header-from-the-contents-of-another-file)
- [Adding To Header From Script Execution](Adding To Default Header From A Script Execution)

#### Simple Example
The following is an example `.babelrc` file using this plugin:
```javascript
{
  "plugins": [
    "add-shopify-header"
  ]
}
```
The above is useful when you just simply want to bundle one file and want to add the default Shopify header comment to that file.

#### Header Per File
If you are transpiling an entire folder and only want to add the comment header to one file (for instance `src/shopify.js`) do the following:
```javascript
{
  "plugins": [
    ["add-shopify-header", {
      "files": [ "src/shopify.js" ]
    }]
  ]
}
```

#### Adding To Default Header
If you'd like to add to the default header you can do the following:
```javascript
{
  "plugins": [
    ["add-shopify-header", {
      "header": [ "This will be added under the default Shopify header" ]
    }]
  ]
}
```

#### Adding To Default Header Per File
The following will add to the default header on a per file basis
```javascript
{
  "plugins": [
    "files":
    ["add-shopify-header", {
      "files": {
        "src/shopify.js": {
          "header": [
            "This is added below the default header only for src/shopify.js"
          ]
        }
      }
    }]
  ]
}
```

#### Adding To Default Header From The Contents Of Another File
The following will show how to include the contents of the file `readFromThisFile.txt` under the default header. The `?` charachter denotes that the path following should be read in and added to the header.
```javascript
{
  "plugins": [
    ["add-shopify-header", {
      "header": [ "?readFromThisFile.txt" ]
    }]
  ]
}
```

#### Adding To Default Header From A Script Execution
Lets say you had a Node script `getAdditionalContent.js` that produces output you'd like to add to the header you can do the following. The `!` denotes that the following script should be executed:
```javascript
{
  "plugins": [
    ["add-shopify-header", {
      "header": [ "!node getAdditionalContent.js" ]
    }]
  ]
}
```

## Options

The following are options you can pass this Babel plugin. All options are optional:
- `cwd` - A String which is a path to the directory that contains a __LICENSE.md__ file and a __package.json__ file for your project. By default `process.cwd()` will be used.
- `header` - An Array of strings which get appended to the standard header. This array can also contain strings starting with `'!'` or `'?'` which mean the string will not be appended but instead the string will be executed as a shell command (eg `'!node someScript.js'`) or the path will be read in (`?readInThisFile.md`)
- `files` - An Array or Object that defines which files will receive the comment header. If the header does not need to be customized just pass in array of paths (eg. `"files": ["src/index.js", "src/index.polyfilled.js"]`) or if you need to customize the header per file pass in an Object which defines customized headers (eg. `"files": { "src/index.js": { 'A LINE ADDED TO HEADER'}}`)

## License

MIT, see [LICENSE.md](http://github.com/mikkoh/babel-plugin-add-shopify-header/blob/master/LICENSE.md) for details.

<img src="https://cdn.shopify.com/shopify-marketing_assets/builds/19.0.0/shopify-full-color-black.svg" width="200" />
