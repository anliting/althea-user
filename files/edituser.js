(async()=>{
    (await module.importByPath('lib/general.static.js',{mode:1}))(module)
    let site=module.repository.althea.site
    site.then(site=>
        site.on('userChange',()=>
            location='/'
        )
    )
    let Edituser=module.shareImport('Edituser.js')
    ;(async()=>{
        Edituser=await Edituser
        document.head.appendChild(Edituser.style)
    })()
    let order=await module.repository.althea.order
    order([
        createEdituserView(Edituser,site),
    ],(a,b)=>
        document.body.insertBefore(a,b)
    ,e=>
        document.body.appendChild(e)
    )
})()
async function createEdituserView(Edituser,site){
    Edituser=await Edituser
    let edituser=new Edituser(site)
    return edituser.view
}
