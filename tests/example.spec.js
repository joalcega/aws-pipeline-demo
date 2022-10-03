// @ts-check
const { test, expect } = require("@playwright/test");
const AWS = require("aws-sdk");

test("homepage has Playwrightx in title and get started link linking to the intro page", async ({
  page,
}) => {
  // const response = await getIntacctCredentials(
  //   "arn:aws:secretsmanager:us-west-2:673019483080:secret:Sandbox/NonProd/Intacct/Oracle-UlYAZ3"
  // );

  // console.log("secret:", JSON.stringify(response));

  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);

  // create a locator
  const getStarted = page.locator("text=Get Started");

  // Expect an attribute "to be strictly equal" to the value.
  await expect(getStarted).toHaveAttribute("href", "/docs/intro");

  // Click the get started link.
  await getStarted.click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});

async function getIntacctCredentials(secretArn) {
  // Create a Secrets Manager client
  var client = new AWS.SecretsManager({
    region: "us-west-2",
  });

  const response = await client
    .getSecretValue({ SecretId: secretArn })
    .promise();

  if (!!!response.SecretString) {
    throw new Error("Secret string is missing");
  }

  return JSON.parse(response.SecretString);
}
