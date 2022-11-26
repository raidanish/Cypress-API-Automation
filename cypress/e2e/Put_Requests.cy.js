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
    let UserID = 2
  
    it('Update single user', () => {    
      cy.request({
        method: 'PUT',
        url: BaseURLUsers + UserID,
        body: {
            "job": "this.UserDataJson.UpdatedJob",
            "name": "this.UserDataJson.UpdatedName"            
        }
      }).then((response)=>{
        //assertion
        expect(response.status).to.eq(200)
        expect(response.body).has.property('job', 'this.UserDataJson.UpdatedJob')
        expect(response.body).has.property('name', 'this.UserDataJson.UpdatedName')
      })
    })


  })