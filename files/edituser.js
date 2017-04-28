(async()=>{
    (await module.importByPath('lib/general.static.js',{mode:1}))(module)
    let site=module.repository.althea.site
    site.then(site=>
        site.on('userChange',()=>
            location='/'
        )
    )
    module.repository.althea.Edituser.then(Edituser=>
        document.head.appendChild(Edituser.style)
    )
    let order=await module.repository.althea.order
    order([
        createEdituserView(site),
        createNavigationbarView(site),
    ],(a,b)=>
        document.body.insertBefore(a,b)
    ,e=>
        document.body.appendChild(e)
    )
})()
async function createEdituserView(site){
    let Edituser=await module.repository.althea.Edituser
    let edituser=new Edituser(site)
    return edituser.view
}
async function createNavigationbarView(site){
    let Navigationbar=await module.repository.althea.Navigationbar
    let navigationbar=new Navigationbar(site)
    await navigationbar.load
    return navigationbar.view
}
