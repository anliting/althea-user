import core from '/lib/core.static.js'
let{dom}=core
function createNode(){
    return dom.div({className:'register'},
        dom.div({className:'block'},
            dom.div({className:'formFirst'},
                dom.p(
                    'Username: ',
                    this._input_username=dom.input()
                )
            ),
            dom.div({className:'formSecond'},
                this._span_status_username_validity=dom.span(),
                dom.br(),
                this._span_status_username_availability=dom.span()
            )
        ),
        dom.div({className:'block'},
            dom.div({className:'formFirst'},
                dom.p(
                    'Password: ',
                    this._input_password=dom.input({type:'password'})
                )
            ),
            dom.div({className:'formSecond'})
        ),
        dom.div({className:'block'},
            dom.div({className:'formFirst'},
                dom.p(
                    'Confirm password: ',
                    this._input_confirmpassword=
                        dom.input({type:'password'})
                )
            ),
            dom.div({className:'formSecond'},
                this._span_status_confirmpassword=dom.span()
            )
        ),
        this._submitButton=dom.button('Submit')
    )
}
export default createNode
