# WWETG2
This repository is migrated from https://github.com/Yanglin-Tao/WWEFastAPI.
## Backend
### Set up 
TurboGears2 (assume you already installed pip tool and python virtual env), also make sure you have Python 3.11.
Include the following packages in your Pipfile:
```
[packages]
TurboGears2 = "*"
kajiki = "*"
dukpy = "*"
tgext.webassets = "*"
tg.devtools = "*"
SQLAlchemy = "1.3.*"
Paste = "3.6.1"
PyJWT = "*"
schedule = "*"
```
### To run backend:
1. Make sure you are in `/WWETG2/wwetg2app` directory
2. Run `gearbox serve --reload --debug`

## Frontend
### Set up 
React (assuming you already installed React)
### To run fronend:
1. Make sure your backend server is up and running
2. Make sure you are in `/WWETG2/wwe-frontend` directory
3. Run `npm start`

## Database
### Set up
Postgresql
1. Download Postgresql
2. Create a database named 'whatweeatapp'
3. In pgAdmin4, go to Tools > Query Tool, then run the following queries:
```
GRANT CONNECT ON DATABASE whatweeatapp TO [your_name];
GRANT USAGE ON SCHEMA public TO [your_name];
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO [your_name];
ALTER DATABASE "whatweeatapp" OWNER TO "[your_name]";
```
Notice that I used 'yanglintao' in main.py in the backend folder. To avoid merging issues, it's better to use the same name. You can create a new role named 'yanglintao' and set passwords. But feel free to change to your role name as long as you do not commit that change.

### Insert data
1. Open pgAdmin4 and start the server.
2. Run the backend and go to localhost:8080.
3. In pgAdmin4, select "Tools" -> "Query Tool." If you are using macOS, "Tools" is located on the top left corner of your screen.
4. Drag the file WWEDataBase.sql into the window and click the "execute" symbol.
5. Congratulations! The data has been inserted!

## The HelloWorld example
In `/WWETG2/wwetg2app/wwetg2app/controllers/root.py`, define an API endpoint named 'helloworld'
```
class RootController(BaseController):
    # ...
    # some other endpoints
    # ...

    @expose('json')
    def helloworld(self):
        """Simple Hello World endpoint."""
        return {"message": "Hello, World!"}
```
In `wwe-frontend/src/App.js`, the message is rendered by fetching JSON reponse from "http://localhost:8080/helloworld".
```
function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch data from TG2 backend
    fetch("http://localhost:8080/helloworld")
      .then(response => response.json())
      .then(data => setMessage(data.message));
  }, []);

  return (
    <div>
        {message}
    </div>
  );
}
```