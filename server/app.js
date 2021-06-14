const   express = require('express'),
        request = require('request'),
        app = express(),
        port = 3001,
        API = express.Router(),
        TSV = require('tsv'),
        { parseDms } = require('dms-conversion'),
        NodeCache = require( "node-cache" ),
        myCache = new NodeCache({stdTTL: 60*10});

const countriesCoords = [
    {
        name: "Україна",
        coords: [49.8386869, 24.0584669]
    },
    {
        name: "Німеччина",
        coords: [53, 9]
    },
    {
        name: "Німеччина",
        coords: [52, 9]
    }
];

app.get("/", (req, res) => {
    getInfoFromDB().then(data => {
        res.json([data]);
    }, error => {
        res.send(error);
    });
});

API.get("/countries", (req, res) => {
    console.log(...countriesCoords)
    res.json(countriesCoords);
});

API.get("/years/:country", (req, res) => {
    let years = new Set();
    getInfoFromDB().then(data => {
        data.forEach(el => {
            console.log(el);
            years.add(el['рік заснування']);
            years.add(el['закінчення']);
        });
        console.log(...years);
        res.json([...years].sort((a, b) => {
            return a - b;
        }));
    });
});

API.get("/markers/:country", (req, res) => {
    let markers = [];
    getInfoFromDB().then(data => {
        data.forEach((el, i) => {
            let DMScoords = [el['С. ш'], el['в. д']];
            let DDcoords = DMScoords.map(parseDms);
            markers.push({
                ID: i,
                lat: DDcoords[0],
                lng: DDcoords[1],
                town: el['Місто'],
                years: [el['рік заснування'], el['закінчення']]
            });
        });
        res.json(markers);
    });
});

function getInfoFromDB(){
    return new Promise((res, rej) => {
        let db = myCache.get("db");
        if(db){
            res(db);
        }
        else{
            console.log("Request");
            let options = {
                url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR0SkMP18-cZZwk93d_hO7YaiixOf9jX2eb02AxhNJYg_EMg_Df1iqUukvjalhrQOksXQ4VsQmcYRWO/pub?gid=1489393233&single=true&output=tsv'
            }
            
            request(options, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    let data = TSV.parse(body);
                    data.forEach((el, i) => {
                        if(el['клас(технологія)'] === ''){
                            data.splice(i, 1);
                        }
                    });
                    myCache.set("db", data);
                    res(data);
                } else {
                    console.log(error);
                    rej(error);
                }
            });
        }
    });
}

app.use("/api", API);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})