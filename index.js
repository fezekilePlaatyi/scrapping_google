const puppeteerGoogleScraper = require("puppeteer-google-scraper")
var csvWriter = require('csv-write-stream')
var writer = csvWriter()
const fs = require('fs')
var filePath = './searchResults.csv'


try {
    fs.unlinkSync(filePath)
} catch (err) {
    if (!err.errno == -4058) {
        console.log("Some unknow error occured!")
    }
}

var writer = csvWriter({ headers: ["TITLE", "URL"] })
writer.pipe(fs.createWriteStream(filePath))

puppeteerGoogleScraper("LinkedIn Fezekile Plaatyi", {
    limit: 20
    , headless: false
}).then(googleSearchResults => {
    googleSearchResults.forEach(result => {
        writer.write([result.title, result.url])
    });
    writer.end(() => {
        console.log("Successfully created a CSV with search results and URL")
    })

}).catch(err => {
    console.error(err)
})