import { Locator, Page } from "@playwright/test";
import ApplicationURL from "../helpers/ApplicationURL";
import { ErrorMessages } from "../helpers/ErrorMessages";
import { BasePage } from "./BasePage";



export default class LoginPage extends BasePage {

    private idNumberField: Locator;
    private phoneNumberField: Locator;
    private loginButton: Locator;
    private errorMessageForId: Locator;
    private errorMessageForPhone: Locator;
    private default_idNumber = process.env.ID_NUMBER_ADMIN as string;
    private default_PhoneNumber = process.env.PHONE_NUMBER_ADMIN as string;

    
    constructor(protected page: Page) {
        super(page);
        this.idNumberField = this.page.getByLabel('תעודת זהות *');
        this.phoneNumberField = this.page.getByLabel('מספר טלפון *');
        this.loginButton = this.page.getByRole('button', { name: 'המשך' })
        this.errorMessageForId=  page.getByText('מספר טלפון חייב להתחיל ב05')
        this.errorMessageForPhone=  page.getByText('מספר טלפון חייב להתחיל ב05')
    }


    public async loginToApplication(IdUser = this.default_idNumber, 
        phoneUser = this.default_PhoneNumber, 
        url = ApplicationURL.BASE_URL) {
        await this.page.goto(url);
        await this.validatePageUrl(ApplicationURL.BASE_URL);
        await this.idNumberField.fill(IdUser);
        await this.phoneNumberField.fill(phoneUser);
        await this.clickElement(this.loginButton);
    }

    public async validateErrorMessage(errorBox: Locator ,errorMessage: string) {
        await this.validateElementText(errorBox, errorMessage)
    }

    public getByText(text: string): Locator {
        return this.page.locator(`text=${text}`);
      }

   
}