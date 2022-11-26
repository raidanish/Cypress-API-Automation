//const cypress = require("cypress")
/// <reference types="Cypress" />


describe('All test cases for Post APIs', () => {

    before(function()
    {
        //loading json file before use
        cy.fixture('UserData').then(function(data1)
        {
            //this. is used for global varible
            this.UserDataJson = data1
        })
    })

    let BaseURLUsers = 'https://reqres.in/api/users/'
  
    
    it('Create new user by providing valid data and verify', () => {    
        cy.request({
          method: 'POST',
          url: BaseURLUsers,
          body: {
              "job": "this.UserDataJson.job",
              "name": "this.UserDataJson.name"            
          }
        }).then((response)=>{
          //assertion
          expect(response.status).to.eq(201)
          expect(response.body).has.property('job', 'this.UserDataJson.job')
          expect(response.body).has.property('name', 'this.UserDataJson.name')
        }).then((response)=>{
            const userID = response.body.id
            

            cy.request({
                method: 'GET',
                url: BaseURLUsers + userID
              }).then((response)=>{
                //assertion to verify status code
                expect(response.status).to.eq(200)
                expect(response.body).to.exist
              })
        })
      })

      it('Create new user with empty name field', () => {    
        cy.request({
          method: 'POST',
          url: BaseURLUsers,
          body: {
              "job": "this.UserDataJson.job",
              "name": ""            
          }
        }).then((response)=>{
          //assertion
          expect(response.status).to.eq(201)
          expect(response.body).has.property('job', 'this.UserDataJson.job')
          expect(response.body).has.property('name', '')
        })
      })

      it('Create new user with empty job field', () => {    
        cy.request({
          method: 'POST',
          url: BaseURLUsers,
          body: {
              "job": "",
              "name": "this.UserDataJson.name"            
          }
        }).then((response)=>{
          //assertion
          expect(response.status).to.eq(201)
          expect(response.body).has.property('job', '')
          expect(response.body).has.property('name', 'this.UserDataJson.name')
        })
      })

      it('Create new user providing only data into job field', () => {    
        cy.request({
          method: 'POST',
          url: BaseURLUsers,
          body: {
            "job": "this.UserDataJson.job"            
          }
        }).then((response)=>{
          //assertion
          expect(response.status).to.eq(201)
          expect(response.body).has.property('job', 'this.UserDataJson.job')
          expect(response.body.name).not.exist
        })
      })

      it('Create new user providing only data into name field', () => {    
        cy.request({
          method: 'POST',
          url: BaseURLUsers,
          body: {
            "name": "this.UserDataJson.name"            
          }
        }).then((response)=>{
          //assertion
          expect(response.status).to.eq(201)
          expect(response.body).has.property('name', 'this.UserDataJson.name')
          expect(response.body.job).not.exist
        })
      })

  })