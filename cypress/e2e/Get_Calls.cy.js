//const cypress = require("cypress")
/// <reference types="Cypress" />

describe('All test cases for GET APIs', () => {

  let BaseURLUsers = 'https://reqres.in/api/users/'
  let BaseURLResources = 'https://reqres.in/api/unknown/'

  it('Get all user list and status code must be 200', () => {    
    cy.request({
      method: 'GET',
      url: BaseURLUsers
    }).then((response)=>{
      //assertion to verify status code
      expect(response.status).to.eq(200)
      expect(response.body).to.exist
    })
  })

  it('Get single user by given ID', () => {    
    cy.request({
      method: 'GET',
      url: BaseURLUsers + '2'
    }).then((response)=>{
      //assertion to verify status code
      expect(response.status).to.eq(200)
      expect(response.body).to.exist
      expect(response.body.data.first_name).to.eq('Janet')
      
    })
  })

  it('Single user not found and status code=400', () => {    
    cy.request({
      method: 'GET',
      failOnStatusCode: false,
      url: BaseURLUsers + '290'
    }).then((response)=>{
      //assertion to verify status code
      expect(response.status).to.eq(404)
      expect(response.body).to.exist
    })    
  })

  it('Get list resource and status code=200', () => {    
    cy.request({
      method: 'GET',
      failOnStatusCode: false,
      url: BaseURLResources
    }).then((response)=>{
      //assertion to verify status code
      expect(response.status).to.eq(200)      
    })    
  })

  it('Get single resource and status code=200', () => {    
    cy.request({
      method: 'GET',
      failOnStatusCode: false,
      url: BaseURLResources + '2'
    }).then((response)=>{
      //assertion to verify status code
      expect(response.status).to.eq(200)  
      expect(response.body.data.name).to.eq('fuchsia rose')    
    })    
  })

  it('Get resource not found and status code=204', () => {    
    cy.request({
      method: 'GET',
      failOnStatusCode: false,
      url: BaseURLResources + '299'
    }).then((response)=>{
      //assertion to verify status code
      expect(response.status).to.eq(404)
    })    
  })
})