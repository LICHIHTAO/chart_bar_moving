export interface margintype {
    top: number;
    bottom: number;
    left: number;
    right:number;
    middle:number;
}

// export interface StackDatum{
//     "major": string;
//     "submajor": string;
//     "sex":string;
//     "age":string;
//     "value":number;
//     "<5":number;
//     "5-9":number;
//     "10-14":number;
//     "15-19":number;
//     "20-24":number;
//     "25-29":number;
//     "30-34":number;
//     "35-39":number;
//     "40-44":number;
//     "45-49":number;
//     "50-54":number;
//     "55-59":number;
//     "60-64":number;
//     "65-69":number;
//     "70-74":number;
//     "75-79":number;
//     "80-84":number;
//     "≥85":number;
// }


// export let data1: StackDatum[] =[
//     {"major":"Engineering", "submajor":"Math", "sex":"Male", "<5":3391904, "5-9":3490049, "10-14":3520624,"15-19":3647541, 
//     "20-24":3858804, "25-29":3663199, "30-34":3541930, "35-39":3299856,"40-44":3443662, "45-49":3523995, "50-54":3683803, 
//     "55-59":3391215, "60-64":2941617, "65-69":2292090, "70-74":1622504, "75-79":1138811, "80-84":792897, "≥85":666924},

//     {"major":"Engineering", "submajor":"Math", "sex":"Female", "<5":3245435, "5-9":3343945,"10-14":3372638,
//     "15-19":3470619, "20-24":3675940, "25-29":3569471, "30-34":3519283, "35-39":3318738, "40-44":3488381, 
//     "45-49":3599461, "50-54":3824694, "55-59":3609434, "60-64":3196943, "65-69":2557058, "70-74":1906736, "75-79":1437899, "80-84":1144246, "≥85":1312660},

//     {"major":"Engineering", "submajor":"Game", "sex":"Male", "<5":3391904, "5-9":3490049, "10-14":3520624,"15-19":3647541, 
//     "20-24":3858804, "25-29":3663199, "30-34":3541930, "35-39":3299856,"40-44":3443662, "45-49":3523995, "50-54":3683803, 
//     "55-59":3391215, "60-64":2941617, "65-69":2292090, "70-74":1622504, "75-79":1138811, "80-84":792897, "≥85":666924},


//     {"major":"Engineering", "submajor":"Game", "sex":"Female", "<5":3245435, "5-9":3343945,"10-14":3372638,
//     "15-19":3470619, "20-24":3675940, "25-29":3569471, "30-34":3519283, "35-39":3318738, "40-44":3488381, 
//     "45-49":3599461, "50-54":3824694, "55-59":3609434, "60-64":3196943, "65-69":2557058, "70-74":1906736, "75-79":1437899, "80-84":1144246, "≥85":1312660},

//     {"major":"Engineering", "submajor":"Engineer", "sex":"Male", "<5":3391904, "5-9":3490049, "10-14":3520624,"15-19":3647541, 
//     "20-24":3858804, "25-29":3663199, "30-34":3541930, "35-39":3299856,"40-44":3443662, "45-49":3523995, "50-54":3683803, 
//     "55-59":3391215, "60-64":2941617, "65-69":2292090, "70-74":1622504, "75-79":1138811, "80-84":792897, "≥85":666924},

//     {"major":"Engineering", "submajor":"Engineer", "sex":"Female", "<5":3245435, "5-9":3343945,"10-14":3372638,
//     "15-19":3470619, "20-24":3675940, "25-29":3569471, "30-34":3519283, "35-39":3318738, "40-44":3488381, 
//     "45-49":3599461, "50-54":3824694, "55-59":3609434, "60-64":3196943, "65-69":2557058, "70-74":1906736, "75-79":1437899, "80-84":1144246, "≥85":1312660}
  
// ]


// export let data1: StackDatum[] =[
//     {"major":"Engineering", "submajor":"Math", "sex":"Male", "age":"<5", "value":3391904},
//     {"major":"Engineering", "submajor":"Math", "sex":"Male", "age":"5-9","value":3490049},
//     {"major":"Engineering", "submajor":"Math", "sex":"Male", "age":"10-14","value":3520624},
//     {"major":"Engineering", "submajor":"Math", "sex":"Male", "age":"15-19","value":3647541},
//     {"major":"Engineering", "submajor":"Math", "sex":"Male", "age":"20-24","value":3858804},
//     {"major":"Engineering", "submajor":"Math", "sex":"Male", "age":"25-29","value":3663199},
//     {"major":"Engineering", "submajor":"Math", "sex":"Male", "age":"30-34","value":3541930},
//     {"major":"Engineering", "submajor":"Math", "sex":"Male", "age":"35-39","value":3299856},
//     {"major":"Engineering", "submajor":"Math", "sex":"Male", "age":"40-44","value":3443662},
//     {"major":"Engineering", "submajor":"Math", "sex":"Male", "age":"45-49","value":3523995},
//     {"major":"Engineering", "submajor":"Math", "sex":"Male", "age":"50-54","value":3683803},
//     {"major":"Engineering", "submajor":"Math", "sex":"Male", "age":"55-59","value":3391215},
//     {"major":"Engineering", "submajor":"Math", "sex":"Male", "age":"60-64","value":2941617},
//     {"major":"Engineering", "submajor":"Math", "sex":"Male", "age":"65-69","value":2292090},
//     {"major":"Engineering", "submajor":"Math", "sex":"Male", "age":"70-74","value":1622504},
//     {"major":"Engineering", "submajor":"Math", "sex":"Male", "age":"75-79","value":1138811},
//     {"major":"Engineering", "submajor":"Math", "sex":"Male", "age":"80-84","value":792897},
//     {"major":"Engineering", "submajor":"Math", "sex":"Male", "age":"≥85","value":666924},
//     {"major":"Engineering", "submajor":"Math", "sex":"Female", "age":"<5","value":3245435},
//     {"major":"Engineering", "submajor":"Math", "sex":"Female", "age":"5-9","value":3343945},
//     {"major":"Engineering", "submajor":"Math", "sex":"Female", "age":"10-14","value":3372638},
//     {"major":"Engineering", "submajor":"Math", "sex":"Female", "age":"15-19","value":3470619},
//     {"major":"Engineering", "submajor":"Math", "sex":"Female", "age":"20-24","value":3675940},
//     {"major":"Engineering", "submajor":"Math", "sex":"Female", "age":"25-29","value":3569471},
//     {"major":"Engineering", "submajor":"Math", "sex":"Female", "age":"30-34","value":3519283},
//     {"major":"Engineering", "submajor":"Math", "sex":"Female", "age":"35-39","value":3318738},
//     {"major":"Engineering", "submajor":"Math", "sex":"Female", "age":"40-44","value":3488381},
//     {"major":"Engineering", "submajor":"Math", "sex":"Female", "age":"45-49","value":3599461},
//     {"major":"Engineering", "submajor":"Math", "sex":"Female", "age":"50-54","value":3824694},
//     {"major":"Engineering", "submajor":"Math", "sex":"Female", "age":"55-59","value":3609434},
//     {"major":"Engineering", "submajor":"Math", "sex":"Female", "age":"60-64","value":3196943},
//     {"major":"Engineering", "submajor":"Math", "sex":"Female", "age":"65-69","value":2557058},
//     {"major":"Engineering", "submajor":"Math", "sex":"Female", "age":"70-74","value":1906736},
//     {"major":"Engineering", "submajor":"Math", "sex":"Female", "age":"75-79","value":1437899},
//     {"major":"Engineering", "submajor":"Math", "sex":"Female", "age":"80-84","value":1144246},
//     {"major":"Engineering", "submajor":"Math", "sex":"Female", "age":"≥85","value":1312660},
//     {"major":"Engineering", "submajor":"Game", "sex":"Male", "age":"<5", "value":3391904},
//     {"major":"Engineering", "submajor":"Game", "sex":"Male", "age":"5-9","value":3490049},
//     {"major":"Engineering", "submajor":"Game", "sex":"Male", "age":"10-14","value":3520624},
//     {"major":"Engineering", "submajor":"Game", "sex":"Male", "age":"15-19","value":3647541},
//     {"major":"Engineering", "submajor":"Game", "sex":"Male", "age":"20-24","value":3858804},
//     {"major":"Engineering", "submajor":"Game", "sex":"Male", "age":"25-29","value":3663199},
//     {"major":"Engineering", "submajor":"Game", "sex":"Male", "age":"30-34","value":3541930},
//     {"major":"Engineering", "submajor":"Game", "sex":"Male", "age":"35-39","value":3299856},
//     {"major":"Engineering", "submajor":"Game", "sex":"Male", "age":"40-44","value":3443662},
//     {"major":"Engineering", "submajor":"Game", "sex":"Male", "age":"45-49","value":3523995},
//     {"major":"Engineering", "submajor":"Game", "sex":"Male", "age":"50-54","value":3683803},
//     {"major":"Engineering", "submajor":"Game", "sex":"Male", "age":"55-59","value":3391215},
//     {"major":"Engineering", "submajor":"Game", "sex":"Male", "age":"60-64","value":2941617},
//     {"major":"Engineering", "submajor":"Game", "sex":"Male", "age":"65-69","value":2292090},
//     {"major":"Engineering", "submajor":"Game", "sex":"Male", "age":"70-74","value":1622504},
//     {"major":"Engineering", "submajor":"Game", "sex":"Male", "age":"75-79","value":1138811},
//     {"major":"Engineering", "submajor":"Game", "sex":"Male", "age":"80-84","value":792897},
//     {"major":"Engineering", "submajor":"Game", "sex":"Male", "age":"≥85","value":666924},
//     {"major":"Engineering", "submajor":"Game", "sex":"Female", "age":"<5","value":3245435},
//     {"major":"Engineering", "submajor":"Game", "sex":"Female", "age":"5-9","value":3343945},
//     {"major":"Engineering", "submajor":"Game", "sex":"Female", "age":"10-14","value":3372638},
//     {"major":"Engineering", "submajor":"Game", "sex":"Female", "age":"15-19","value":3470619},
//     {"major":"Engineering", "submajor":"Game", "sex":"Female", "age":"20-24","value":3675940},
//     {"major":"Engineering", "submajor":"Game", "sex":"Female", "age":"25-29","value":3569471},
//     {"major":"Engineering", "submajor":"Game", "sex":"Female", "age":"30-34","value":3519283},
//     {"major":"Engineering", "submajor":"Game", "sex":"Female", "age":"35-39","value":3318738},
//     {"major":"Engineering", "submajor":"Game", "sex":"Female", "age":"40-44","value":3488381},
//     {"major":"Engineering", "submajor":"Game", "sex":"Female", "age":"45-49","value":3599461},
//     {"major":"Engineering", "submajor":"Game", "sex":"Female", "age":"50-54","value":3824694},
//     {"major":"Engineering", "submajor":"Game", "sex":"Female", "age":"55-59","value":3609434},
//     {"major":"Engineering", "submajor":"Game", "sex":"Female", "age":"60-64","value":3196943},
//     {"major":"Engineering", "submajor":"Game", "sex":"Female", "age":"65-69","value":2557058},
//     {"major":"Engineering", "submajor":"Game", "sex":"Female", "age":"70-74","value":1906736},
//     {"major":"Engineering", "submajor":"Game", "sex":"Female", "age":"75-79","value":1437899},
//     {"major":"Engineering", "submajor":"Game", "sex":"Female", "age":"80-84","value":1144246},
//     {"major":"Engineering", "submajor":"Game", "sex":"Female", "age":"≥85","value":1312660},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Male", "age":"<5", "value":3391904},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Male", "age":"5-9","value":3490049},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Male", "age":"10-14","value":3520624},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Male", "age":"15-19","value":3647541},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Male", "age":"20-24","value":3858804},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Male", "age":"25-29","value":3663199},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Male", "age":"30-34","value":3541930},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Male", "age":"35-39","value":3299856},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Male", "age":"40-44","value":3443662},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Male", "age":"45-49","value":3523995},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Male", "age":"50-54","value":3683803},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Male", "age":"55-59","value":3391215},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Male", "age":"60-64","value":2941617},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Male", "age":"65-69","value":2292090},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Male", "age":"70-74","value":1622504},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Male", "age":"75-79","value":1138811},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Male", "age":"80-84","value":792897},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Male", "age":"≥85","value":666924},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Female", "age":"<5","value":3245435},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Female", "age":"5-9","value":3343945},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Female", "age":"10-14","value":3372638},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Female", "age":"15-19","value":3470619},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Female", "age":"20-24","value":3675940},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Female", "age":"25-29","value":3569471},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Female", "age":"30-34","value":3519283},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Female", "age":"35-39","value":3318738},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Female", "age":"40-44","value":3488381},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Female", "age":"45-49","value":3599461},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Female", "age":"50-54","value":3824694},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Female", "age":"55-59","value":3609434},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Female", "age":"60-64","value":3196943},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Female", "age":"65-69","value":2557058},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Female", "age":"70-74","value":1906736},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Female", "age":"75-79","value":1437899},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Female", "age":"80-84","value":1144246},
//     {"major":"Engineering", "submajor":"Engineer", "sex":"Female", "age":"≥85","value":1312660}
// ]

export interface HierarchyDatum {
    name: string;
    value?: number;
    index?: number;
    x0?: number;
    x1?: number;
    sex?:string;
    children?: Array<HierarchyDatum>;
}


export interface majortype {
    "<5": number;
    "5-9": number;
    "10-14": number;
    "15-19": number;
    "20-24": number;
    "25-29": number;
    "30-34": number;
    "35-39": number;
    "40-44": number;
    "45-49": number;
    "50-54": number;
    "55-59": number;
    "60-64": number;
    "65-69": number;
    "70-74": number;
    "75-79": number;
    "80-84": number;
    "≥85": number;
}

export let data:HierarchyDatum [] = [
    {
        "name":"Engineering",
        "children":[{
            "name":"Female",
            "children":[{
                "name":"<5",
                "children":[
                    {"name":"Math", "value":3245435},
                    {"name":"Game", "value":3245435},
                    {"name":"Engineer", "value":3245435}
            ]},
            {
                "name":"5-9",
                "children":[
                    {"name":"Math", "value":3245435},
                    {"name":"Game", "value":3245435},
                    {"name":"Engineer", "value":3245435}

                ]},
            {
                "name":"10-14",
                "children":[
                    {"name":"Math", "value":3245435},
                    {"name":"Game", "value":3245435},
                    {"name":"Engineer", "value":3245435}

                ]},
            {
                "name":"15-19",
                "children":[
                    {"name":"Math", "value":3245435},
                    {"name":"Game", "value":3245435},
                    {"name":"Engineer", "value":3245435}

                ]},
            {
                "name":"20-24",
                "children":[
                    {"name":"Math", "value":3245435},
                    {"name":"Game", "value":3245435},
                    {"name":"Engineer", "value":3245435}

                ]},
            {
                "name":"25-29",
                "children":[
                    {"name":"Math", "value":3000},
                    {"name":"Game", "value":13123},
                    {"name":"Engineer", "value":32435}

                ]},
            {
                "name":"30-34",
                "children":[
                    {"name":"Math", "value":3245435},
                    {"name":"Game", "value":3245435},
                    {"name":"Engineer", "value":3245435}

                ]},
            {
                "name":"35-39",
                "children":[
                    {"name":"Math", "value":3245435},
                    {"name":"Game", "value":3245435},
                    {"name":"Engineer", "value":3245435}

                ]},
            {
                "name":"40-44",
                "children":[
                    {"name":"Math", "value":3245435},
                    {"name":"Game", "value":3245435},
                    {"name":"Engineer", "value":3245435}

                ]},
            {
                "name":"45-49",
                "children":[
                    {"name":"Math", "value":3245435},
                    {"name":"Game", "value":3245435},
                    {"name":"Engineer", "value":3245435}

                ]},
            {
                "name":"50-54",
                "children":[
                    {"name":"Math", "value":3245435},
                    {"name":"Game", "value":3245435},
                    {"name":"Engineer", "value":3245435}

                ]},
            {
                "name":"55-59",
                "children":[
                    {"name":"Math", "value":3245435},
                    {"name":"Game", "value":3245435},
                    {"name":"Engineer", "value":3245435}

                ]},
            {
                "name":"60-64",
                "children":[
                    {"name":"Math", "value":3245435},
                    {"name":"Game", "value":3245435},
                    {"name":"Engineer", "value":3245435}

                ]},
            {
                "name":"65-69",
                "children":[
                    {"name":"Math", "value":3245435},
                    {"name":"Game", "value":3245435},
                    {"name":"Engineer", "value":3245435}

                ]},
            {
                "name":"70-74",
                "children":[
                    {"name":"Math", "value":3245435},
                    {"name":"Game", "value":3245435},
                    {"name":"Engineer", "value":3245435}

                ]},
            {
                "name":"75-79",
                "children":[
                    {"name":"Math", "value":3245435},
                    {"name":"Game", "value":3245435},
                    {"name":"Engineer", "value":3245435}

                ]},
            {
                "name":"80-84",
                "children":[
                    {"name":"Math", "value":3245435},
                    {"name":"Game", "value":3245435},
                    {"name":"Engineer", "value":3245435}

                ]},
            {
                "name":"≥85",
                "children":[
                    {"name":"Math", "value":3245435},
                    {"name":"Game", "value":3245435},
                    {"name":"Engineer", "value":3245435}

                ]}
            ]},
            {
            "name":"Male",
            "children":[{
                "name":"<5",
                "children":[
                    {"name":"Math", "value":3245435},
                    {"name":"Game", "value":30000},
                    {"name":"Engineer", "value":3245435}
            ]},
            {
                "name":"5-9",
                "children":[
                    {"name":"Math", "value":3245435},
                    {"name":"Game", "value":3245435},
                    {"name":"Engineer", "value":3245435}

                ]},
            {
                "name":"10-14",
                "children":[
                    {"name":"Math", "value":3245435},
                    {"name":"Game", "value":3245435},
                    {"name":"Engineer", "value":3245435}

                ]},
            {
                "name":"15-19",
                "children":[
                    {"name":"Math", "value":3245435},
                    {"name":"Game", "value":3245435},
                    {"name":"Engineer", "value":3245435}

                ]},
            {
                "name":"20-24",
                "children":[
                    {"name":"Math", "value":3245435},
                    {"name":"Game", "value":3245435},
                    {"name":"Engineer", "value":3245435}

                ]},
            {
                "name":"25-29",
                "children":[
                    {"name":"Math", "value":3245435},
                    {"name":"Game", "value":3245435},
                    {"name":"Engineer", "value":3245435}

                ]},
            {
                "name":"30-34",
                "children":[
                    {"name":"Math", "value":3245435},
                    {"name":"Game", "value":3245435},
                    {"name":"Engineer", "value":3245435}

                ]},
            {
                "name":"35-39",
                "children":[
                    {"name":"Math", "value":3245435},
                    {"name":"Game", "value":3245435},
                    {"name":"Engineer", "value":3245435}

                ]},
            {
                "name":"40-44",
                "children":[
                    {"name":"Math", "value":3245435},
                    {"name":"Game", "value":3245435},
                    {"name":"Engineer", "value":3245435}

                ]},
            {
                "name":"45-49",
                "children":[
                    {"name":"Math", "value":3245435},
                    {"name":"Game", "value":3245435},
                    {"name":"Engineer", "value":3245435}

                ]},
            {
                "name":"50-54",
                "children":[
                    {"name":"Math", "value":3245435},
                    {"name":"Game", "value":3245435},
                    {"name":"Engineer", "value":3245435}

                ]},
            {
                "name":"55-59",
                "children":[
                    {"name":"Math", "value":3245435},
                    {"name":"Game", "value":3245435},
                    {"name":"Engineer", "value":3245435}

                ]},
            {
                "name":"60-64",
                "children":[
                    {"name":"Math", "value":3245435},
                    {"name":"Game", "value":3245435},
                    {"name":"Engineer", "value":3245435}

                ]},
            {
                "name":"65-69",
                "children":[
                    {"name":"Math", "value":3245435},
                    {"name":"Game", "value":3245435},
                    {"name":"Engineer", "value":3245435}

                ]},
            {
                "name":"70-74",
                "children":[
                    {"name":"Math", "value":3245435},
                    {"name":"Game", "value":3245435},
                    {"name":"Engineer", "value":3245435}

                ]},
            {
                "name":"75-79",
                "children":[
                    {"name":"Math", "value":3245435},
                    {"name":"Game", "value":3245435},
                    {"name":"Engineer", "value":3245435}

                ]},
            {
                "name":"80-84",
                "children":[
                    {"name":"Math", "value":3245435},
                    {"name":"Game", "value":3245435},
                    {"name":"Engineer", "value":3245435}

                ]},
            {
                "name":"≥85",
                "children":[
                    {"name":"Math", "value":3245435},
                    {"name":"Game", "value":3245435},
                    {"name":"Engineer", "value":3245435}

                ]}
            ]}
    ]},

    {
        "name":"National seience",
        "children":[{
            "name":"Female",
            "children":[{
                "name":"<5",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]},
                {
                "name":"5-9",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]},
                {
                "name":"10-14",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]},
                {
                "name":"15-19",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]},
                {
                "name":"20-24",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]},
                {
                "name":"25-29",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]},
                {
                "name":"30-34",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]},
                {
                "name":"35-39",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]},
                {
                "name":"40-44",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]},
                {
                "name":"45-49",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]},
                {
                "name":"50-54",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]},
                {
                "name":"55-59",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]},
                {
                "name":"60-64",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]},
                {
                "name":"65-69",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]},
                {
                "name":"70-74",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]},
                {
                "name":"75-79",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]},
                {
                "name":"80-84",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]},
                {
                "name":"≥85",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]}

                ]}, 
            {
            "name":"Male",
            "children":[{
                "name":"<5",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]},
                {
                "name":"5-9",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]},
                {
                "name":"10-14",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]},
                {
                "name":"15-19",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]},
                {
                "name":"20-24",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]},
                {
                "name":"25-29",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]},
                {
                "name":"30-34",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]},
                {
                "name":"35-39",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]},
                {
                "name":"40-44",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]},
                {
                "name":"45-49",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]},
                {
                "name":"50-54",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]},
                {
                "name":"55-59",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]},
                {
                "name":"60-64",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]},
                {
                "name":"65-69",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]},
                {
                "name":"70-74",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]},
                {
                "name":"75-79",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]},
                {
                "name":"80-84",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]},
                {
                "name":"≥85",
                "children":[
                    {"name":"Math", "value":3391904},
                    {"name":"Game", "value":3391904},
                    {"name":"Engineer", "value":3391904}
                ]}

            ]}
    ]}
]


// export let data:HierarchyDatum = {
//     "name":"Engineering",
//     "children":[
//         {
//         "name":"<5",
//         "children":[{
//             "name":"Male",
//             "children":[
//                 {"name":"Math", "value":3391904},
//                 {"name":"Game", "value":3391904},
//                 {"name":"Engineer", "value":3391904}
//             ]},
//             {
//             "name":"Female",
//             "children":[
//                 {"name":"Math", "value":3245435},
//                 {"name":"Game", "value":3245435},
//                 {"name":"Engineer", "value":3245435}
//             ]}
//         ]},
//         {
//         "name":"5-9",
//         "children":[{
//             "name":"Male",
//             "children":[
//                 {"name":"Math", "value":3391904},
//                 {"name":"Game", "value":3391904},
//                 {"name":"Engineer", "value":3391904}
//             ]},
//             {
//             "name":"Female",
//             "children":[
//                 {"name":"Math", "value":3245435},
//                 {"name":"Game", "value":3245435},
//                 {"name":"Engineer", "value":3245435}
//             ]}
//         ]},
//         {
//         "name":"10-14",
//         "children":[{
//             "name":"Male",
//             "children":[
//                 {"name":"Math", "value":3391904},
//                 {"name":"Game", "value":3391904},
//                 {"name":"Engineer", "value":3391904}
//             ]},
//             {
//             "name":"Female",
//             "children":[
//                 {"name":"Math", "value":3245435},
//                 {"name":"Game", "value":3245435},
//                 {"name":"Engineer", "value":3245435}
//             ]}
//         ]},
//         {
//         "name":"15-19",
//         "children":[{
//             "name":"Male",
//             "children":[
//                 {"name":"Math", "value":3391904},
//                 {"name":"Game", "value":3391904},
//                 {"name":"Engineer", "value":3391904}
//             ]},
//             {
//             "name":"Female",
//             "children":[
//                 {"name":"Math", "value":3245435},
//                 {"name":"Game", "value":3245435},
//                 {"name":"Engineer", "value":3245435}
//             ]}
//         ]},
//         {
//         "name":"20-24",
//         "children":[{
//             "name":"Male",
//             "children":[
//                 {"name":"Math", "value":3391904},
//                 {"name":"Game", "value":3391904},
//                 {"name":"Engineer", "value":3391904}
//             ]},
//             {
//             "name":"Female",
//             "children":[
//                 {"name":"Math", "value":3245435},
//                 {"name":"Game", "value":3245435},
//                 {"name":"Engineer", "value":3245435}
//             ]}
//         ]},
//         {
//         "name":"25-29",
//         "children":[{
//             "name":"Male",
//             "children":[
//                 {"name":"Math", "value":3391904},
//                 {"name":"Game", "value":3391904},
//                 {"name":"Engineer", "value":3391904}
//             ]},
//             {
//             "name":"Female",
//             "children":[
//                 {"name":"Math", "value":3245435},
//                 {"name":"Game", "value":3245435},
//                 {"name":"Engineer", "value":3245435}
//             ]}
//         ]},
//         {
//         "name":"30-34",
//         "children":[{
//             "name":"Male",
//             "children":[
//                 {"name":"Math", "value":3391904},
//                 {"name":"Game", "value":3391904},
//                 {"name":"Engineer", "value":3391904}
//             ]},
//             {
//             "name":"Female",
//             "children":[
//                 {"name":"Math", "value":3245435},
//                 {"name":"Game", "value":3245435},
//                 {"name":"Engineer", "value":3245435}
//             ]}
//         ]},
//         {
//         "name":"35-39",
//         "children":[{
//             "name":"Male",
//             "children":[
//                 {"name":"Math", "value":3391904},
//                 {"name":"Game", "value":3391904},
//                 {"name":"Engineer", "value":3391904}
//             ]},
//             {
//             "name":"Female",
//             "children":[
//                 {"name":"Math", "value":3245435},
//                 {"name":"Game", "value":3245435},
//                 {"name":"Engineer", "value":3245435}
//             ]}
//         ]},
//         {
//         "name":"40-44",
//         "children":[{
//             "name":"Male",
//             "children":[
//                 {"name":"Math", "value":3391904},
//                 {"name":"Game", "value":3391904},
//                 {"name":"Engineer", "value":3391904}
//             ]},
//             {
//             "name":"Female",
//             "children":[
//                 {"name":"Math", "value":3245435},
//                 {"name":"Game", "value":3245435},
//                 {"name":"Engineer", "value":3245435}
//             ]}
//         ]},
//         {
//         "name":"45-49",
//         "children":[{
//             "name":"Male",
//             "children":[
//                 {"name":"Math", "value":3391904},
//                 {"name":"Game", "value":3391904},
//                 {"name":"Engineer", "value":3391904}
//             ]},
//             {
//             "name":"Female",
//             "children":[
//                 {"name":"Math", "value":3245435},
//                 {"name":"Game", "value":3245435},
//                 {"name":"Engineer", "value":3245435}
//             ]}
//         ]},
//               {
//         "name":"50-54",
//         "children":[{
//             "name":"Male",
//             "children":[
//                 {"name":"Math", "value":3391904},
//                 {"name":"Game", "value":3391904},
//                 {"name":"Engineer", "value":3391904}
//             ]},
//             {
//             "name":"Female",
//             "children":[
//                 {"name":"Math", "value":3245435},
//                 {"name":"Game", "value":3245435},
//                 {"name":"Engineer", "value":3245435}
//             ]}
//         ]},
//       {
//         "name":"55-59",
//         "children":[{
//             "name":"Male",
//             "children":[
//                 {"name":"Math", "value":3391904},
//                 {"name":"Game", "value":3391904},
//                 {"name":"Engineer", "value":3391904}
//             ]},
//             {
//             "name":"Female",
//             "children":[
//                 {"name":"Math", "value":3245435},
//                 {"name":"Game", "value":3245435},
//                 {"name":"Engineer", "value":3245435}
//             ]}
//         ]},
//       {
        
//         "name":"60-64",
//         "children":[{
//             "name":"Male",
//             "children":[
//                 {"name":"Math", "value":3391904},
//                 {"name":"Game", "value":3391904},
//                 {"name":"Engineer", "value":3391904}
//             ]},
//             {
//             "name":"Female",
//             "children":[
//                 {"name":"Math", "value":3245435},
//                 {"name":"Game", "value":3245435},
//                 {"name":"Engineer", "value":3245435}
//             ]}
//         ]},
//       {
//         "name":"65-69",
//         "children":[{
//             "name":"Male",
//             "children":[
//                 {"name":"Math", "value":3391904},
//                 {"name":"Game", "value":3391904},
//                 {"name":"Engineer", "value":3391904}
//             ]},
//             {
//             "name":"Female",
//             "children":[
//                 {"name":"Math", "value":3245435},
//                 {"name":"Game", "value":3245435},
//                 {"name":"Engineer", "value":3245435}
//             ]}
//         ]},
//       {
//         "name":"70-74",
//         "children":[{
//             "name":"Male",
//             "children":[
//                 {"name":"Math", "value":3391904},
//                 {"name":"Game", "value":3391904},
//                 {"name":"Engineer", "value":3391904}
//             ]},
//             {
//             "name":"Female",
//             "children":[
//                 {"name":"Math", "value":3245435},
//                 {"name":"Game", "value":3245435},
//                 {"name":"Engineer", "value":3245435}
//             ]}
//         ]},
//       {
//         "name":"75-79",
//         "children":[{
//             "name":"Male",
//             "children":[
//                 {"name":"Math", "value":3391904},
//                 {"name":"Game", "value":3391904},
//                 {"name":"Engineer", "value":3391904}
//             ]},
//             {
//             "name":"Female",
//             "children":[
//                 {"name":"Math", "value":3245435},
//                 {"name":"Game", "value":3245435},
//                 {"name":"Engineer", "value":3245435}
//             ]}
//         ]},
//       {
//         "name":"80-84",
//         "children":[{
//             "name":"Male",
//             "children":[
//                 {"name":"Math", "value":3391904},
//                 {"name":"Game", "value":3391904},
//                 {"name":"Engineer", "value":3391904}
//             ]},
//             {
//             "name":"Female",
//             "children":[
//                 {"name":"Math", "value":3245435},
//                 {"name":"Game", "value":3245435},
//                 {"name":"Engineer", "value":3245435}
//             ]}
//         ]},
//       {
//         "name":"≥85",
//         "children":[{
//             "name":"Male",
//             "children":[
//                 {"name":"Math", "value":3391904},
//                 {"name":"Game", "value":3391904},
//                 {"name":"Engineer", "value":3391904}
//             ]},
//             {
//             "name":"Female",
//             "children":[
//                 {"name":"Math", "value":3245435},
//                 {"name":"Game", "value":3245435},
//                 {"name":"Engineer", "value":3245435}
//             ]}
//         ]}
//     ]
// }


// export let data:HierarchyDatum = {
//     "name":"Engineering",
//     "children":[
//         {
//         "name":"Math",
//         "children":[{
//             "name":"Male",
//             "children":[
//                 {"name":"<5","value":3391904},
//                 {"name":"5-9","value":3490049},
//                 {"name":"10-14","value":3520624},
//                 {"name":"15-19","value":3647541},
//                 {"name":"20-24","value":3858804},
//                 {"name":"25-29","value":3663199},
//                 {"name":"30-34","value":3541930},
//                 {"name":"35-39","value":3299856},
//                 {"name":"40-44","value":3443662},
//                 {"name":"45-49","value":3523995},
//                 {"name":"50-54","value":3683803},
//                 {"name":"55-59","value":3391215},
//                 {"name":"60-64","value":2941617},
//                 {"name":"65-69","value":2292090},
//                 {"name":"70-74","value":1622504},
//                 {"name":"75-79","value":1138811},
//                 {"name":"80-84","value":792897},
//                 {"name":"≥85","value":666924}
//             ]},            
//             {
//             "name":"Female",
//             "children":[
//                 {"name":"<5","value":3245435},
//                 {"name":"5-9","value":3343945},
//                 {"name":"10-14","value":3372638},
//                 {"name":"15-19","value":3470619},
//                 {"name":"20-24","value":3675940},
//                 {"name":"25-29","value":3569471},
//                 {"name":"30-34","value":3519283},
//                 {"name":"35-39","value":3318738},
//                 {"name":"40-44","value":3488381},
//                 {"name":"45-49","value":3599461},
//                 {"name":"50-54","value":3824694},
//                 {"name":"55-59","value":3609434},
//                 {"name":"60-64","value":3196943},
//                 {"name":"65-69","value":2557058},
//                 {"name":"70-74","value":1906736},
//                 {"name":"75-79","value":1437899},
//                 {"name":"80-84","value":1144246},
//                 {"name":"≥85","value":1312660}
//             ]}
//         ]},
//         {
//         "name":"Game",
//         "children":[{
//             "name":"Male",
//             "children":[
//                 {"name":"<5","value":3391904},
//                 {"name": "5-9","value":3490049},
//                 {"name":"10-14","value":3520624},
//                 {"name":"15-19","value":3647541},
//                 {"name":"20-24","value":3858804},
//                 {"name":"25-29","value":3663199},
//                 {"name":"30-34","value":3541930},
//                 {"name":"35-39","value":3299856},
//                 {"name":"40-44","value":3443662},
//                 {"name":"45-49","value":3523995},
//                 {"name":"50-54","value":3683803},
//                 {"name":"55-59","value":3391215},
//                 {"name":"60-64","value":2941617},
//                 {"name":"65-69","value":2292090},
//                 {"name":"70-74","value":1622504},
//                 {"name":"75-79","value":1138811},
//                 {"name":"80-84","value":792897},
//                 {"name":"≥85","value":666924}
//             ]},            
//             {
//             "name":"Female",
//             "children":[
//                 {"name":"<5","value":3245435},
//                 {"name":"5-9","value":3343945},
//                 {"name":"10-14","value":3372638},
//                 {"name":"15-19","value":3470619},
//                 {"name":"20-24","value":3675940},
//                 {"name":"25-29","value":3569471},
//                 {"name":"30-34","value":3519283},
//                 {"name":"35-39","value":3318738},
//                 {"name":"40-44","value":3488381},
//                 {"name":"45-49","value":3599461},
//                 {"name":"50-54","value":3824694},
//                 {"name":"55-59","value":3609434},
//                 {"name":"60-64","value":3196943},
//                 {"name":"65-69","value":2557058},
//                 {"name":"70-74","value":1906736},
//                 {"name":"75-79","value":1437899},
//                 {"name": "80-84","value":1144246},
//                 {"name": "≥85","value":1312660 }
//             ]}
//         ]},
//         {
//         "name": "Engineer",
//         "children":[{
//             "name":"Male",
//             "children":[
//                 {"name":"<5","value":3391904},
//                 {"name": "5-9","value":3490049},
//                 {"name":"10-14","value":3520624},
//                 {"name":"15-19","value":3647541},
//                 {"name":"20-24","value":3858804},
//                 {"name":"25-29","value":3663199},
//                 {"name":"30-34","value":3541930},
//                 {"name":"35-39","value":3299856},
//                 {"name":"40-44","value":3443662},
//                 {"name":"45-49","value":3523995},
//                 {"name":"50-54","value":3683803},
//                 {"name":"55-59","value":3391215},
//                 {"name":"60-64","value":2941617},
//                 {"name":"65-69","value":2292090},
//                 {"name":"70-74","value":1622504},
//                 {"name":"75-79","value":1138811},
//                 {"name":"80-84","value":792897},
//                 {"name":"≥85","value":666924}
//             ]},            
//             {
//             "name":"Female",
//             "children":[
//                 {"name":"<5","value":3245435},
//                 {"name":"5-9","value":3343945},
//                 {"name":"10-14","value":3372638},
//                 {"name":"15-19","value":3470619},
//                 {"name":"20-24","value":3675940},
//                 {"name":"25-29","value":3569471},
//                 {"name":"30-34","value":3519283},
//                 {"name":"35-39","value":3318738},
//                 {"name":"40-44","value":3488381},
//                 {"name":"45-49","value":3599461},
//                 {"name":"50-54","value":3824694},
//                 {"name":"55-59","value":3609434},
//                 {"name":"60-64","value":3196943},
//                 {"name":"65-69","value":2557058},
//                 {"name":"70-74","value":1906736},
//                 {"name":"75-79","value":1437899},
//                 {"name": "80-84","value":1144246},
//                 {"name": "≥85","value":1312660 }
//             ]}
//         ]}
//     ]
// }

let formet = {
    "AA":{
    "name":"공학계열",
    "subfield":{
        "100":{
            "name":"보안"
        },
        "101":{
            "name":"서버"
        },
        "102":{
            "name":"소프트웨어"
        },
        "103":{
            "name":"게임"
        },
        "104":{
            "name":"통신"
        },
        "105":{
            "name":"미디어"
        },
        "106":{
            "name":"도시"
        },
        "107":{
            "name":"건축"
        },
        "108":{
            "name":"토목"
        },
        "109":{
            "name":"교통"
        },
        "110":{
            "name":"해양"
        },
        "111":{
            "name":"항공"
        },
        "112":{
            "name":"자동차"
        },
        "113":{
            "name":"기계"
        },
        "114":{
            "name":"전기"
        },
        "115":{
            "name":"물류"
        },
        "116":{
            "name":"소방"
        },
        "117":{
            "name":"화학"
        },
        "118":{
            "name":"금속"
        },
        "119":{
            "name":"나노"
        },
        "120":{
            "name":"섬유"
        },
        "121":{
            "name":"반도체"
        },
        "122":{
            "name":"세라믹"
        },
        "123":{
            "name":"신소재"
        },
        "124":{
            "name":"에너지"
        }
    }
    },
    "BB":{
    "name":"자연계열",
    "subfield":{
        "100":{
            "name":"가정관리학"
        },
        "101":{
            "name":"농업학"
        },
        "102":{
            "name":"식품조리"
        },
        "103":{
            "name":"식품영양"
        },
        "104":{
            "name":"수학"
        },
        "105":{
            "name":"물리"
        },
        "106":{
            "name":"통계학"
        },
        "107":{
            "name":"화학"
        },
        "108":{
            "name":"생명과학"
        },
        "109":{
            "name":"산림, 원예학"
        },
        "110":{
            "name":"수산학"
        },
        "111":{
            "name":"수의학"
        },
        "112":{
            "name":"의류, 의상"
        },
        "113":{
            "name":"천문, 기상학"
        },
        "114":{
            "name":"지구과학"
        }
    }
    },
    "CC":{
    "name":"인문계열",
    "subfield":{
        "100":{
            "name":"고고학"
        },
        "101":{
            "name":"관광학"
        },
        "102":{
            "name":"문학, 문예"
        },
        "103":{
            "name":"문화 , 인류"
        },
        "104":{
            "name":"역사"
        },
        "105":{
            "name":"심리학"
        },
        "106":{
            "name":"언어학"
        }
    }
    },
    "DD":{
    "name":"사회계열",
    "subfield":{
        "100":{
            "name":"경제학"
        },
        "101":{
            "name":"경영학"
        },
        "102":{
            "name":"행정학"
        },
        "103":{
            "name":"사회학"
        },
        "104":{
            "name":"금융, 보험학"
        },
        "105":{
            "name":"노인복지학"
        },
        "106":{
            "name":"정치외교학"
        },
        "107":{
            "name":"도시, 지역화"
        },
        "108":{
            "name":"무역, 유통학"
        },
        "109":{
            "name":"신문방송학"
        },
        "110":{
            "name":"정보미디어"
        },
        "111":{
            "name":"아동, 청소년복지학"
        }
    }
    },
    "EE":{
    "name":"의약계열",
    "subfield":{
        "100":{
            "name":"보건학"
        },
        "101":{
            "name":"물리치료학"
        },
        "102":{
            "name":"약학"
        },
        "103":{
            "name":"의학"
        },
        "104":{
            "name":"임상병리학"
        },
        "105":{
            "name":"치의학"
        },
        "106":{
            "name":"한의학"
        }
    }
    },
    "FF":{
    "name":"예체능계열",
    "subfield":{
        "100":{
            "name":"공예"
        },
        "101":{
            "name":"만화, 애니메이션"
        },
        "102":{
            "name":"산업, 시각디자인"
        },
        "103":{
            "name":"방송연예, 미디어"
        },
        "104":{
            "name":"미용학"
        },
        "105":{
            "name":"연극영화"
        },
        "106":{
            "name":"음악, 음향"
        },
        "107":{
            "name":"조형학"
        }
    }
    }
}