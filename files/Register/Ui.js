import createNode from './Ui/createNode.js'
function Ui(site){
    this._site=site
    this.node=createNode.call(this)
    let
        isavailable_usernames=[],
        input_username=this._input_username,
        input_password=this._input_password,
        input_confirmpassword=this._input_confirmpassword,
        span_status_username_validity=
            this._span_status_username_validity,
        span_status_username_availability=
            this._span_status_username_availability,
        span_status_confirmpassword=
            this._span_status_confirmpassword,
        submitButton=this._submitButton
    input_username.addEventListener('input',e=>{
        isvalid_username()
            &&isavailable_username(e)
    })
    input_password.addEventListener('input',()=>{
        isvalid_confirmpassword()
    })
    input_confirmpassword.addEventListener('input',()=>{
        isvalid_confirmpassword()
    })
    submitButton.onclick=e=>{
        e.preventDefault()
        if(!(
            isvalid_username()&&
            isavailable_username(e)&&
            isvalid_confirmpassword()
        ))
            return
        let
            username=input_username.value,
            password=input_password.value
        this.register(
            input_username.value,
            input_password.value
        ).catch(()=>{
            isavailable_usernames[input_username.value]=undefined
            isavailable_username()
        })
    }
    function isvalid_username(){
        let
            isvalid=input_username.value.match(/^[0-9a-z]{1,16}$/)
        span_status_username_validity.innerHTML=
            input_username.value.length+' characters, '+(isvalid
            ?'<span style=color:green>valid</span>.'
            :'<span style=color:red>invalid</span>.')
        return isvalid
    }
    function isavailable_username(e){
        if(isavailable_usernames[input_username.value]===undefined){
            {
                let username=input_username.value
                ;(async()=>{
                    let
                        id=await(await site).send({
                            function:'getUserByUsername',
                            username,
                        })
                    isavailable_usernames[username]=id==undefined
                    isavailable_username(e)
                })()
            }
            span_status_username_availability.innerHTML=
                '<span style=color:blue>checking...</span>'
            if(e)
                e.preventDefault()
            return
        }
        span_status_username_availability.innerHTML=
            isavailable_usernames[input_username.value]
            ?'<span style=color:green>This username has not been used.</span>'
            :'<span style=color:red>This username has been used.</span>'
        return isavailable_usernames[input_username.value]
    }
    function isvalid_confirmpassword(){
        let
            isvalid=input_password.value===input_confirmpassword.value
        span_status_confirmpassword.innerHTML=isvalid?
            '<span style=color:green>valid</span>.'
        :
            '<span style=color:red>invalid</span>.'
        return isvalid
    }
}
export default Ui
