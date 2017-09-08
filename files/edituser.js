;(async()=>{
    ;(await module.importByPath('lib/general.static.js',{mode:1}))(module)
    let
        sitePromise=module.repository.althea.site,
        Edituser=module.shareImport('Edituser.js')
    ;(async()=>{
        let site=await sitePromise
        site.on('userChange',()=>
            location='/'
        )
    })()
    ;(async()=>{
        let dom
        ;[
            dom,
            Edituser,
        ]=await Promise.all([
            module.repository.althea.dom,
            Edituser,
        ])
        dom.head(Edituser.style)
        dom.body(await createEdituserView(Edituser,sitePromise))
    })()
})()
async function createEdituserView(Edituser,site){
    Edituser=await Edituser
    let edituser=new Edituser(site)
    return edituser.view
}
