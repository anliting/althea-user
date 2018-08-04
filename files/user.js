import{Site,doe,general,load}from'/lib/core.static.js'
let site=new Site
general()
async function createMain(cu,u){
    return doe.div(
        {className:'althea main'},
        await(await u).createUi(await cu),
        doe.p({innerHTML:`<a href=>Return to the homepage.</a>`}),
    )
}
;(async()=>{
    let module=await load.module()
    site.applyPlugins('user',this)
    doe.body(await createMain(
        site.currentUser,
        site.getUser(arg)
    ))
})()
