const profile = document.getElementById("profile");
const projectContainer = document.getElementById("projects");
const image = document.getElementById("image");

const USER = "Svempolin";
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;
const OWNER_URL = `https://api.github.com/users/${USER}`;
const myCommit_URL = `https://api.github.com/repos/Technigo/project-guess-who/pulls/124/commits`;
//const PULL_URL = `https://api.github.com/repos/Technigo/${repo.name}/pulls?_page=100`;

const globalvaribal = "hello";

const getOwner = () => {
  fetch(OWNER_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      image.src = data.avatar_url;
      profile.innerHTML += `<h4>Username: ${data.login} </4><h4>Name: ${data.name}</h4><h4>Followers:${data.followers}</4>

      `;
    });
};

const getRepos = () => {
  fetch(REPOS_URL)
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      const forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith("project-")
      );
      forkedRepos.forEach(
        (repo) =>
          (projectContainer.innerHTML += `<div 
          class= "assignments" id="${repo.name}">
         <h2> ${repo.name}</h2>
         <h4> Default branch:${repo.default_branch} </h4>
         <h4>Latest update: ${new Date(repo.updated_at).toDateString()} </h4> 
         <h4> The link to: <a href=${repo.html_url}>${repo.name}</a> </h4>
          <p id="commit-${repo.name}""> Amounts of commits: </p>
          
          </div>`)
      );

      drawChart(forkedRepos.length);
      getPullRequests(forkedRepos);
    });
};

getRepos();

//Pullrequest//
const getPullRequests = (forkedRepos) => {
  forkedRepos.forEach((repo) => {
    const PULL_URL = `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`;
    fetch(PULL_URL)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const myPulls = data.find(
          (pulls) => pulls.user.login === repo.owner.login
        );

        myCommits(myPulls.commits_url, repo.name);
        myCommits(myPulls.comments_url, repo.name);
        //console.log(myCommit_URL);
        //getCommits(myCommit_URL, repo);
      });
  });
};
const myCommits = (myCommitsUrl, myRepoName) => {
  fetch(myCommitsUrl)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById(
        `commit-${myRepoName}`
      ).innerHTML += `${data.length}`;
    });
};

const myComment = (myCommentUrl, myRepoName) => {
  fetch(myCommentUrl)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById(
        `comment-${myRepoName}`
      ).innerHTML += `${data.length}`;
    });
};

getOwner();

//
//         //TODO
//         //1. Find only the PR that you made by comparing pull.user.login
//         // with repo.owner.login
//         //2. Now you're able to get the commits for each repo by using
//         // the commits_url as an argument to call another function
//         //3. You can also get the comments for each PR by calling
//         // another function with the review_comments_url as argument
//       });
//   });
// };
