import{doe}from '/lib/core.static.js'
import view from './Edituser/prototype.view.js'
import style from './Edituser/style.js'
function Edituser(site){
    this._site=site
    this._site.applyPlugins('edituser',this)
}
Object.defineProperty(Edituser.prototype,'view',view)
Edituser.style=doe.style(style)
export default Edituser
