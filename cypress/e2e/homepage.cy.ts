import path = require("path");

const RESUME_FILE_NAME = "Kevin-Castro-Resume.pdf";

describe("Portfolio Homepage", () => {
  let page: Cypress.Chainable;
  beforeEach(() => {
    page = cy.visit("/");
  });

  it("displays the title and header correctly", () => {
    const page = cy.visit("/");

    page.get("title").should("have.text", `Kevin Castro's Portfolio`);
    page.get("h1").should("contain.text", "Kevin Castro");
  });

  it("changes the position title every so often", () => {
    let originalPosition: string;
    page.get("#position").then((position) => {
      originalPosition = position.text();
    });
    // move forward 3s in time
    cy.clock();
    cy.tick(3000);
    page.get("#position").should("not.equal", originalPosition);
  });

  it("displays social links in the main section", () => {
    page.get(".social-links > a").should("be.visible");
  });

  it("displays social links in the footer", () => {
    page.get("footer > a").should("be.visible");
  });

  describe("Resume section", () => {
    const downloadsFolder = Cypress.config("downloadsFolder");
    const fileName = RESUME_FILE_NAME;

    let link: Cypress.Chainable;
    beforeEach(() => {
      link = page.get(".resume > a");
    });

    it("displays a link for the user to download a copy", () => {
      link.should("have.attr", "download");
      link.should("have.attr", "href");
    });

    it("allows for a download of the file to take place", () => {
      link.click();

      const resumeFile = path.join(downloadsFolder, fileName);
      cy.log(resumeFile);
      cy.readFile(resumeFile, { timeout: 15000 }).should("exist");
    });
  });
});
