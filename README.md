# ValvePipeApi

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=bigotes0invisibles_202309-w12-final-project-back-matias-risco)](https://sonarcloud.io/summary/new_code?id=bigotes0invisibles_202309-w12-final-project-back-matias-risco)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=bigotes0invisibles_202309-w12-final-project-back-matias-risco&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=bigotes0invisibles_202309-w12-final-project-back-matias-risco)

## Technologies Used

- **Git**: Version control system used to track changes in code and collaborate on software projects.

- **Node.js**: Server-side JavaScript runtime environment for scalable and high-performance applications.

- **Express.js**: Web framework for Node.js simplifying API and web application development.

- **TypeScript**: Language extending JavaScript with static types to prevent common errors during development.

- **MongoDB**: Highly flexible and scalable NoSQL database using document-based data storage.

- **Jest**: JavaScript testing framework useful for unit, integration, and end-to-end testing in Node.js and React applications.

<br/>

<div align="center">  
<a href="https://github.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/git-scm-icon.svg" alt="Git" height="50" /></a>  
<a href="https://nodejs.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/nodejs-original-wordmark.svg" alt="Node.js" height="50" /></a>  
<a href="https://expressjs.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/express-original-wordmark.svg" alt="Express.js" height="50" /></a>  
<a href="https://www.typescriptlang.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/typescript-original.svg" alt="TypeScript" height="50" /></a>  
<a href="https://www.mongodb.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/mongodb-original-wordmark.svg" alt="MongoDB" height="50" /></a>  
<a href="https://www.jestjs.io/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/jest.svg" alt="Jest" height="50" /></a>  
</div>

## Endpoints

### GET /

- Check the server response through the pingController.
- Sends the message "🏓" in the response body and status 200.

### GET / (wrong endpoint)

- Request to a wrong endpoint.
- Sends the message "Endopoint not found" in the response body and status 404.

### GET / games

- Request for a list of 10 games.
- Sends a collection of 10 games in the response body and status 200.

### GET / games?page=number

- Request for a list of 10 games starting for page\*10.
- Sends a collection of 10 games in the response body and status 200.

### GET / games / info/ :id

- Request for a determinated game.
- Sends a the determinated game in the response body and status 200.

### DELETE / games / delete / :id

- Request to delete a game by its id.
- Sends a the deleted game in the response body and status 200.

### POST / games / add

- Request to add an game.
- Sends the information of the game in the response body and status 200.

### PATCH / games / edit

- Request to modify a game.
- Sends a the modified game in the response body and status 200.

### GET / games / count

- Request total number of games.
- Sends a the total number of games in the response body and status 200.
