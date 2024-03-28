# Local Instance Instructions

1. Open Visual Studio Code. Start up a terminal.
2. Clone the Github repo.
```
git clone https://github.com/MAHA-Software-Engineering/NHTSA-Frontend.git
```
3. Create new file named ".env.local".
```
# AWS ENDPOINTS
# AWS ENDPOINTS
FETCH_DATA_ENDPOINT='uh oh, stinky 🦧'

# AWS COGNITO
COGNITO_CLIENT_ID='uh oh, stinky 🦧'
COGNITO_CLIENT_SECRET='uh oh, stinky 🦧'
COGNITO_ISSUER='uh oh, stinky 🦧'
```
4. Install dependencies from Node.js.
```
npm i
```
5. Run the development server through the terminal.
```
npm run dev
```
6. Open a new terminal, and run the following file.
```
python src\components\utilities\scraperApi.py
```

# Developer Due Diligence

1. Ensure that you always run  `npm run build` before pushing any code to lint any possible errors or warnings.
2. Any components/code that seems to be overbearingly long, please decompose into smaller, more manageable sections separated by concern.
