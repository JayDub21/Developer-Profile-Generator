const colors = {
  green: {
    wrapperBackground: '#839791',
    headerBackground: '#012622',
    headerColor: '#839791',
    photoBorderColor: 'grey',
    footerBackground: '#012622',
  },
  blue: {
    wrapperBackground: '#0F3842',
    headerBackground: '#75BECF',
    headerColor: '0F3842',
    photoBorderColor: 'grey',
    footerBackground: '#75BECF',
  },
  pink: {
    wrapperBackground: '#F2545B',
    headerBackground: '#EFA48B',
    headerColor: 'F2545B',
    photoBorderColor: 'grey',
    footerBackground: '#EFA48B',
  },
  red: {
    wrapperBackground: '#CF152C',
    headerBackground: '#541924',
    headerColor: 'CF152C',
    photoBorderColor: 'grey',
    footerBackground: '#541924',
  },
};

function getHTML(userInput, responseStars, data) {
  //   console.log(data);
  return `<!DOCTYPE html>
  <html lang="en">
     <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
        <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
        <title>Document</title>
        
        <style>
            @page {
              margin: 0;
            }
           *,
           *::after,
           *::before {
           box-sizing: border-box;
           }
           html, body {
           padding: 0;
           margin: 0;
           }
           html, body, .wrapper {
           height: 100%;
           }
           .wrapper {
           background-color: ${colors[userInput.color].wrapperBackground};
           padding-top: 120px;
           }
           .footer{
            background-color: ${colors[userInput.color].footerBackground};
            height: 35px;
           }
           body {
           background-color: white;
           -webkit-print-color-adjust: exact !important;
           font-family: 'Cabin', sans-serif;
           }
           main {
           background-color: #E9EDEE;
           height: auto;
           padding-top: 30px;
           }
           h1, h2, h3, h4, h5, h6 {
           font-family: 'BioRhyme', serif;
           margin: 0;
           }
           h1 {
           font-size: 3em;
           }
           h2 {
           font-size: 2.5em;
           }
           h3 {
           font-size: 2em;
           }
           h4 {
           font-size: 1.5em;
           }
           h5 {
           font-size: 1.3em;
           }
           h6 {
           font-size: 1.2em;
           }
           .photo-header {
           position: relative;
           margin: 0 auto;
           margin-bottom: -10px;
           display: flex;
           justify-content: center;
           flex-wrap: wrap;
           background-color: ${colors[userInput.color].headerBackground};
           color: ${colors[userInput.color].headerColor};
           padding: 10px;
           width: 95%;
           border-radius: 6px;
           }
           .photo-header img {
           width: 250px;
           height: 250px;
           border-radius: 50%;
           object-fit: cover;
           margin-top: -75px;
           border: 6px solid ${colors[userInput.color].photoBorderColor};
           box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
           }
           .photo-header h1, .photo-header h2 {
           width: 100%;
           text-align: center;
           }
           .photo-header h1 {
           margin-top: 10px;
           }
           .links-nav {
           width: 100%;
           text-align: center;
           padding: 20px 0;
           font-size: 1.1em;
           }
           .nav-link {
           display: inline-block;
           margin: 5px 10px;
           }
           .workExp-date {
           font-style: italic;
           font-size: .7em;
           text-align: right;
           margin-top: 10px;
           }
           .container {
           padding: 50px;
           padding-left: 100px;
           padding-right: 100px;
           }
  
           .row {
             display: flex;
             flex-wrap: wrap;
             justify-content: space-between;
             margin-top: 10px;
             margin-bottom: 10px;
           }
  
           .card {
             padding: 10px;
             border-radius: 6px;
             background-color: ${colors[userInput.color].headerBackground};
             color: ${colors[userInput.color].headerColor};
             margin: 10px;
           }
           
           .col {
           flex: 1;
           text-align: center;
           }
  
           a, a:hover {
           text-decoration: none;
           color: inherit;
           font-weight: bold;
           }
  
           @media print { 
            body { 
              zoom: .75; 
            } 
           }
        </style>
        </head>
        <body>
        
        <div class="wrapper">
         
            <div class="photo-header"><img class="photo-header img" src="${
              data.profileImg
            }" alt="profile-img">
            
            <h3>Hi!</h3>
            
            <h3>My name is ${data.fullName}!</h3>
            
            <div class="links-nav">
              <span class="nav-link"><a href="https://www.google.com/maps/place/${
                data.userCity
              }">${data.userCity}</a></span>
              <span class="nav-link"><a href="${
                data.userGitHubProfile
              }">Github</a></span>
              <span class="nav-link"><a href="${data.userBlog}">Blog</a></span>
            </div>
        </div>
      
      <main>
      
      <div class="container">
        
      <div class="row">
          <h5>${data.userBio}</h5>
        </div>
       
        <div class="row">
          <div class="col">
            <div class="card">
              <h4>Public Repositories</h4>
              <h5>${data.userRepos}</h5>
            </div>
            
            <div class="card">
              <h4>Starred Projects</h4>
              <h5>${responseStars.stars}</h5>
            </div>
          </div>
        </div>
        
        <div class="col">
          <div class="card">
            <h4>Followers</h4>
            <h5>${data.userFollowers}</h5>
          </div>
          
          <div class="card">
            <h4>Following</h4>
            <h5>${data.userFollowing}</h5>
          </div>
        </div>
        </div>
      </div>
      </main>
      </div>
      
      <footer></footer>
      </body>
      </html>`;
}

module.exports = getHTML;
