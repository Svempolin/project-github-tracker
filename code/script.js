const ownerInfo = document.getElementById("ownerInfo");
const projectContainer = document.getElementById("projects");
const USER = "Svempolin";
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;

const globalvaribal = "hello";

const getOwner = () => {
  fetch(REPOS_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const forkedOwner = data.filter((repo) => repo.fork === true);
      forkedOwner.forEach(
        (repo) =>
          (ownerInfo.innerHTML += `<div id=${repo.owner.avatar_url}> 
        </div>`)
      );
    });
};

const getRepos = () => {
  fetch(REPOS_URL)
    .then((response) => response.json())
    .then((data) => {
      //   const forkedRepos = data.name;
      //   forkedRepos.forEach(
      //     (data) => (projectContainer.innerHTML += `<h3>${data.name}</h3>`)
      //   );
      console.log(data);
      //   data.forEach((repo) => console.log(repo.name));
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
    });
};
getRepos();
getOwner();
