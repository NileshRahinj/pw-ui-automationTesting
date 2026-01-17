import { Page, expect } from "@playwright/test";

export class DashboardPage {
  constructor(private page: Page) {}

  sidePanelToggle = () =>
    this.page
      .getByRole("navigation", { name: "Sidepanel" })
      .getByRole("button");

  dashboardLink = () => this.page.getByRole("link", { name: "Dashboard" });

  dashboardHeading = () =>
    this.page.getByRole("heading", { name: "Dashboard" });

  userMenu = () => this.page.getByText("manda user");

  async openSidePanel() {
    await this.sidePanelToggle().click();
  }

  async goToDashboard() {
    await this.page
      .getByRole("navigation", { name: "Sidepanel" })
      .waitFor({ state: "visible", timeout: 10000 });
    await this.dashboardLink().click();
    await expect(this.dashboardHeading()).toBeVisible();
  }

  async selectUser() {
    await this.page.getByText("Dashboard Upgrademanda user").click();
    await this.userMenu().click();
  }
}
