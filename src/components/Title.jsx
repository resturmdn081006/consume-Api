export default function Title({name, page, lang}){
    return (
        <>
        <h1 className="text-white">Name : {name} </h1>
        <p className="text-white">Page : {page}</p>
        <p className="text-white">Language : {lang}</p>
        </>
    )
}

// export default function Title(props){

//     return (
//         <>
//         <h1 className="text-white">Name : {props.name} </h1>
//         <p className="text-white">Page : {props.page}</p>
//         <p className="text-white">Language : {props.lang}</p>
//         </>
//     )
// }
