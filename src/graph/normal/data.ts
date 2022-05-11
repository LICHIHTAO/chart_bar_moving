export interface datatype {
    name : string
    value?: number
    children : Iterable<datatype>[]
}


export let data =[{
    name:"경기도",
    children:[{
        name: "11.2",
        value: 2000
    },{
        name: "11.3",
        value: 3000
    },{
        name: "11.4",
        value: 4000
    },{
        name: "11.5",
        value: 5000
    },{
        name: "11.6",
        value: 6000
    }]
}, {
    name:"세종",
    children:[{
        name: "11.2",
        value: 2000
    },{
        name: "11.3",
        value: 2000
    },{
        name: "11.4",
        value: 2000
    },{
        name: "11.5",
        value: 2000
    },{
        name: "11.6",
        value: 2000
    }]
}, {
    name:"충남",
    children:[{
        name: "11.2",
        value: 1000
    },{
        name: "11.3",
        value: 1000
    },{
        name: "11.4",
        value: 1000
    },{
        name: "11.5",
        value: 1000
    },{
        name: "11.6",
        value: 1000
    }]
}]