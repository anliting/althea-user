export default{
    updateUsernameVadility(span,length,status){
        let message=[
            '<span style=color:red>invalid</span>.',
            '<span style=color:green>valid</span>.',
        ]
        span.innerHTML=`
            ${length} characters, ${message[status]}
        `
    },
    updateUsernameAvailability(span,status){
        let message=[
            '<span style=color:blue>checking ...</span>',
            '<span style=color:red>This username cannot be used.</span>',
            '<span style=color:green>This username can be used.</span>',
        ]
        span.innerHTML=
            message[status]
    },
    updateNicknameValidity(span,status){
        let message=[
            '<span style=color:red>invalid</span>.',
            '<span style=color:green>valid</span>.',
        ]
        span.innerHTML=`
            ${input_nickname.value.length} characters, ${
                message[status]
            }
        `
    },
    updatePasswordValidity(span,status){
        let message=[
            '<span style=color:red>invalid</span>.',
            '<span style=color:green>valid</span>.',
        ]
        span.innerHTML=message[status]
    }
}
