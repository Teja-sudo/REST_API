const axios = require("axios");
axios.defaults.adapter = require("axios/lib/adapters/http");
require("../src/app");

/*afterAll(async () => {
	await new Promise(resolve => setTimeout(() => resolve(), 100)); // avoid jest open handle error
});
*/

describe("Tests for GET Request", () => {
    test("Home Route", async () => {
        const response = await axios.get(`http://localhost:7000/`);
        expect(response.status).toBe(200);
    });

    test("Route to get all interns data.", async () => {
        const response = await axios.get(`http://localhost:7000/api/interns`);
        expect(response.status).toBe(200);
    });

    test("Route to get specified intern data by using id.", async () => {
        const response = await axios.get(`http://localhost:7000/api/interns/query?id=1`);
        expect(response.status).toBe(200);
    });

    test("Route to get response for specified intern data by using wrong id .", async () => {
        const response = await axios.get(`http://localhost:7000/api/interns/query?id=x`);
        expect(response.data).toBe("Intern Not Found.");
    });

    test("Route to get specified intern data by using name.", async () => {
        const response = await axios.get(`http://localhost:7000/api/interns/query?name=x`);
        expect(response.status).toBe(200);
    });

    test("Route to get response for specified intern data by using wrong name.", async () => {
        const response = await axios.get(`http://localhost:7000/api/interns/query?name=t`);
        expect(response.data).toBe("Intern Not Found.");
    });

    test("Route to get specified intern data by using email.", async () => {
        const response = await axios.get(`http://localhost:7000/api/interns/query?email=x123@gmail.com`);
        expect(response.status).toBe(200);
    });

    test("Route to get response for specified intern data by using wrong email.", async () => {
        const response = await axios.get(`http://localhost:7000/api/interns/query?email=1`);
        expect(response.data).toBe("Intern Not Found.");
    });

    test("Route to get response for specified intern data without providing params.", async () => {
        const response = await axios.get(`http://localhost:7000/api/interns/query?`);
        expect(response.data).toBe("Intern Not Found.");
    });
}
);


describe("Tests for POST Request", () => {

    test("Route to post new intern data.", async () => {
        let payload = { name: "a", email: "a12@gmail.com" };
        const response = await axios.post(`http://localhost:7000/api/interns`,payload);
        expect(response.data).toEqual({"email": "a12@gmail.com", "id": 4, "name": "a"});
    });

    test("Route to post new intern data by only providing name.", async () => {
        let payload = { name: "a" };
        const response = await axios.post(`http://localhost:7000/api/interns`,payload);
        expect(response.data).toBe("Require email in post method");
    });

    test("Route to post new intern data by only providing email.", async () => {
        let payload = { email: "a123@gmail.com" };
        const response = await axios.post(`http://localhost:7000/api/interns`,payload);
        expect(response.data).toBe("Require name in post method");
    });
    
    test("Route to post new intern data by not providing data.", async () => {
        let payload = {};
        const response = await axios.post(`http://localhost:7000/api/interns`,payload);
        expect(response.data).toBe("Require name and email in post method");
    });
}
);

describe("Tests for PUT Request", () => {

    test("Route to update specific intern data by id.", async () => {
        let payload = { name: "a", email: "a123@gmail.com" };
        const response = await axios.put(`http://localhost:7000/api/interns/1`,payload);
        expect(response.status).toBe(200);
    });

    test("Route to update specific intern data by giving wrong or not existed id.", async () => {
        let payload = { name: "a", email: "a123@gmail.com" };
        const response = await axios.put(`http://localhost:7000/api/interns/77`,payload);
        expect(response.data).toBe("Intern Not Found");
    });

    test("Route to update specific intern data by not providing data.", async () => {
        let payload = {};
        const response = await axios.put(`http://localhost:7000/api/interns/1`,payload);
        expect(response.data).toEqual("Provide the data to update");
    });

    test("Route to update specific intern data by id and update only name.", async () => {
        let payload = { name: "b"};
        const response = await axios.put(`http://localhost:7000/api/interns/2`,payload);
        expect(response.status).toBe(200);
    });

    test("Route to update specific intern data by id and update only email.", async () => {
        let payload = { email: "b123@gmail.com"};
        const response = await axios.put(`http://localhost:7000/api/interns/2`,payload);
        expect(response.status).toBe(200);
    });

}
);

describe("Tests for DELETE Request", () => {

    test("Route to delete specific intern data by id.", async () => {
        const response = await axios.delete(`http://localhost:7000/api/interns/1`);
        expect(response.status).toBe(200);
    });

    test("Route to delete specific intern data by giving wrong or not existed id.", async () => {
        const response = await axios.delete(`http://localhost:7000/api/interns/77`);
        expect(response.data).toBe("Intern Not Found");
    });

    });
