
  const db = require('../DB/connection');
  //User constructor
  function User ({
    username, 
    password, 
    phone,
    email
  }) {
      this.username = username;
      this.password = password;
      this.phone=phone;
      this.email=email;
  };
  // add a createUser method to the prototype
  User.prototype.createUser = async function() {
      try {
          const { rows } = await db.query(
              `INSERT INTO users(username,password,phone,email) VALUES ($1, $2, $3,$4)`,
              [this.username,this.password,this.phone,this.email]
          );
          return rows; 
      } catch (error) {
          throw error;
      }
  };
  module.exports = User;
  // db.query: the query method we exported earlier from db/index.js