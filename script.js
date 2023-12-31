class GitHub {
  constructor() {
    this.form = document.getElementById("form");
    this.searchInput = document.getElementById("search");
    this.main = document.getElementById("main");

    this.form.addEventListener("submit", this.getUserDetails.bind(this));
  }

  async getUserDetails(event) {
    event.preventDefault();
    const username = this.searchInput.value;
    const userData = await this.fetchUserData(username);

    if (userData) {
      this.createUserCard(userData);
    }
  }

  async fetchUserData(username) {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        // Handle error here (e.g., user not found).
        console.error("User not found");
        return null; // Return null in case of error
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null; // Return null in case of error
    }
  }

  createUserCard(user) {
    const cardHTML = `
      <div class="card">
        <img src="${user.avatar_url}" alt="${user.login}" class="avatar">
        <h2>${user.name}</h2>
        <p>Bio: ${user.bio}</p>
        <ul>
          <li>Followers: ${user.followers}</li>
          <li>Following: ${user.following}</li>
          <li>Repositories: ${user.public_repos}</li>
          <li>Twitter: ${user.twitter_username || "Not available"}</li>
          <li>Location: ${user.location || "Not available"}</li>
          <li>Comapny: ${user.company || "Not available"}</li>

          </ul>
      </div>
    `;

    this.main.innerHTML = cardHTML;
  }

  initialize() {
    // Initialize the card with your GitHub profile.
    this.getUserDetails({ preventDefault: () => {} });
  }
}

new GitHub();
