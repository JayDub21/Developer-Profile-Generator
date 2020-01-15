const inquirer = require("inquirer");
const fs = require("fs");

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
    .then(function (response) {

        const gitHubUser = response.username.split(" ").join(" ") + '.json'

        fs.writeFile(
            gitHubUser, JSON.stringify(response, null, '\t'), function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("File Saved!");
                }

            });
    });

        // const questions = [

        // ];

        // function writeToFile(fileName, data) {

        // }

        // function init() {

        //     init();
