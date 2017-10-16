import{Site,dom,general}from'/lib/core.static.js'
import Edituser from'./Edituser.js'
let site=new Site
async function createEdituserView(Edituser,site){
    Edituser=await Edituser
    let edituser=new Edituser(site)
    return edituser.view
}
general()
site.on('userChange',()=>
    location='/'
)
;(async()=>{
    dom.head(Edituser.style)
    dom.body(await createEdituserView(Edituser,Promise.resolve(site)))
})()
