const existTags = ['餐饮','购物','家居','水果','学习','房租','工资','兼职','理财','礼金'];
function findTagName(name:String){
    for(let i=0;i<existTags.length;i++){
        if(name === existTags[i]){
            return name
        }else{
            return name = '星星'
        }
    }
    console.log(name);
}
export default findTagName