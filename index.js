const socket = io("http://localhost:8080/", { transports: ["websocket"] })
document.querySelector("form").addEventListener("submit", vote)

socket.on("message", (msg) => {
    console.log(msg)
})

function vote(e) {

    e.preventDefault()

    const voter_id = document.querySelector("#voter_id").value
    const party = document.querySelector("#party").value
    socket.emit("vote",party, voter_id)

}

socket.on("allvotes",function (data){
    console.log(data);
    let avotes = 0
    let bvotes = 0
    let cvotes = 0
    for(let i=0;i<data.length;i++){
      if(data[i]._id=="A"){
        avotes=data[i].count
      }else if(data[i]._id=="B"){
        bvotes=data[i].count
      }
      else if(data[i]._id=="C"){
        cvotes=data[i].count
      }
    }

    let total = avotes+bvotes+cvotes
    avotes=Number(avotes/total*100).toFixed(2)
    bvotes=Number(bvotes/total*100).toFixed(2)
    cvotes=Number(cvotes/total*100).toFixed(2)

    document.querySelector("#aparty").innerText=`Vote Share : ${avotes}% `
    document.querySelector("#bparty").innerText=`Vote Share : ${bvotes}%`
    document.querySelector("#cparty").innerText=`Vote Share : ${cvotes}%`
    document.querySelector("#total").innerText=`Total Votes : ${total}`
   


 })
socket.on("error",function (msg){
    alert(msg);
 })
socket.on("success",function (msg){
   alert(msg);
 })

