// Place all static HTML here, and dynamic HTML via parameters.
module.exports = (funding, rewards, updates, comments, scripts) => `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>HiveFunder</title>
      <link href="/styles.css" rel="stylesheet" type="text/css" />
      <link href="https://fonts.googleapis.com/css?family=Barlow:100,200,300,400,500" rel="stylesheet" />
    </head>
    <body>
      <div class="global">
        <nav class='mainNavBar'>
          <div>
            <span class="navText">Explore</span>
            <span class="navText startProjectBtn">Start a project</span>
          </div>

          <div class='searchContainer'>
            <div class="navText">Search</div>
            <img class="magnifyingGlassImg" src="/images/magnifying-glass.png">
            <img class="userImg" src="/images/user-circle.png">
          </div>
        </nav>

        <header class="projectBanner">
          <div id='funding-widget'>${funding}</div>
        </header>
        <nav class="secondaryNavBar">
          <div></div>
          <div class="navOptionsContainer">
            <span class="navText">Campaign</span>
            <span class="navText">Updates</span>
            <span class="navText">Comments</span>
          </div>
        </nav>

        <div class="rewardsAndUpdates">
          ${rewards}
          ${updates}
        </div>
        ${comments}
      </div>
      ${scripts}
    </body>
  </html>
`;
