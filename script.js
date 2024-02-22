const searchInput = document.querySelector(".input-container"); 
const inputField = document.querySelector("#input-field");
const searchBtn = document.querySelector(".search-btn");
const noresults = document.querySelector(".no-results");
const avatar = document.querySelector("#avatar");
const userName = document.querySelector(".user-name");
const userLink = document.querySelector("#user");
const date = document.querySelector("#date");
const bio = document.querySelector("#bio");
const repo = document.querySelector("#repose");
const followers = document.querySelector("#followers");
const following = document.querySelector("#following");
const userLocation = document.querySelector("#location");
const website = document.querySelector("#website");
const twitter = document.querySelector("#twitter");
const company = document.querySelector("#company");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const btnmode = document.querySelector(".btn-mode");
const modetext = document.querySelector(".mode-text");
const modeicon = document.querySelector(".mode-icon");
const root = document.documentElement.style;
let darkmode = false; // initially light mode was activated
const url = "https://api.github.com/users/";


getUserProfile(url + "ayushp0413");

searchInput.addEventListener("submit",function(e){


    e.preventDefault();

    if(inputField.value !== "")
    {
        getUserProfile(url + inputField.value);
    }

});

inputField.addEventListener("input", function () {
    noresults.style.display = "none";
});

btnmode.addEventListener("click",()=>{
    if(darkmode==false)
    {
        darkModeProperties();
    }
    else
    {
        lightModeProperties();
    }
})



function getUserProfile(gitUrl) 
{
    fetch(gitUrl).then((response) => response.json()).then((data) => {
        console.log(data);
        updateProfile(data);
    })
    .catch((error) => {
        throw error;
    });     
}

function updateProfile(data)
{
    if (data.message !== "Not Found")
    {
        noresults.style.display = "none";
        function checkNull(param1, param2) {
            if (param1 === "" || param1 === null) {
            param2.style.opacity = 0.5;
            param2.previousElementSibling.style.opacity = 0.5;
            return false;
            } else {
            return true;
            }
        }

        avatar.src = `${data.avatar_url}`;
        userName.innerText = data.name === null ? data.login : data.name;
        userLink.innerText = `@${data.login}`; 
        userLink.href = `${data.html_url}`;
        let datesegments = data.created_at.split("T").shift().split("-");
        date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`; 
        bio.innerText = data.bio == null ? "This profile has no bio" : `${data.bio}`;
        repo.innerText = `${data.public_repos}`;
        followers.innerText = `${data.followers}`; 
        following.innerText = `${data.following}`;
        website.innerText = checkNull(data.blog, website) ? data.blog : "Not Available"; 
        website.href = checkNull(data.blog, website) ? data.blog : "#";
        userLocation.innerText = checkNull(data.location, userLocation) ? data.location : "Not Available";
        twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
        company.innerText = checkNull(data.company, company) ? data.company : "Not Available";
        
    }else
    {
        noresults.style.display = "block";
    }
}

const wrapper = document.querySelector(".wrapper");
const heading = document.querySelector(".heading-bar");
const profile = document.querySelector(".profile-container");
const stats =  document.querySelector(".stats-wapper");
const body = document.querySelector(".body");
const searchContainer = document.querySelector(".search-bar-container");


function darkModeProperties()
{
    modetext.innerText = "LIGHT";
    modetext.style.color="white"
    modeicon.src = "./assets/images/sun-icon.svg";
    body.style.backgroundColor = "#141D2F";
    wrapper.style.backgroundColor = "#141D2F";
    heading.style.color="white";
    searchContainer.style.backgroundColor = "#1E2A43";
    inputField.style.backgroundColor="#1E2A43"
    profile.style.color="white";
    profile.style.backgroundColor="#1E2A47";
    stats.style.backgroundColor="#1b222e";
    userName.style.color = "white"
    darkmode = true;
    localStorage.setItem("dark-mode", true);
}

function lightModeProperties() {
    modetext.innerText = "DARK";
    modetext.style.color="#4b6a9b"
    modeicon.src = "./assets/images/moon-icon.svg";
    body.style.backgroundColor = "#e0e4f5";
    wrapper.style.backgroundColor = "#e0e4f5";
    heading.style.color="#4b6a9b";
    searchContainer.style.backgroundColor = "#f6f8ff";
    inputField.style.backgroundColor="#f6f8ff";
    profile.style.color="#4b6a9b";
    profile.style.backgroundColor="#f6f8ff";
    stats.style.backgroundColor="#e0e4f5";
    userName.style.color = "black";
    darkmode = false;
    localStorage.setItem("dark-mode", false);
}

lightModeProperties();
  
  