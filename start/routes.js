'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//index
Route.on('/').render('index')

Route.on('/signup').render('auth.signup')
Route.post('/signup', 'UserController.create').validator('CreateUser')


Route.on('/login').render('auth.login')
Route.post('/login','UserController.login').validator('LoginUser')


Route.get('/logout', async({auth, response})=>{
    await auth.logout()
    return response.redirect('/login')
})

Route.on('/add-user').render('add-user')
Route.get('/user-list','UserController.showAll')

Route.get('/user-list/delete/:id', 'UserController.delete')

// Route.on('/user-list/edit/:id').render('edit-user')
Route.get('/user-list/edit/:id', 'UserController.edit')
Route.post('/user-list/update/:id', 'UserController.update')