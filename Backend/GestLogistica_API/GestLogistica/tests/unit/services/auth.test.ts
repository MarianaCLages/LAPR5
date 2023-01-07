import AuthRepo from "../../../src/repos/AuthRepo";
import OrderAPIGetter from "../../../src/repos/OrderAPIGetter";

describe("auth test", () => {
    it("vamos ver se dá", async () => {
        const repo = new AuthRepo();
        try {
            const cena = await repo.verifyAuth("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Ik1hcmlhbmEgTGFnZXMiLCJlbWFpbCI6Im1hcmlhbmFsYWdlczIwMDJAZ21haWwuY29tIiwibmJmIjoxNjcyNjg2OTg3LCJleHAiOjE2NzMyOTE3ODcsImlhdCI6MTY3MjY4Njk4N30.bJN6YhU-Lr2BN7_t9cpzJKjmPZ4lM14E6fLhFWrsZFY");
            console.log(cena);
        } catch (error) {
            console.log(error);
        }
    });
    it("mais um teste para mudar", async (done) => {


        let date = "2023-01-10"

        const getter = new OrderAPIGetter()
        console.log("hghh")
        getter.getOrders(date).then(
            (data) => {
                console.log("cheguei")
                console.log(data.getValue())
            }
        )
        done()

    })
});