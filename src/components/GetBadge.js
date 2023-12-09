export default function GetBadge(data) {
        if(data.std !== data.etd && data.etd !== "Cancelled" && data.etd !== "On time") {
            return (<span className="bg-yellow-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded ">{data.etd}</span>)
        } else if (data.etd === "Cancelled") {
            return (<span className="bg-red-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded ">Cancelled</span>)
        } else if(data.etd === "On time") {
            return "On time"
        }
}