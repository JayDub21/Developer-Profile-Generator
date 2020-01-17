const inquirer = require("inquirer");
const fs = require("fs");
const axios = require('axios').default;
const getHTML = require('./generateHTML');
const pdf = require('html-pdf');

//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
//                NPM Packages
//=================================================
// Inquirer asks for Username and fave color
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

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
    .then(function (userInput) {

        //==============================================
        // Set up URLs for API calls below
        //==============================================
        const queryUrl = `https://api.github.com/users/${userInput.username}`;
        const queryStarUrl = `https://api.github.com/users/${userInput.username}/starred`;


        ghquery(queryUrl).then(function (data) {
            ghQueryStars(queryStarUrl).then(function (responseStars) {

                //========================================================
                // Taking generateHTML.js file and converting it to .PDF
                //========================================================
                var options = { format: 'Letter' };
                pdf.create(getHTML(userInput, responseStars, data), options).toFile(`./${userInput.username}.pdf`, function (err, res) {
                    if (err) return console.log(err);
                    console.log(res);
                });
            })
        })


    });

//==============================================
// Main API call
//==============================================
function ghquery(queryUrl) {
    // console.log(queryUrl);
    return axios.get(queryUrl)
        .then(function (response) {
            // console.log(respone.data);

            let data = {
                fullName: (response.data.name),
                profileImg: (response.data.avatar_url + ".png"),
                gitHubUsername: (response.data.login),
                userCity: (response.data.location),
                userGitHubProfile: (response.data.html_url),
                userBlog: (response.data.blog),
                userBio: (response.data.bio),
                userRepos: (response.data.public_repos),
                userFollowers: (response.data.followers),
                userFollowing: (response.data.following)
            };




            return data;
        });
};

//==============================================
// API Call for # of starred
//==============================================
function ghQueryStars(queryStarUrl) {

    return axios.get(queryStarUrl)
        .then(function (responseStars) {
            // console.log(responseStars.data.length);

            return responseStars.data.length;
        });
};
