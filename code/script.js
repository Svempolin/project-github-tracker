const projectContainer = document.getElementById("projects");
const USER = "Svempolin";
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;

const globalvaribal = "hello";
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
        (repo) => (projectContainer.innerHTML += `<h3>${repo.name}</h3>`)
      );
      drawChart(forkedRepos.length);
    });
};
getRepos();
