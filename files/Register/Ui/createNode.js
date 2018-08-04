import{doe}from '/lib/core.static.js'
function createNode(){
    return doe.div({className:'register'},
        doe.div({className:'block'},
            doe.div({className:'formFirst'},
                doe.p(
                    'Username: ',
                    this._input_username=doe.input()
                )
            ),
            doe.div({className:'formSecond'},
                this._span_status_username_validity=doe.span(),
                doe.br(),
                this._span_status_username_availability=doe.span()
            )
        ),
        doe.div({className:'block'},
            doe.div({className:'formFirst'},
                doe.p(
                    'Password: ',
                    this._input_password=doe.input({type:'password'})
                )
            ),
            doe.div({className:'formSecond'})
        ),
        doe.div({className:'block'},
            doe.div({className:'formFirst'},
                doe.p(
                    'Confirm password: ',
                    this._input_confirmpassword=
                        doe.input({type:'password'})
                )
            ),
            doe.div({className:'formSecond'},
                this._span_status_confirmpassword=doe.span()
            )
        ),
        this._submitButton=doe.button('Submit')
    )
}
export default createNode
