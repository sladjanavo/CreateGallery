///  <reference types="cypress"/>
const Locators = require("../fixtures/Locators.json")

describe("Testovi za Create Gallery",()=>{

let correctEmail = "vezba1@gmail.com"
let correctPassword = "12345678"
let title = "Panda"
let title2 = "SuperMario"
let decs = "Meda"
let desc2 = "Cartoon"
let imageAddress = "https://tinyjpg.com/images/social/website.jpg"
let imagePng = "https://purepng.com/public/uploads/large/purepng.com-mariomariofictional-charactervideo-gamefranchisenintendodesigner-1701528634653vywuz.png"


beforeEach("Login user",()=>{
    cy.login(correctEmail,correctPassword)
    cy.wait(2000)
})

it("Open Create Gallery",()=>{

    cy.get(Locators.Create.Link).eq(2).click()
    cy.expect("/create").to.equal("/create")
    cy.get(Locators.Register.Title).should("be.visible").and("have.text","Create Gallery")
})

it("Upload image",()=>{
    cy.get(Locators.Create.Link).eq(2).click()
    cy.expect("/create").to.equal("/create")
    cy.get(Locators.Create.Title).type(title)
    cy.get(Locators.Create.Description).type(decs)
    cy.get(Locators.Create.PoljaZaCreate).eq(2).type(imageAddress)
    cy.get(Locators.Create.Submit).eq(0).click()
    cy.get(Locators.Create.Gal).eq(0).should("contain",title)


})


it("My gallery",()=>{
    cy.get(Locators.Create.Link).eq(1).click()
    cy.get(Locators.Create.Albumi).eq(0).should("contain",title)
    cy.get(Locators.Create.BigTitle).should("have.text","My Galleries")
    /*cy.get(Locators.Create.Search).should("have.text","Search...")*/
   
})

it("Create gallery without title",()=>{
    cy.get(Locators.Create.Link).eq(2).click()
    cy.get(Locators.Create.PoljaZaCreate).eq(1).should("contain","Description")
    cy.get(Locators.Create.Description).type(decs)
    cy.get(Locators.Create.PoljaZaCreate).eq(2).type(imageAddress)
    cy.get(Locators.Create.Submit).eq(0).click()
    cy.get(Locators.Create.Title).then(($input)=>{
        expect($input[0].validationMessage).to.eq("Please fill out this field.")
    })

   })

 it("Create gallery without description",()=>{
     cy.get(Locators.Create.Link).eq(2).click()
     cy.get(Locators.Create.PoljaZaCreate).eq(0).should("contain","Title")
     cy.get(Locators.Create.Title).type(title)
     cy.get(Locators.Create.PoljaZaCreate).eq(2).type(imageAddress)
     cy.get(Locators.Create.Submit).eq(0).click()
     cy.get(Locators.Create.Albumi).eq(0).should("contain",title)
 })  

 it("Create gallery with extension png",()=>{
     cy.get(Locators.Create.Link).eq(2).click()
     cy.get(Locators.Create.BigTitle).eq(0).should("contain","Create Gallery")
     cy.get(Locators.Create.Title).type(title2)
     cy.get(Locators.Create.Description).type(desc2)
     cy.get(Locators.Create.PoljaZaCreate).eq(2).type(imagePng)
     cy.get(Locators.Create.Submit).eq(0).click()
     cy.get(Locators.Create.Albumi).eq(0).should("contain",title2)

 })

 it("Upload more images in my gallery",()=>{
     cy.get(Locators.Create.Link).eq(1).click()
     cy.expect("/my-galleries").to.eq("/my-galleries")
     cy.server()
     cy.route("GET","https://gallery-api.vivifyideas.com/api/my-galleries?page=1&term=").as("sacekaj")
     cy.wait("@sacekaj")
     cy.get(Locators.Create.Gal).eq(0).click()
    
 })

 it.only("Upload more images in my gallery",()=>{
    cy.get(Locators.Create.Link).eq(1).click()
    cy.expect("/my-galleries").to.eq("/my-galleries")
    cy.wait(5000)
    cy.get(Locators.Create.Gal).eq(0).click()
    cy.get(Locators.Create.Submit).eq(1).click
    
   
})






















})