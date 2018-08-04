import{Site,doe}from'/lib/core.static.js'
import style from'./register/style.js'
import Register from'./Register.js'
let
    site=new Site,
    register=new Register(site)
register.on('register',async e=>{
    await site.login(e.username,e.password)
    location=''
})
doe.head(
    doe.style(style),
    Register.style
)
doe.body(
    doe.div({className:'main'},
        doe.h1('Register'),
        doe.p(`This web page explains the user system of this
            website and provides a interface for registering.
        `),
        register.explanationUi,
        doe.p(`The registering process starts here. Just input the
            username and password, and then submit.
        `),
        register.ui.node
    )
)
