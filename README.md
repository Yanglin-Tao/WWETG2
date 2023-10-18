# WWETG2
This repository is migrated from https://github.com/Yanglin-Tao/WWEFastAPI.
## Backend
### Set up 
TurboGears2 (assume you already installed pip tool and python virtual env), also make sure you have Python 3.11.
Ideally you shouldn't be installing any dependencies since they are specified in Pipfile.
### To run backend:
1. Make sure you are in `/WWETG2/wwetg2app` directory
2. Run `gearbox serve --reload --debug`

## Frontend
### Set up 
React (assuming you already installed React)
1. npm install axios
### To run fronend:
1. Make sure your backend server is up and running
2. Make sure you are in `/WWETG2/wwe-frontend` directory
3. Run `npm start`

## Database
Postgresql
1. Download Postgresql
2. Create a database named 'whatweeatapp'
3. In pgAdmin4, go to Tools > Query Tool, then run the following queries:
```
GRANT CONNECT ON DATABASE whatweeatapp TO [your_name];
GRANT USAGE ON SCHEMA public TO [your_name];
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO [your_name];
ALTER DATABASE "whatweeatapp" OWNER TO "[your_name]";
SELECT * FROM user_profiles;
```
Notice that I used 'yanglintao' in main.py in the backend folder. To avoid merging issues, it's better to use the same name. You can create a new role named 'yanglintao' and set passwords. But feel free to change to your role name as long as you do not commit that change.