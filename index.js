const inquirer = require("inquirer");
const fs = require("fs");
const axios = require('axios').default;
const generateHTML = require('./generateHTML');
// const pdf = require('html-pdf');

let profileImg;
let gitHubUserName;
let userCity;
let userGitHubProfile;
let userBlog;
let userBio;
let userRepositories;
let userFollowers;
let userGHStars;
let userFollowing;


//==============================================
// Inquirer asks for Username and fave color
//==============================================
inquirer
    .prompt([
        {
            type: "input",
            message: "GitHub Username?",
            name: "username"
        },
        {
            type: "list",
            message: "What is your favorite color?",
            choices: [
                "green",
                "blue",
                "pink",
                "red"
            ],
            name: "color"
        },
    ])
    .then(async function (userInput) {
        try {


            let gitHubData = await ghAPI(userInput.username)
            console.log(ghURL);

            const ghstarCount = await ghStarAPI(userInput.username);
            console.log(ghstarCount);

            let htmlData = {
                user: userInput,
                github: gitHubData
            }
            console.log(gitHubData);

        } catch (err) {
            console.log(err);
        }

    });


function ghAPI(username) {
    ghURL = `https://api.github.com/users/${username}`;
    console.log(ghURL);
    return axios.get(ghURL)
        .then(function (response) {
            return Promise.resolve(response.data);


        });
};

function ghStarAPI(username) {
    ghStarURL = `https://api.github.com/users/${username}/starred`;
    console.log(ghStarURL);
    return axios.get(ghStarURL)
        .then(function (responseStars) {
            return Promise.resolve(responseStars.data.length);
        });
};




// const html = generateHTML.generateHTML(htmlData);


// let profileImg = (response.data.avatar_url + ".png");
// let gitHubUserName = (response.data.login);
// let userCity = (response.data.location);
// let userGitHubProfile = (response.data.html_url);
// let userBlog = (response.data.blog);
// let userBio = (response.data.bio);
// let userRepositories = (response.data.public_repos);
// let userFollowers = (response.data.followers);
// let userFollowing = (response.data.following);
// // let userGHStars =  Create another axios call for - ;