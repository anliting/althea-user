(async()=>{
    let[
        dom,
        Checker,
        updater,
        View,
    ]=await Promise.all([
        module.repository.althea.dom,
        module.shareImport('Checker.js'),
        module.shareImport('updater.js'),
        module.shareImport('View.js'),
    ])
    return{get(){
        let
            edituser=this,
            checker,
            view=new View
        this._site.then(site=>
            site.currentUser
        ).then(cu=>
            cu.load(['username','nickname'])
        ).then(currentUser=>{
            checker=new Checker(this,currentUser)
            view.input_username.value=currentUser.username
            view.input_username.removeAttribute('disabled')
            view.input_nickname.value=currentUser.nickname
            view.input_nickname.removeAttribute('disabled')
            view.input_submit.removeAttribute('disabled')
        })
        view.input_username.addEventListener('input',()=>{
            let
                s=input_username.value,
                valid=checker.isValidUsername(s)
            updater.updateUsernameVadility(
                view.span_status_username_validity,s.length,valid?1:0
            )
            if(!valid)
                return
            updater.updateUsernameAvailability(
                view.span_status_username_availability,
                0
            )
            let sb=Symbol()
            this._lastUsernameAvailabilityChecking=sb
            checker.isAvailableUsername(s).then(isAvailable=>{
                if(this._lastUsernameAvailabilityChecking!=sb)
                    return
                updater.updateUsernameAvailability(
                    view.span_status_username_availability,
                    isAvailable?2:1
                )
            })
        })
        view.input_nickname.addEventListener('input',()=>{
            updater.updateNicknameValidity(
                view.span_status_nickname_validity,
                checker.isValidNickname(view.input_nickname.value)?1:0
            )
        })
        view.input_password.addEventListener('input',()=>{
            checkPasswordValidity()
        })
        view.input_confirmpassword.addEventListener('input',()=>{
            checkPasswordValidity()
        })
        view.input_ischangepassword.addEventListener('change',()=>{
            view.tr_password.style.display=
            view.tr_confirmpassword.style.display=
                view.input_ischangepassword.checked?
                    'table-row'
                :
                    'none'
        })
        view.form.addEventListener('submit',e=>{
            e.preventDefault()
            let data={
                username:view.input_username.value,
                nickname:view.input_nickname.value,
            }
            if(view.input_ischangepassword.checked)
                data.password=view.input_password.value
            edituser._site.then(site=>
                site.send({
                    function:'updateUser',
                    set:data,
                })
            ).then(res=>{
                // to-do: recheck username if failed
                location='/'
            })
        })
        return dom('div')
        function checkPasswordValidity(){
            let valid=view.input_password.value==view.input_confirmpassword.value
            updater.updatePasswordValidity(
                view.span_status_confirmpassword,
                valid?1:0
            )
        }
        function checkSubmitAvalibality(){
        }
    }}
})()
