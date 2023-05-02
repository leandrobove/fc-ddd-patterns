import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E tests for product", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "iPhone",
                price: 6000.00
            });

        expect(response.status).toBe(201);
        expect(response.body.id).not.toBeNull();
        expect(response.body.name).toBe("iPhone");
        expect(response.body.price).toBe(6000.00);
    });

    it("should not create a product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "iPhone"
            });

        expect(response.status).toBe(500);
    });

    it("should list all products", async () => {
        const response1 = await request(app)
            .post("/products")
            .send({
                name: "iPhone",
                price: 6000.00
            });
        expect(response1.status).toBe(201);

        const response2 = await request(app)
            .post("/products")
            .send({
                name: "iPad",
                price: 9000.00
            });
        expect(response2.status).toBe(201);

        const producsResponse = await request(app).get("/products").send({});

        expect(producsResponse.status).toBe(200);
        const product1 = producsResponse.body.products[0];
        expect(product1.name).toBe("iPhone");
        expect(product1.price).toBe(6000.00);
        const product2 = producsResponse.body.products[1];
        expect(product2.name).toBe("iPad");
        expect(product2.price).toBe(9000.00);
    });
});