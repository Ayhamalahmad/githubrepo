// Get DOM elements
let submitUserName = document.querySelector(".submitusername");
let inputgithubusername = document.querySelector(".inputgithubusername");
let content = document.querySelector(".content");
// Event listener for the submit button
submitUserName.onclick = function () {
  // Call the function to get repos from Github
  getreposFromGithub();
  // Clear the input field
  inputgithubusername.value = "";
};
// Function to get repos from Github API
function getreposFromGithub() {
  // Check if the input field is empty
  if (inputgithubusername.value == "") {
    // If so, display an error message
    content.innerHTML = `<span class="wrongspan">place type a user name</span>`;
  } else {
    // If not, fetch the repos data from Github API
    fetch(`https://api.github.com/users/${inputgithubusername.value}/repos`)
      .then((e) => {
        return e.json();
      })
      .then((data) => {
        // Clear the content area
        content.innerHTML = "";
        // Loop through the data and create elements for each repo
        data.forEach((e) => {
          // Create a div to hold the repo name and link
          let contentDiv = document.createElement("div");
          contentDiv.className = "repo";
          // Add the repo name to the div
          let contentDivTexts = document.createTextNode(e.name);
          contentDiv.appendChild(contentDivTexts);
          content.appendChild(contentDiv);
          // Add the repo link to the div
          contentDiv.innerHTML = `${e.name}`;
          let reposUrl = document.createElement("a");
          reposUrl.href = `https://github.com/${inputgithubusername.value}/${e.name}`;
          reposUrl.setAttribute("target", "_blank");
          let reposUrlText = document.createTextNode("Link");
          reposUrl.appendChild(reposUrlText);
          // Add the repo stars count to the div
          let reposStars = document.createElement("span");
          let reposStarsText = document.createTextNode(
            `Stars ${e.stargazers_count}`
          );
          reposStars.appendChild(reposStarsText);
          // Create a div to hold the stars count and link
          let starsAndLinkDiv = document.createElement("div");
          contentDiv.append(starsAndLinkDiv);
          starsAndLinkDiv.appendChild(reposUrl);
          starsAndLinkDiv.appendChild(reposStars);
        });
      });
  }
}
// Event listener for the input field (to listen for "Enter" key press)
inputgithubusername.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    submitUserName.click();
  }
});
