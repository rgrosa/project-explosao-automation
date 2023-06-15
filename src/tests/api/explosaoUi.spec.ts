
    import { expect, test } from '@playwright/test';


    test.describe.serial('[UI TEST] UI test', () => {
    test("Test ui @ui", async ({ page }) => {
        await page.goto('http://localhost:5173/');
        await delay(4000)
        await test.step('there is a background image', async () => {
    
            await expect(page.getByText("Amor em movimento!")).toBeVisible()
        });
    
        await test.step('Professor images should have alt text', async () => {
    
            await expect(page.getByAltText("foto professora de dança Graciela")).toBeVisible()
            await expect(page.getByAltText("foto professora de dança Sonia")).toBeVisible()
            await expect(page.getByAltText("foto professor de dança Leandro")).toBeVisible()
            await expect(page.getByAltText("foto professor de dança Elder")).toBeVisible()
            await expect(page.getByAltText("foto professor de dança Bruno")).toBeVisible()
            await expect(page.getByAltText("foto professor de dança Mateus")).toBeVisible()
            await expect(page.getByAltText("foto professor de Jiu-Jitsu Adriano")).toBeVisible()
            await expect(page.getByAltText("foto professora de yoga Vanusa")).toBeVisible()
            await expect(page.getByAltText("foto professora de teatro Luisa")).toBeVisible()
        });
    
        await test.step('Go to the Login page', async () => {
 
            await page.getByText("Login").click();
 
            await expect(page.getByText("Entrar")).toBeVisible()
        });
        
        });
    });

    function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }