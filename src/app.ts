import { Sequelize } from "sequelize";

const sequelize = new Sequelize("", "", "", {
  dialect: "postgres",
});

export { sequelize };

// sequelize
//   .sync()
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));

// -----

// sequelize
//   .authenticate()
//   .then(() => console.log("Connected."))
//   .catch((err) => console.error("Connection error: ", err));

// -----

// sequelize.sync().then(()=>{
//   app.listen(3000, function(){
//     console.log("Сервер ожидает подключения...");
//   });
// }).catch(err=>console.log(err));
