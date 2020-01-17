const inquirer = require("inquirer");
const fs = require("fs");
const axios = require('axios').default;
const getHTML = require('./generateHTML');
const pdf = require('html-pdf');

//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
//                NPM Packages
//==============================================
// Blank variables for info pulled from GitHub
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

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
    //==============================================
    //
    //==============================================
    .then(function (userInput) {

        const queryUrl = `https://api.github.com/users/${userInput.username}`;
        const queryStarUrl = `https://api.github.com/users/${userInput.username}/starred`;

        ghquery(queryUrl).then(function (response) {
            ghQueryStars(queryStarUrl).then(function (responseStars) {

                var options = { format: 'Letter' };
                pdf.create(getHTML(userInput, response, responseStars, profileImg, gitHubUsername, userCity, userGitHubProfile, userBlog, userBio, userRepos, userFollowers, userFollowing), options).toFile(`./${userInput.username}.pdf`, function (err, res) {
                    if (err) return console.log(err);
                    console.log(res);
                });
            })
        })


    });


function ghquery(queryUrl) {
    console.log(queryUrl);
    return axios.get(queryUrl)
        .then(function (response) {
            // console.log(respone.data);

            profileImg = (response.data.avatar_url + ".png");
            gitHubUsername = (response.data.login);
            userCity = (response.data.location);
            userGitHubProfile = (response.data.html_url);
            userBlog = (response.data.blog);
            userBio = (response.data.bio);
            userRepos = (response.data.public_repos);
            userFollowers = (response.data.followers);
            userFollowing = (response.data.following);

            return response;
        });
};

function ghQueryStars(queryStarUrl) {

    return axios.get(queryStarUrl)
        .then(function (responseStars) {
            console.log(responseStars.data.length);

            return responseStars.data.length;
        });
};





// const html = generateHTML.generateHTML(htmlData);

// let htmlData = {
//     user: userInput,
//     github: gitHubData
// }



// const gitHubData = ghAPI(userInput.username)
// console.log(gitHubData);

// const ghstarCount = ghStarAPI(userInput.username);
// console.log(ghstarCount);


