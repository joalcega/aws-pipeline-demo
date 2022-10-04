// @ts-check
const { test, expect } = require("@playwright/test");
const AWS = require("aws-sdk");

test("homepage has Playwrightx in title and get started link linking to the intro page", async ({
  page,
}) => {
  const params = await getParams({
    Names: ["/playwright/demo/url", "/cdk-bootstrap/hnb659fds/version"],
    WithDecryption: true,
  });

  await page.goto(params["/playwright/demo/url"]);

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

async function getParams(request) {
  const manager = new AWS.SSM({ region: process.env.AWS_REGION });

  const response = await manager.getParameters(request).promise();

  const dict = {};

  response.Parameters?.forEach((parameter) => {
    dict[parameter.Name] = parameter.Value;
  });

  return dict;
}
