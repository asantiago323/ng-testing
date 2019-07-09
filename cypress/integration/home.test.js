describe("Home Page", () => {
  beforeEach(() => {
    // mocks data return
    cy.fixture("courses.json").as("coursesJSON");
    // mock server
    cy.server();

    // api call and return mock data
    cy.route("/api/courses", "@coursesJSON").as("courses");
    // verifies home page visit
    cy.visit("/");
  });

  it("should display a list of courses", () => {
    // verifies All Courses is visible
    cy.contains("All Courses");

    // wait until courses are finished loading
    cy.wait("@courses");

    // assert 9 courses are return from server
    cy.get("mat-card").should("have.length", 9);
  });

  it("should display the advance courses", () => {
    // assert tabs
    cy.get(".mat-tab-label").should("have.length", 2);

    // simulate clicking the advanced tab
    cy.get(".mat-tab-label")
      .last()
      .click();

    // get all mat-cards and verify it has more than one
    cy.get(".mat-tab-body-active .mat-card-title")
      .its("length")
      .should("be.gt", 1);

    // get first course and verify it is Angular Security Course
    cy.get(".mat-tab-body-active .mat-card-title")
      .first()
      .should("contain", "Angular Security Course");
  });
});
