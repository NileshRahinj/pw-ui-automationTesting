import { Page } from "@playwright/test";
import { ENV } from "../utils/env";

export class LoginPage {
  constructor(private page: Page) {}

  username = () => this.page.getByRole("textbox", { name: "Username" });
  password = () => this.page.getByRole("textbox", { name: "Password" });
  loginBtn = () => this.page.getByRole("button", { name: "Login" });
  
  async goto() {
    await this.page.goto("/web/index.php/auth/login", {
      waitUntil: "domcontentloaded",
    });
  }

  async login() {
    await this.username().fill(ENV.USERNAME);
    await this.password().fill(ENV.PASSWORD);
    await this.loginBtn().click();
  }
}
