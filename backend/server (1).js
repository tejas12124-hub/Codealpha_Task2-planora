require("dotenv").config();
const express=require("express");
const cors=require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB=require("./db");

const authRoutes=require("./routes/authRoutes");
const projectRoutes=require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const notificationRoutes = require("./routes/notificationRoutes");



const app=express();

console.log("Loading project routes...");

app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/projects",projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/notifications", notificationRoutes);


app.get("/test",(req,res)=>{
    res.json({stauts:"Planora backend is running"});
});

connectDB();


const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});



const PORT=process.env.PORT || 5637;
app.listen(PORT,()=>{
    console.log("Server running on port 5637");
});