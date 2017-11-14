import{Site,dom,general,load}from'/lib/core.static.js'
let site=new Site
general()
async function createMain(cu,u){
    return dom.div(
        {className:'althea main'},
        await(await u).createUi(await cu),
        dom.p({innerHTML:`<a href=>Return to the homepage.</a>`}),
    )
}
;(async()=>{
    let module=await load.module()
    site.loadPlugins0('user',this)
    dom.body(await createMain(
        site.currentUser,
        site.getUser(arg)
    ))
})()
