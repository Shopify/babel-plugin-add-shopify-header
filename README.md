# babel-plugin-add-shopify-header

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

This plugin will add a standardized Shopify comment header to transpiled files. Since transpiling via Babel is becoming one of the last steps of the build process it's handy to add some tooling around this final step.

## Usage

[![NPM](https://nodei.co/npm/babel-plugin-add-shopify-header.png)](https://www.npmjs.com/package/babel-plugin-add-shopify-header)

## Example

- [Simple Example](simple-example)
- [Header Per File](header-per-file)
- [Adding To Default Header](adding-to-default-header)
- [Adding To Header From Contents Of File](adding-to-default-header-from-the-contents-of-another-file)
- [Adding To Header From Script Execution](Adding To Default Header From A Script Execution)

### Simple Example
The following is an example `.babelrc` file using this plugin:
```javascript
{
  "plugins": [
    "add-shopify-header"
  ]
}
```
The above is useful when you just simply want to bundle one file and want to add the default Shopify header comment to that file.

### Header Per File
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

### Adding To Default Header
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

### Adding To Default Header Per File
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

### Adding To Default Header From The Contents Of Another File
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

### Adding To Default Header From A Script Execution
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

## License

MIT, see [LICENSE.md](http://github.com/mikkoh/babel-plugin-add-shopify-header/blob/master/LICENSE.md) for details.
