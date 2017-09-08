;(async()=>{
    let[
        view,
        style,
    ]=await Promise.all([
        module.shareImport('Edituser/prototype.view.js'),
        module.style('Edituser/edituser.css'),
    ])
    function Edituser(site){
        this._site=site
        ;(async()=>{
            this._site=await this._site
            this._site.loadPlugins('edituser',s=>eval(s))
        })()
    }
    Object.defineProperty(Edituser.prototype,'view',view)
    Edituser.style=style
    return Edituser
})()
