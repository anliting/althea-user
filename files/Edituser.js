import{dom}from '/lib/core.static.js'
import view from './Edituser/prototype.view.js'
import style from './Edituser/style.js'
function Edituser(site){
    this._site=site
    ;(async()=>{
        this._site=await this._site
        this._site.loadPlugins('edituser',s=>eval(s))
    })()
}
Object.defineProperty(Edituser.prototype,'view',view)
Edituser.style=dom.style(style)
export default Edituser
