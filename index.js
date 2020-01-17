const inquirer = require("inquirer");
const fs = require("fs");
const axios = require('axios').default;
const generateHTML = require('./generateHTML');
const pdf = require('html-pdf');

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

            profileImg = (response.data.avatar_url + ".png");
            gitHubUsername = (response.data.login);
            userCity = (response.data.location);
            userGitHubProfile = (response.data.html_url);
            userBlog = (response.data.blog);
            userBio = (response.data.bio);
            userRepos = (response.data.public_repos);
            userFollowers = (response.data.followers);
            userFollowing = (response.data.following);


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


// HTMLtoPDF.create(generateHTML(userInput, response, responseStars, profileImg, githubUsername, userCity, userGithubProfile, userBlog, userBio, numberOfRepos, userFollowers, userFollowing), options).toFile(`./${userInput.username}.pdf`, function (err, res) {
//     if (err) return console.log(err);
//     console.log(res);
// });


// const html = generateHTML.generateHTML(htmlData);



