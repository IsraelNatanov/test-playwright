import { Locator, Page, expect } from "@playwright/test";
import ApplicationURL from "../helpers/ApplicationURL";
import { ErrorMessages } from "../helpers/ErrorMessages";
import { BasePage } from "./BasePage";

export default class AppDrawer extends BasePage {
    private layout: Locator;
    private buttonExecutiveSummary: Locator;

        
    constructor(protected page: Page) {
        super(page);
        this.layout = this.page.locator('span > .MuiButtonBase-root').first();
        this.buttonExecutiveSummary = this.page.getByRole('button', { name: 'סיכום מנהלים' })
        // this.errorMessage = this.page.locator('[data-test="error"]')
    }

    public async toExpandLayout(){
        await this.clickElement(this.layout);
    }

    public async validateAdmin(button: string){
        await this.validateElementText(this.page.getByRole('button', { name: 'סיכום מנהלים' }),button);
    }

    public async ScreenForStandardUser() {
        await expect(await this.buttonExecutiveSummary.count()).toBe(0);
    }

}