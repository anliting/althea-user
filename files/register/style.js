export default`div.main{
    margin:0 auto;
    width:600px;
    max-width:100%;
}
div.main>p{
    text-align:justify;
}
@media(max-width:480px){
    div.register div.block{
        margin:48px 0;
    }
}
@media(min-width:480px){
    div.register div.block{
        display:table-row;
    }
    div.register div.formFirst{
        display:table-cell;
        padding-right:8px;
    }
    div.register div.formSecond{
        display:table-cell;
        padding-left:8px;
    }
}
`
