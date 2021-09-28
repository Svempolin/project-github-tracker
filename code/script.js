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
      //console.log(data);
      image.src = data.avatar_url;
      profile.innerHTML += `<p>Username:${data.login}<p>
      <p>Name:${data.name}<p>
      `;
    });
};

getOwner();

const getRepos = () => {
  fetch(REPOS_URL)
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      const forkedRepos = data.filter((repo) => repo.fork === true);
      forkedRepos.forEach(
        (repo) =>
          (projectContainer.innerHTML += `<div id=${repo.name}> 
          
         <h2>${repo.name}</h2>
         <h4>Latest update: ${new Date(repo.updated_at).toDateString()} </h4> 
         <h4> Default branch:${repo.default_branch} </h4>
         <h4> The link to: <a href=${repo.html_url}>${repo.name}</a> </h4>
         </div>`)
      );

      drawChart(forkedRepos.length);
      getPullRequests(forkedRepos);
    });
};

getRepos();

const getPullRequests = (forkedRepos) => {
  forkedRepos.forEach((repo) => {
    fetch(
      `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const pulls = data.filter(
          (pulls) => pulls.user.login === repo.owner.login
        );
        console.log(pulls);
        const myCommit_URL = pulls[0].commits_url;
        //console.log(myCommit_URL);
        //getCommits(myCommit_URL, repo);
      });
  });
};
// const getCommits = (myCommit_URL, repo) => {
//   fetch(myCommit_URL)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//     });
// };
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
