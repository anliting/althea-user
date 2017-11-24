import{Site,dom,general}from'/lib/core.static.js'
import Edituser from'./Edituser.js'
let site=new Site
async function createEdituserView(){
    return(new Edituser(site)).view
}
general()
site.on('userChange',()=>
    location='/'
)
;(async()=>{
    dom.head(Edituser.style)
    dom.body(await createEdituserView())
})()
