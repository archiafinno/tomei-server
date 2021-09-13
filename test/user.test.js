const app = require('../app.js')
const request = require('supertest')
const { sequelize, User } = require('../src/models')
const { queryInterface } = sequelize
const { encryptPassword } = require('../src/utils/bcrypt')

let dummyUser = {
  name: 'mike',
  password: 'tes1234',
  email: 'mike@mail.com',
  avatar: 'avatar/1631524340751.jpg'
}

afterAll((done) => {
  queryInterface.bulkDelete('Users')
    .then(() => {
        console.log(`Db clean up`)
        done()
    })
    .catch(err => {
        done(err)
    })
})

describe('User Router', () => {
  describe('POST/users/sign-up', () => {
    describe('success signup', () => {
      test('should return status 201', (done) => {
        request(app)
        .post('/users/sign-up')
        .field('name', 'Ninno')
        .field('email', 'tomei@yopmail.com')
        .field('password', encryptPassword('tes1234'))
        .attach('avatar', './assets/avatar-test/room.jpg')
        .end((err, res) => {
          if(err){
            return done(err)
          }
          else {
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('id', expect.any(Number));
            expect(res.body).toHaveProperty('name', 'Ninno');
            expect(res.body).toHaveProperty('email', 'tomei@yopmail.com');
            expect(res.body).toHaveProperty('avatar', expect.any(String));
            expect(res.body).not.toHaveProperty('password');
            return done()
          }
        })
      })
    }) 

    describe('error signup', () => {
      beforeAll(() => { User.create(dummyUser) })

      test('should return error 400 because email is not unique', (done) => {
        const errors = [{ message: 'users.email must be unique' }]  

        request(app)
        .post('/users/sign-up')
        .field('name', 'Ninno')
        .field('email', 'tomei@yopmail.com')
        .field('password', encryptPassword('tes1234'))
        .attach('avatar', './assets/avatar-test/room.jpg')
        .end((err, res) => {
          if(err){
            return done(err)
          } else{
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('errors', errors);
            return done()
          }
        })
      })

      test('should return error with status 400 because wrong email format', (done) => {
        const errors = [{ message: 'your email format is wrong' }] 

        request(app)
        .post('/users/sign-up')
        .field('name', 'Ninno')
        .field('email', 'tomei')
        .field('password', encryptPassword('tes1234'))
        .attach('avatar', './assets/avatar-test/room.jpg')
        .end((err, res) => {
          if(err){
            return done(err)
          }
          else {
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('errors', errors);
            return done()
          }
        })
      })

      test('should return error 400 because missing name', (done) => {
        const errors = [{ message: 'name is required' }] 

        request(app)
        .post('/users/sign-up')
        .field('email', 'tomei@yopmail.com')
        .field('password', encryptPassword('tes1234'))
        .attach('avatar', './assets/avatar-test/room.jpg')
        .end((err, res) => {
          if(err){
            return done(err)
          }
          else {
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('errors', errors);
            return done()
          }
        })
      })
      test('should return error 400 because missing email', (done) => {
        const errors = [{ message: 'email is required' }] 

        request(app)
        .post('/users/sign-up')
        .field('name', 'Ninno')
        .field('password', encryptPassword('tes1234'))
        .attach('avatar', './assets/avatar-test/room.jpg')
        .end((err, res) => {
          if(err){
            return done(err)
          }
          else {
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('errors', errors);
            return done()
          }
        })
      })

      test('should return error 400 because missing password', (done) => {
        const errors = [{ message: 'password is required' }] 

        request(app)
        .post('/users/sign-up')
        .field('name', 'Ninno')
        .field('email', 'tomei@yopmail.com')
        .attach('avatar', './assets/avatar-test/room.jpg')
        .end((err, res) => {
          if(err){
            return done(err)
          }
          else {
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('errors', errors);
            return done()
          }
        })
      })

      test('should return error 400 because missing avatar', (done) => {
        const errors = { message: 'Avatar is required' } 

        request(app)
        .post('/users/sign-up')
        .field('name', 'Ninno')
        .field('email', 'tomei@yopmail.com')
        .field('password', encryptPassword('tes1234'))
        .end((err, res) => {
          if(err){
            return done(err)
          }
          else {
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('errors', errors);
            return done()
          }
        })
      })
    })
  })
})