/**
 * @module app
 * @requires
 *      express
 * @requires
 *      data
 * @requires
 *      swagger-jsdoc
 * @requires
 *      swagger-ui-express
 */

/**
 * express module
 * @constant express
 * @type {object}
 *
 */
const express = require("express");
/**
 * @constant app
 * @type {object}
 * @description -app stores express() this method calls function and puts new Express application inside
 * the app variable.
 */
const app = express();

let interns = require("./data");

app.use( express.urlencoded ({ extended: true, }));
app.use(express.json());

/**
 * @constant swaggerJsdoc
 * @type {object}
 * @description
 *      It stores the value when you import the  swagger-JsDoc
 * @param {string}
 *      A module from npm package swagger-jsdoc
 */
const swaggerJsdoc = require("swagger-jsdoc");

/**
 * @constant swagger-UI-Espress
 * @type {object}
 * @description
 *      It stores the value when you import the  swagger
 * @param {string}
 *      A module from npm package swagger-ui-expresss
 */
const swaggerUi = require("swagger-ui-express");

/**
 * @constant swaggerOptions
 * @type {object}
 */
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "{REST API}",
            version: "1.0.0",
            defination: "CRUD operation",
        },
        servers: [
            {
                url: "http://localhost:7000",
            },
        ],
    },
    apis: ["./src/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

/**
 * @function
 * @returns
 *         Open api must use some swagger extended properties for a well formated Swagger Documentation
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


/**
 * @swagger
 * components:
 *   schemas:
 *     Interns:
 *        type: object
 *        properties:
 *            id:
 *               type: integer
 *               description: The auto-generated id of the intern
 *               example: 1
 *            name:
 *               type: string
 *               description: An intern name 
 *               example: x
 *            email:
 *               type: string
 *               description: An intern email 
 *               example: x123@gmail.com
 *        required:
 *               -name
 *               -email
 */

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Home
 *     summary: Returns "<h1>Home</h1><a href='/api/interns'>Interns</a>" message
 *     description: This a home URI
 *     responses:
 *       200:
 *         description: successful
 */

/**
 * @name Home
 * @function get
 * @path {GET} /
 * @code {200} if the code is successful
 * @code {404} if the code is throwing some error
 * @response Home Displays as Home
 * @response Interns  link to the endpoint /api/interns
 * @description
 *          This function takes in two  parameter and then returns the string to a server.So when a user is logging to
 *          that specific URL the server will send back <pre><h1>Home</h1> <a href='/api/interns'>Interns</a></pre> with status of 200.
 * @example
 *      app.get("/", (req, res) => {
 *          res.status(200).send("<h1>Home</h1><a href='/api/interns'>Interns</a> ");});
 * @summary
 *        Running the code with node "name of the file" and then vising the URL will give you an
 *        output of <pre><h1>Home</h1><a href='/api/interns'>Interns</a></pre>
 */
app.get("/", (req, res) => {
    res.status(200).send("<h1>Home</h1><a href='/api/interns'>Interns</a> ");
});

/**
 * @swagger
 * /api/interns:
 *   get:
 *     tags:
 *       - Interns
 *     summary: Returns the list of all the interns
 *     description: This a get method
 *     responses:
 *       200:
 *         description: The list of all the interns
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Interns'
 */

/**
 * @name All_Interns_Data
 * @function get
 * @path {GET} ./api/interns
 * @code {200} if the code is successful
 * @code {404} if the code is throwing some error
 * @response {object} interns It contains id,name,email of all interns.
 * @response {integer} interns.id 
 * @response {string} interns.name 
 * @response {string} interns.email
 * @description
 *          Returns all data present in the interns array of objects.
 */
app.get("/api/interns", (req, res) => {
    res.status(200).send(interns);
});
/**
 * @swagger
 * /api/interns/query:
 *   get:
 *     summary: Get intern data by id or name or email
 *     tags:
 *        - Interns
 *     parameters:
 *        - in: query
 *          name: id
 *          schema:
 *            type: integer
 *          description: Intern id
 *        - in: query
 *          name: name
 *          schema:
 *            type: string
 *          description: Intern name 
 *        - in: query
 *          name: email
 *          schema:
 *            type: string
 *          description: Intern email  
 *     responses:
 *        200:
 *           description: Specific intern data
 *           contents:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/Interns'
 *       
 */

/**
 * @name Specific_Intern_Data
 * @function get
 * @path {GET} ./api/interns/query
 * @query {integer} id Intern with this id
 * @query {string} name Intern with this name
 * @query {string} email Intern with this email
 * @response {object} interns It contains id,name,email of a particular intern.
 * @response {integer} interns.id 
 * @response {string} interns.name 
 * @response {string} interns.email
 * @response  {string} - Intern Not Found. if provided with wrong or not existed intern details in query parameters
 * @code {200} if the code is successful
 * @code {404} if the code is throwing some error
 * @description
 *          Returns specific intern by id or name or email.
 */
app.get("/api/interns/query", (req, res) => {
    let { id, name, email } = req.query;
    let Intern;
    if (id) {
        Intern = interns.find((intern) => intern.id == id);
        if (!Intern) {
            return res.send("Intern Not Found.");
        }
    }
    else if (email) {
        Intern = interns.find((intern) => intern.email == email);
        if (!Intern) {
            return res.send("Intern Not Found.");
        }
    }
    else if (name) {
        Intern = interns.find((intern) => intern.name == name);
        if (!Intern) {
            return res.send("Intern Not Found.");
        }
    }
    else {
        return res.send("Intern Not Found.");
    }
    
    res.status(200).send(Intern);
});

/**
 * @swagger
 * /api/interns:
 *   post:
 *     summary: Create new intern data
 *     tags:
 *        - Interns
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Interns'
 *     responses:
 *        200:
 *           description: Intern data was successfully created
 *           contents:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/Interns'
 *        500:
 *            description: Server error
 */

/**
 * @name Insert_Intern_Data
 * @function post
 * @path {POST} ./api/interns
 * @body {object} interns It contains id,name,email to insert intern.
 * @body {integer} [interns.id] auto-generated unique id
 * @body {string} interns.name name of intern
 * @body {string} interns.email email of intern
 * @code {200} if the code is successful
 * @code {404} if the code is throwing some error
 * @response {object} interns It contains id,name,email of inserted intern.
 * @response {integer} interns.id 
 * @response {string} interns.name 
 * @response {string} interns.email
 * @response  {string} - Require name and email in post method if not provided both name and email in body parameters
 * @response  {string} - Require name in post method if not provided name in body parameters
 * @response  {string} - Require email in post method if not provided email in body parameter
 * @description
 *          Add new entry using post method in interns array of objects
 */
app.post("/api/interns", (req, res) => {
        let { name, email } = req.body;
       // console.log(req);
        if (!name && !email)
            return res.send("Require name and email in post method");
        else if (!name)
            return res.send("Require name in post method");
        else if (!email)
            return res.send("Require email in post method");
        else {
            const internData = {
                id: interns.length + 1,
                name: name,
                email: email
            };
            interns.push(internData);
            res.status(200).send(internData);
        }
});

/**
 * @swagger
 * /api/interns/{internID}:
 *   put:
 *     summary: Update intern data by id
 *     tags:
 *       - Interns
 *     parameters:
 *         - in: path
 *           name: internID
 *           schema:
 *              type: integer
 *           required: true
 *           description: Intern id
 *     requestBody:
 *           required: true
 *           content:
 *              application/json:
 *                  schema:
 *                     $ref: '#components/schemas/Interns'
 *     responses:
 *        200:
 *           description: Intern data was updated
 *           contents:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/Interns'
 *        500:
 *            description: Server error
 */

/**
 * @name Update_Intern_Data
 * @function put
 * @path {PUT} ./api/interns/:id
 * @params {integer} :id is the unique id of an intern.
 * @body {object} interns It contains id,name,email to update intern.
 * @body {integer} [interns.id] auto-generated unique id
 * @body {string} interns.name name of intern
 * @body {string} interns.email email of intern
 * @code {200} if the code is successful
 * @code {404} if the code is throwing some error
 * @response {object} interns It contains id,name,email of updated intern.
 * @response {integer} interns.id 
 * @response {string} interns.name 
 * @response {string} interns.email
 * @response  {string} - Intern Not Found if provided id in request parameters is wrong or not existed
 * @response  {string} - Provide the data to update if not provided name and email in body parameters
 * @description
 *          Update the existing entry using put method in interns array of objects
 */
app.put("/api/interns/:internID", (req, res) => {
    const { internID } = req.params;
    let Intern = interns.findIndex((intern) => intern.id == internID);
        if (Intern == -1) 
            return res.send("Intern Not Found");
    const newName = req.body.name;
    const newEmail = req.body.email;
    if (!newName && !newEmail)
        return res.send("Provide the data to update");
    if (newName)
        interns[Intern].name = newName;
    if (newEmail)
        interns[Intern].email = newEmail;
        
        res.status(200).send(interns);
});

/**
 * @swagger
 * /api/interns/{internID}:
 *   delete:
 *     summary: Remove intern data by id
 *     tags:
 *       - Interns
 *     parameters:
 *         - in: path
 *           name: internID
 *           schema:
 *              type: integer
 *           required: true
 *           description: Intern id
 *     requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#components/schemas/Interns'
 *     responses:
 *        200:
 *           description: Intern data was deleted
 *           contents:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/Interns'
 *        500:
 *            description: Server error
 */

/**
 * @name Delete_Intern_Data
 * @function delete
 * @path {DELETE} ./api/interns/:internID
 * @params {integer} :id is the unique id of an intern.
 * @response {object} interns It contains id,name,email of remaining interns after deleted.
 * @response {integer} interns.id 
 * @response {string} interns.name 
 * @response {string} interns.email
 * @response  {string} - Intern Not Found if  provided id in request parameters is wrong or not existed.
 * @code {200} if the code is successful
 * @code {404} if the code is throwing some error
 * @returns {interns}
 * @description
 *          Delete the entry by id using post method in interns array of objects
 */
app.delete("/api/interns/:internID", (req, res) => {
    let { internID } = req.params;
    let Intern = interns.findIndex((intern) => intern.id == internID);
        if (Intern == -1) 
            return res.send("Intern Not Found");
        interns = interns.filter((intern) => intern.id != internID);
        res.status(200).send(interns);
    
});

const port = process.env.PORT || 7000;

/**
 * @function listen
 * @name listen
 * @description - This function serves as a Express Middleware callback function
 * that displays the message `Server running on port 7000` when our express
 * application starts listening to the assigned port.
 * @return {void}
 */
app.listen(port, () => {
    console.log(`server is runningg on port ${port}`);
});
