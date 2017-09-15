import { ReplyNoContinue, Request } from "hapi";

class APITestController {
  public getTest(request: Request, reply: ReplyNoContinue) {
    reply({ message: "Hello there" });
  }

  public async getTestAsync(request: Request, reply: ReplyNoContinue) {
    const message: string = await this.createAsyncTask("Hello there", 3000);
    reply({ message });
  }

  private createAsyncTask(
    msg: string,
    timeout: number = 1000
  ): Promise<string> {
    return new Promise<string>(resolve => {
      setTimeout(() => resolve(`Delayed ${timeout / 1000}s - ${msg}`), timeout);
    });
  }
}

export default APITestController;
