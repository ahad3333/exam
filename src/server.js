const express =require("express")
const path=require("path")
const fs = require("fs");
const cors = require("cors");
const process = require('process')
const fileUpload = require("express-fileupload");

const app =express()
const port =3000;

app.use(cors());
app.use(express.static(path.join(__dirname, "..", "photos")));
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());
app.use(express.json());
const photos = JSON.parse(
  fs
    .readFileSync(path.join(__dirname, "..", "database", "photo.json"), "UTF-8")
    .trim() || "[]"
);
app.get("/photo", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/photos", (req, res) => {
  res.setHeader("Content-Type", "application/json")
  res.status(200).json(photos);
});
app.get("/downloads/:photoPath", (req, res) => {
  res.download(path.join(__dirname, "..", "photos", req.params.photoPath));
  
});
app.post("/upload", (req, res) => {
  const { file } = req.files;
  const photoName = new Date().getTime() + file.name;
  file.mv(path.join(__dirname, "..", "photos", photoName));

  const newFile = {
    id: photos.length ? photos[photos.length - 1].id + 1 : 1,
    title: req.body.title,
    path: photoName,
  };

  photos.push(newFile);

  fs.writeFileSync(
    path.join(__dirname, "..", "database", "photo.json"),
    JSON.stringify(photos, null, 2)
  );
  res.status(201).json({
    message: "New file created!",
    status: 201,
  });
});


//---------------------files-----------------------------------------------------//
const files = JSON.parse(
  fs
    .readFileSync(path.join(__dirname, "..", "database", "files.json"), "UTF-8")
    .trim() || "[]"
);
app.use(express.static(path.join(__dirname, "..", "files")));

app.get("/file", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.sendFile(__dirname + "/views/file.html");
});

app.get("/files", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(files);
});

app.get("/downloads1/:filesPath", (req, res) => {
  res.download(path.join(__dirname, "..", "files", req.params.filesPath));
});

app.post("/uploadfile", (req, res) => {
  const { file } = req.files;
  const fileName = new Date().getTime() + file.name;
  file.mv(path.join(__dirname, "..", "files", fileName));
  const newFile = {
    id: files.length ? files[files.length - 1].id + 1 : 1,
    title: req.body.title,
    path: fileName,
  };

  files.push(newFile);

  fs.writeFileSync(
    path.join(__dirname, "..", "database", "files.json"),
    JSON.stringify(files, null, 2)
  );
  res.status(201).json({
    message: "New file created!",
    status: 201,
  });
});

//--------------------Video----------------------------///
const videos = JSON.parse(
  fs
    .readFileSync(path.join(__dirname, "..", "database", "video.json"), "UTF-8")
    .trim() || "[]"
);
app.use(express.static(path.join(__dirname, "..", "videos")));

app.get("/video", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.sendFile(__dirname + "/views/video.html");
});

app.get("/videos", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(videos);
  
});

app.get("/downloads2/:videoPath", (req, res) => {
  res.download(path.join(__dirname, "..", "videos", req.params.videoPath));
});

app.post("/uploadvideo", (req, res) => {
  const { file } = req.files;
  const videoName = new Date().getTime() + file.name;
  file.mv(path.join(__dirname, "..", "videos", videoName));

  const newFile = {
    id: videos.length ? videos[videos.length - 1].id + 1 : 1,
    title: req.body.title,
    path: videoName,
    
  };

videos.push(newFile);

  fs.writeFileSync(
    path.join(__dirname, "..", "database", "video.json"),
    JSON.stringify(videos, null, 2)
  );
  res.status(201).json({
    message: "New file created!",
    status: 201,
  });
});
//-------------------------register------------------------
const registers = JSON.parse(
  fs
    .readFileSync(path.join(__dirname, "..", "database", "register.json"), "UTF-8")
    .trim() || "[]"
);
app.get("/registers", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.sendFile(path.join(__dirname,  "/views/register.html"));
});
app.post("/registers",(req,res)=>{
  const newUser = {
    id: registers.length ? registers[registers.length - 1].id + 1 : 1,
    name: req.body.name,
    email:req.body.email,
    password:req.body.password
  }
  registers.push(newUser);
  fs.writeFileSync(
    path.join(__dirname, "..", "database", "register.json"),
    JSON.stringify(registers, null, 2)
  );
      res.status(201).json({
        message: "New user created!",
        status: 201,
        // date:body
      })
    });
//----------------------------login----------------------------------------//
app.get("/login", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.sendFile(path.join(__dirname,  "/views/login.html"));
});
    app.get("/login/:name/:password", (req, res) => {
      res.setHeader("Content-Type", "application/json");
      let id = req.query.name;
      let di=req.query.password  
      const registername = registers.find((register) => register.name+register.password == id+di);
      if (!registername) {
        return res.status(404).json({
          message: "login yoki password hato",
          status: 404,
        });
      }
    
      res.status(200).json({
        status: 200,
        data
      });
    });
    

   
app.listen(port, ()=> console.log("Server ishga tushdi http://localhost:"+port))