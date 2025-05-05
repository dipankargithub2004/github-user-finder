let searchBtn = document.querySelector(".search"); 
let usernameinp = document.querySelector(".usernameinp");
let card = document.querySelector(".card");

function getProfileData(username){
  return fetch(`https://api.github.com/users/${username}`)
    .then(raw => {
      if (!raw.ok) throw new Error("User not found.");
      return raw.json();
    });
}

function getRepos(username){
  return fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
    .then(raw => {
      if (!raw.ok) throw new Error("Failed to fetch repos.");
      return raw.json();
    });
}

function decorateProfileData(details){
  let data = `
    <img 
      src="${details.avatar_url}" 
      alt="User avatar" 
      class="w-28 h-28 rounded-full border-4 border-blue-500 shadow-lg"
    />
    <div>
      <h2 class="text-2xl font-bold text-gray-800">${details.name || "No Name"}</h2>
      <p class="text-gray-600">@${details.login}</p>
      <p class="mt-2 text-sm text-gray-500">${details.bio || "No bio available."}</p>
      <div class="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-700">
        <div>
          <span class="font-medium">Followers:</span> ${details.followers}
        </div>
        <div>
          <span class="font-medium">Following:</span> ${details.following}
        </div>
        <div>
          <span class="font-medium">Public Repos:</span> ${details.public_repos}
        </div>
        <div>
          <span class="font-medium">Company:</span> ${details.company || "N/A"}
        </div>
        <div>
          <span class="font-medium">Location:</span> ${details.location || "N/A"}
        </div>
        <div>
          <span class="font-medium">Blog:</span> 
          <a href="${details.blog}" target="_blank" class="text-blue-600 hover:underline">
            ${details.blog || "N/A"}
          </a>
        </div>
      </div>
    </div>
  `;
  card.innerHTML = data;
}

searchBtn.addEventListener("click", function(e){
    e.preventDefault();
  let username = usernameinp.value.trim();
  if (username.length > 0){
    getProfileData(username)
      .then(data => {
        decorateProfileData(data);
      })
      .catch(err => {
        card.innerHTML = `<p class="text-red-600">❌ ${err.message}</p>`;
      });
  } else {
    alert("Please enter a GitHub username.");
  }
});
