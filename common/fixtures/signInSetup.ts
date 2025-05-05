import type { Page } from '@playwright/test';


export interface ISignInSetup {
  signIn(): Promise<void>;
  logOut(): Promise<void>;
}

export class SignInSetup implements ISignInSetup {
  private newAccountPage: Page;

  constructor(public readonly page: Page) {
    this.newAccountPage = this.page;
  }

  async signIn() {
    // TODO: create new account and check the Dashboard page show
  }
  async logOut() {
    // TODO: logout the account after test done
  }
}