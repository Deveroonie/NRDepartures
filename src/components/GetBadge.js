import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function GetBadge(data) {
    const swal = withReactContent(Swal)
        if(data.std !== data.etd && data.etd !== "Cancelled" && data.etd !== "On time") {
            if(data.etd != "Delayed") {
                let delay = data.std.replace(":", "") - data.etd.replace(":", "")
                return (
                    <div>
                    <span className="bg-yellow-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                        {data.etd}
                    </span>
                    <br />
                    <span title="Click me to learn more about claiming Delay Repay for this train." onClick={canGetDelayRepayed}>This train has been delayed by {delay.toString().replace("-", "")} minutes</span>
                    </div>
                )
                function canGetDelayRepayed() {
                    if(delay >= 15) {
                        swal.fire({
                            icon: "success",
                            title: "You should be able to get delay repay for this journey.",
                            html: "Please see your train company's website for more information."
                          })
                    } else {
                        swal.fire({
                            icon: "error",
                            title: "You probably won't be able to get delay repay for this journey.",
                            html: "Unfortunatley as your train hasn't been delayed by at least 15 minutes you cannot claim delay repay for this journey."
                          })
                    }

                }
            } else {
            return (
                <span className="bg-yellow-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                    {data.etd}
                </span>
            )
            }
            
        } else if (data.etd === "Cancelled") {
            return (<span className="bg-red-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded ">Cancelled</span>)
        } else if(data.etd === "On time") {
            return "On time"
        }
}