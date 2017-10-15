import{Site,dom}from'/lib/core.static.js'
import style from'./register/style.js'
import Register from'./Register.js'
let
    site=new Site,
    register=new Register(Promise.resolve(site))
register.on('register',async e=>{
    await site.login(e.username,e.password)
    location=''
})
dom.head(
    dom.style(style),
    Register.style
)
dom.body(
    dom.div({className:'main'},
        dom.h1('Register'),
        dom.p(`This web page explains the user system of this
            website and provides a interface for registering.
        `),
        register.explanationUi,
        dom.p(`The registering process starts here. Just input the
            username and password, and then submit.
        `),
        register.ui.node
    )
)
