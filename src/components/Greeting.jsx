


const Greeting = () =>{

const currentTime = new Date();
const currentHour = currentTime.getHours();

let greeting ;
 if (currentHour < 12) {
    greeting = "早安";
} else if (currentHour < 18) {
    greeting = "午安";
} else {
    greeting = "晚安";
}

return(

<div>
{greeting}
</div>


)

}

export default Greeting;