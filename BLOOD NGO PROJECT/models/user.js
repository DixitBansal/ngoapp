
  const db = require('../DB/connection');
  //User constructor
  function User ({
    username, 
    password, 
    phone,
    email,
    city,
    state,
    blood_group,
    address,
    is_volunteer,acc_type
  }) {
      this.username = username;
      this.password = password;
      this.phone=phone;
      this.email=email;
      this.city=city;
      this.state=state;
      this.blood_group=blood_group;
      this.address=address;
      this.is_volunteer=is_volunteer;
      this.acc_type=acc_type;
  };
  // add a createUser method to the prototype
  User.prototype.createUser = async function() {
      try {
          const { rows } = await db.query(
              `INSERT INTO users(username,password,phone,email,city,state,blood_group,address,is_volunteer,acc_type) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
              [this.username,this.password,this.phone,this.email,this.city,this.state,this.blood_group,this.address,this.is_volunteer,this.acc_type]
          );
          return rows; 
      } catch (error) {
          throw error;
      }
  };
  module.exports = User;
  // db.query: the query method we exported earlier from db/index.js