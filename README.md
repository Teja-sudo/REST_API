# REST API

This is a simple REST API built with express which can perform CRUD operations or http requests like GET,POST,PUT,DELETE and also uses Swagger JSDoc and Swagger UI Express to automatically generate API documentation. We use jest to test the success and failure of our API.

##### Performed linting with ES lint.

##### Performed unit testing with jest using axios.

##### Documented code using JSDoc, Swagger JSDoc and Swagger UI Express

# Requirements

- #### Es lint -> (for linting)
- #### Jest and axios ->(for Unit testing and code coverage)
- #### JSDoc, Swagger JSDoc and Swagger UI Express -> (for Code Documentation)

# Installation

This is a Node.js module.

Before installing, download and install Node.js verson: 14 or higher is required.

Installation is done using the npm install command:

```sh
$ npm install rest_api_teja
```

To use the module, in your program include following lines:

```sh
const {app, port} = require("rest_api_teja");
```

After importing include following lines:

```sh
app.listen(port,()=>{
    console.log(`server is running on  ${port}`)
})

```

## Features

This REST API has following functionalities:

- /GET
- /PUT
- /POST
- /DELETE

## How to use it

You can give /GET , /PUT , /POST , /DELETE requests through the app:

- /GET

```sh
app.get("/", (req, res) => {
  res.status(200).send(`<h1>Home</h1><a href='/api/interns'>Interns</a>`);
});
```

response stores res with data: "Home Interns" in the web brower @ localhost:4000

## Running the Server

Running the following commands the app will be up and running,

```sh
node app.js
```

_**OR**_

```sh
npm start
```

## - to install all required dependencies and devDependencies from package.json

Use the node package manager npm to install required node modules.

```bash
npm install
```

# Usage

### \*ES lint

#### custom Rules defined in .eslintrc.json

```bash
"rules": {
        "semi": ["error", "always"],
        "quotes": ["warn","backtick" ,"double"],
        "no-var":"warn",
        "no-use-before-define":"error"
        "no-extra-semi": "error",
        "jest/no-disabled-tests": "warn",
        "jest/no-identical-title": "error"
    }
```

### \*Jest

#### Four test suites for the GET,POST,PUT,DELETE are inside the test directory that contains app.test.js

#### To run tests

```bash
npm test
```

#### Above command produces following result of tests and coverage summary.

```
$ npm test

> rest_api_teja@1.0.0 test D:\Task3
> jest --coverage --runInBand --detectOpenHandles --forceExit

  console.log
    server is runningg on port 4000

      at Server.<anonymous> (src/server.js:26:13)

 PASS  test/app.test.js
  Tests for GET Request
    √ Home Route (113 ms)
    √ Route to get all interns data. (17 ms)
    √ Route to get specified intern data by using id. (38 ms)
    √ Route to get response for specified intern data by using wrong id . (27 ms)
    √ Route to get specified intern data by using name. (86 ms)
    √ Route to get response for specified intern data by using wrong name. (15 ms)
    √ Route to get specified intern data by using email. (11 ms)
    √ Route to get response for specified intern data by using wrong email. (12 ms)
    √ Route to get response for specified intern data without providing params. (15 ms)
  Tests for POST Request
    √ Route to post new intern data. (30 ms)
    √ Route to post new intern data by only providing name. (12 ms)
    √ Route to post new intern data by only providing email. (19 ms)
    √ Route to post new intern data by not providing data. (28 ms)
  Tests for PUT Request
    √ Route to update specific intern data by id. (25 ms)
    √ Route to update specific intern data by giving wrong or not existed id. (24 ms)
    √ Route to update specific intern data by not providing data. (19 ms)
    √ Route to update specific intern data by id and update only name. (12 ms)
    √ Route to update specific intern data by id and update only email. (14 ms)
  Tests for DELETE Request
    √ Route to delete specific intern data by id. (12 ms)
    √ Route to delete specific intern data by giving wrong or not existed id. (11 ms)

-----------|---------|----------|---------|---------|-------------------
File       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------|---------|----------|---------|---------|-------------------
All files  |     100 |      100 |     100 |     100 |
 app.js    |     100 |      100 |     100 |     100 |
 data.js   |     100 |      100 |     100 |     100 |
 server.js |     100 |      100 |     100 |     100 |
-----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       20 passed, 20 total
Snapshots:   0 total
Time:        2.966 s
Ran all test suites.
```

### \*JSDoc

#### JSDoc configuretion done in jsdoc.json

```
{
    "source": {
    "include": ["src"],
    "includePattern": ".js$",
    "excludePattern": "(node_modules/|docs)"
},
    "plugins": ["plugins/markdown"],
    "templates": {
    "cleverLinks": true,
    "monospaceLinks": true
},
    "opts": {
    "recurse": true,
    "destination": "./docs/",
    "template": "./custom-template",
    "readme":"./README.md"
}
}
```

#### Use following command to produce documentation

```
calcultor> npm run doc
```

#### Above command produces docs folder

#### --- To view documentation run index.html which resides in the docs folder.

## To run Swagger UI based documentation start the server and then we can access it at the endpoint /api-doc

- ### With your local server running, the generated docs are available here: [http://localhost:4000/api-doc](http://localhost:4000/api-docs)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
