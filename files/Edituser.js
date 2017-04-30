Promise.all([
    module.shareImport('Edituser/prototype.view.js'),
    module.style('Edituser/edituser.css'),
]).then(modules=>{
    function Edituser(site){
        this._site=site
        this._site.then(site=>
            site.loadPlugins('edituser',s=>eval(s))
        )
    }
    Object.defineProperty(Edituser.prototype,'view',modules[0])
    Edituser.style=modules[1]
    return Edituser
})
