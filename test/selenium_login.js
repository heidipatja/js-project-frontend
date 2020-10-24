"use strict";

const assert = require("assert");
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const firefox = require('selenium-webdriver/firefox');
const By = require("selenium-webdriver").By;

let browser;

test.describe("Test login page with Selenium", function() {
    test.beforeEach(function(done) {
        this.timeout(20000);
        browser = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.firefox())
            .setFirefoxOptions(new firefox.Options().headless())
            .forBrowser("firefox")
            .build();

        browser.get("http://localhost:3000/login");
        done();
    });

    test.afterEach(function(done) {
        browser.quit();
        done();
    });

    function assertH1(target) {
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, target);
            });
        });
    }

    function login() {
        let email = "heidi@gmail.com";

        let password = "heidi";

        browser.findElement(By.name("email")).then(function(element) {
            element.sendKeys(email);
        });

        browser.findElement(By.name("password")).then(function(element) {
            element.sendKeys(password);
        });

        browser.findElement(By.css("button")).then(function(element) {
            element.click();
        });
    }


    test.it("Test login and end up on Account page", function(done) {
        login();

        assertH1("ACCOUNT");

        done();
    });


    test.it("Test that you can login and see trade, account and logout links", function(done) {
        login();

        let tradeLink = browser.findElement(By.linkText("LOGOUT"));

        let accountLink = browser.findElement(By.linkText("ACCOUNT"));

        assert.ok(tradeLink);
        assert.ok(accountLink);

        done();
    });


    test.it("Test login, go to trading page and see graph (canvas tag)", async function(done) {
        login();

        browser.findElement(By.linkText("TRADE")).then(function(element) {
            element.click();
        });

        let canvas = browser.findElement(By.css("canvas"));

        assert.ok(canvas);

        done();
    });


    test.it("Test login, see logout link, then logout and see login link", function(done) {
        login();

        browser.findElement(By.linkText("LOGOUT")).then(function(element) {
            element.click();
        });

        assertH1("LOGIN");

        done();
    });


    test.it("Test update balance and it is not equal to old balance", async function(done) {
        let deposit, oldBalance, newBalance;

        deposit = 10;

        login();

        // Get old balance
        oldBalance = browser.findElement(By.className("balanceNumber"));

        //Update balance
        browser.findElement(By.css("button")).then(function(element) {
            element.click();
        });

        browser.findElement(By.name("deposit")).then(function(element) {
            element.sendKeys(deposit);
        });

        browser.findElement(By.className("saveButton")).then(function(element) {
            element.click();
        });

        // Get new balance
        newBalance = browser.findElement(By.className("balanceNumber"));

        // Check that old balance is not equal to new balance
        assert.ok(oldBalance !== newBalance);

        done();
    });
});
