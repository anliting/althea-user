import{Site,doe,general}from'/lib/core.static.js'
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
    doe.head(Edituser.style)
    doe.body(await createEdituserView())
})()
