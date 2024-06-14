export default function Card({judul, content}){
    return (
        <>
        <p className="text-white">Judul : {judul}</p>
        <p className="text-white">Content : {content}</p>
        </>
    )
}