(async()=>{
    (await module.importByPath('lib/general.js',{mode:1}))(module)
    let site=await module.repository.althea.site
    site.loadPlugins('user',v=>eval(v))
    let dom=await module.repository.althea.dom
    dom(document.body,await createMain(
        site.currentUser,
        site.getUser(module.arguments)
    ))
    async function createMain(cu,u){
        return dom('div',
            await(await u).createUi(await cu),
            dom('p',{innerHTML:`<a href=>Return to the homepage.</a>`}),
            {className:'althea main'}
        )
    }
})()
