import app from "./app.js";
import colors from "colors"
import {} from "dotenv";

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(colors.yellow(`Server listening on port : ${PORT}`));
    console.log(colors.blue(`http://localhost:${PORT}`));
});
