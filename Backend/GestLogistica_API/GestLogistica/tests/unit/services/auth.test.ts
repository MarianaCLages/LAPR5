import AuthRepo from "../../../src/repos/AuthRepo";

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
});