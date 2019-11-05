'use strict'
const User = use('App/Models/User')

class UserController {
    async create({request, response, auth}){
        const user = await User.create(request.only([
            'username',
            'email',
            'password'
        ]))
        // await auth.login(user)
        return response.redirect('/user-list')
    }

    async login({request, response, session, auth}){
        const {email, password} = request.all()

        try{
            await auth.attempt(email, password)
            return response.redirect('/user-list')
        }catch(error){
            session.flash({loginError: 'These credentials do not exists.'})
            return response.redirect('/login')
        }
    }

    async showAll({auth, view}){
        // const user = await auth.user().fetch()  
        // return view.render('users', {users: users.toJSON()})
        const users = await User.all()
        return view.render('user-list', {users: users.toJSON()})
    }


    async delete({response, session, params}){
        const user = await User.find(params.id)
        await user.delete()

        session.flash({message: 'User has been removed!'})
        return response.redirect('back')
    }

    async edit({view, params}){
        const user = await User.find(params.id)
        return view.render('edit-user', {user:user})
    }

    async update({request, response, session, params}){
        const user = await User.find(params.id)
        user.username = request.all().username,
        user.email = request.all().email,
        user.password = request.all().password

        await user.save()
        session.flash({ message: 'User has been removed!' })
        return response.redirect('back')


    }
}

module.exports = UserController
