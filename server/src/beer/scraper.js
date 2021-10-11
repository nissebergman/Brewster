// Importing axios for POST function to DB
var axios = require('axios');
// Importing Puppeteer for scraping
const puppeteer = require('puppeteer');
function scrape () {
    // String for taking the entire div of each beer
    var beer = "";
    // Bool whether the beer is "tested", meaning that it has sufficient info to be scraped
    var isTested;
    return new Promise(async (resolve, reject) => {
        try {
            // Launching headless chromium browser for scraping
            const browser = await puppeteer.launch({
                headless: true,
                //slowMo: 200 //Slows doen puppeteer operations, useful when using headless:false to see what's going on
            });
            const page = await browser.newPage();
            await page.goto("https://www.systembolaget.se/sok/?textQuery=stout&categoryLevel1=%C3%96l");
            // Gatekeeping buttons to be pressed in order to get the site to load all them beers
            const ageCheck = '.css-1upq44r';
            const cookieButton = '.css-lzdhch.epc1dj70';
            const showMoreButton = '.css-1oyj15r.epc1dj70';
            await page.waitForSelector(ageCheck, {timeout: 60000});
            await page.click(ageCheck);
            await page.waitForSelector(cookieButton, {timeout: 60000});
            await page.click(cookieButton);
            await page.waitFor(1000);
            let buttonVisible = true;

            // While there is a scrollbutton, push it.
            while(buttonVisible){
                try {
                    await autoScroll(page);
                    await page.waitFor(1000);
                    await page.waitForSelector(showMoreButton, {timeout: 10000});
                    await page.click(showMoreButton);
                    
                } catch (error) {
                    buttonVisible = false;
                }
            }
            // When all the info is loaded and present on the page, enter evaluate.
            let results = await page.evaluate(() => {
                let beerInfo = [];
                let beerLinks = [];
                // We should filter the query selector to avoid having to do multiple checks and dark arts further down
                // but since this is not a scraper-course, we will allow this sus-activity.
                let items = document.querySelectorAll('.css-1wo4jfn'); //Query div containing the beer
                let images = document.querySelectorAll('.css-1wo4jfn img'); //Query div containing the img
                let index = 0;
                let id = 0;
                // Pushing beerlinks into separate array, this is done since links and items do not share divs
                images.forEach((image) => 
                {
                    beerLinks.push(image.getAttribute("src"));
                });

                // Pushing each beer into object array
                items.forEach((item) => {
                    isTested = true;
                    beer = item.innerText.split("\n");
                    // This checks whether current beer has incomplete information.
                    // We currently do not add these beers to our DB. 'Drycken' means that there is a string saying: 'Drycken har ännu inte testats'.
                    // By checking if it includes we can exclude it.
                    if ((beer[2].length > 50) || (beer[2].includes('Drycken'))){
                        isTested = false;
                    }
                    let releaseIndex = beer.length-3; //If beer has an release date, this is the position
                    let tasteIndex = 3; //If beer has tasteinfo, this is the position

                    // Setting slot of data for beers without release date, to null.
                    // 'Säljstart' means that there is a string containing Säljstart: *date*, meaning it is an Release beer.
                    if (!(beer[releaseIndex].includes('Säljstart'))){
                        beer[releaseIndex] = null;
                    }
                    // If it includes 'Säljstart' we set the date to the release index
                    if (beer[releaseIndex-1].includes('Säljstart')){
                        beer[releaseIndex] = beer[releaseIndex-1];
                    }

                    //Checking whether there is taste data to scrape from systembolaget. If 'Drycken finns i lager..' it means that 
                    // systembolaget has NOT tested the beer and given it any taste info.
                    if (beer[tasteIndex] != null && beer[tasteIndex].includes("Drycken finns i lager hos leverantör") 
                        || beer[tasteIndex] != null && beer[tasteIndex].length < 20){
                        beer[tasteIndex] = null;
                    }
                    //Pushing tried and tested beers to array
                    if (isTested) {
                        beerInfo.push({
                            id: id,
                            name: beer[1],
                            type: beer[2],
                            taste: beer[tasteIndex],
                            price: parseFloat(beer[beer.length-2].padEnd(5, '0').replace(":",".").replace(/[*:-]/g, '')), //Parsing price into float, removing swedish symbols
                            link: beerLinks[index], //Adding links to final object array
                            release:  beer[releaseIndex] != null ? beer[releaseIndex].replace("Säljstart ", "") : null
                        });
                        // ID for DB
                        id++; //Incrementing unique id
                    }
                    //Index for merging linkarray with beerarray
                    index++; //Incrementing index responsible for making sure that links and beers are in sync. This is NOT the same as id.
                });
               return beerInfo;
            })
            browser.close(); //Close headless browser
            return resolve(results);
        } catch (e) {
            return reject(e);
        }
    })
}

// Function for scrolling the page. Distance makes sure that the entire page gets loaded so that the 'Show more' button appears.
async function autoScroll(page){
    await page.evaluate(async () => {
        var totalHeight = 0;
        var distance = 1000;
        var timer = setInterval(() => {
            var scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;
            clearInterval(timer);
            resolve();
        }, 100);
    });
}
// Call scrape function above
(async function(){
    var list = await scrape();
    
    //Loop through list, post to DB.
    list.forEach(e => {
        axios.post(
            "http://localhost:4000/beer/updatebeers", JSON.stringify(e),
            {
              headers: {
                'Content-Type': 'application/json'
              }
            })
    });
    
})()