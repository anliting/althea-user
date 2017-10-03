let style=module.style('register.css')
;(async()=>{
    (await module.importByPath('lib/general.js',{mode:1}))(module)
    let dom=module.repository.althea.dom
    let Register=await module.shareImport('Register.js')
    let register=new Register(module.repository.althea.site)
    register.on('register',async e=>{
        let site=await module.repository.althea.site
        await site.login(e.username,e.password)
        location=''
    })
    dom=await dom
    dom.head(await style,Register.style)
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
})()
