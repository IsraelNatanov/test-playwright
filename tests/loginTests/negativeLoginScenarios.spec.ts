import { test } from "@playwright/test";
import LoginPage from "../../pages/LoginPage";
import { ErrorMessages } from "../../helpers/ErrorMessages";
import ApplicationURL from "../../helpers/ApplicationURL";
import AppDrawer from "../../pages/appDrawer";
 


test.describe("Negative Login Scenarios", () => {
    
    let loginPage: LoginPage;
    let appDrawer : AppDrawer;

    test.beforeEach(async({page}) => {
        loginPage = new LoginPage(page)
        appDrawer = new AppDrawer(page);
    })


    test("Login admin", async() => {
        await loginPage.loginToApplication(process.env.ADMIN_ID, process.env.ADMIN_PHONE_NUMBER);
        await appDrawer.toExpandLayout()
        
        // await loginPage.validateErrorMessage(ErrorMessages.LOGIN_WITH_LOCKED_USER);
        await loginPage.validatePageUrl(ApplicationURL.ADMIN_PAGE_URL)
        await appDrawer.validateAdmin('סיכום מנהלים')
    })

    test("Login for standard user", async() => {
        await loginPage.loginToApplication(process.env.ID_NUMBER_STANDARD, process.env.PHONE_NUMBER_STANDARD);
        await appDrawer.toExpandLayout()
        
        // await loginPage.validateErrorMessage(ErrorMessages.LOGIN_WITH_LOCKED_USER);
        await loginPage.validatePageUrl(ApplicationURL.STANDARD_PAGE_URL)
        await appDrawer.ScreenForStandardUser()
    })

    /**
 * @TestPlanID  166
 */
    test("valide error login box idNumber", async({page}) => {
        await loginPage.loginToApplication('22222222', process.env.PHONE_NUMBER_STANDARD);
        await loginPage.validateErrorMessage(page.getByText('מספר זהות זה אינו תקין'), 'מספר זהות זה אינו תקין');
    })

    test("valide error login box phoneNumber", async({page}) => {
        await loginPage.loginToApplication(process.env.ID_NUMBER_STANDARD, '22222222');
        await loginPage.validateErrorMessage(page.getByText('מספר טלפון חייב להתחיל ב05'), 'מספר טלפון חייב להתחיל ב05');
    })

    test("valide error login box idNumber and box phoneNumber", async({page}) => {
        await loginPage.loginToApplication('22222222', '22222222');
        await loginPage.validateErrorMessage(page.getByText('מספר זהות זה אינו תקין'), 'מספר זהות זה אינו תקין');
        await loginPage.validateErrorMessage(page.getByText('מספר טלפון חייב להתחיל ב05'), 'מספר טלפון חייב להתחיל ב05');
    })

})