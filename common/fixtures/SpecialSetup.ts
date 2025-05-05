import type { Page } from '@playwright/test';


export interface ISpecialSetup {
  prepareOne(): Promise<void>;
  prepareTwo(): Promise<void>;
}

export class SpecialSetup implements ISpecialSetup {
  private newAccountPage: Page;

  constructor(public readonly page: Page) {
    this.newAccountPage = this.page;
  }

  async prepareOne() {
    // TODO: create new account and check the Dashboard page show
  }
  async prepareTwo() {
    // TODO: logout the account after test done
  }
}