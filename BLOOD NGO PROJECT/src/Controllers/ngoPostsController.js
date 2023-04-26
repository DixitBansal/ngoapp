const NGO_POSTS_SERVICE = require("../Services/ngoPostsService");

const createPost = async (req, res) => {
  console.log(req.body);
  const data = {
    ...req.body,
    userId: req.userId,
  };
  const response = await NGO_POSTS_SERVICE.createPost(data);
  res.status(200).send(response);
};

const employeePosts = async (req, res) => {
  const data = {
    ...req.query,
    eid: req.userId,
  };
  const response = await NGO_POSTS_SERVICE.employeePosts(data);
  res.status(200).send(response);
};

const editPost = async (req, res) => {
  const data = {
    ...req.body,
    userId: req.userId,
  };
  const response = await NGO_POSTS_SERVICE.editPost(data);
  res.status(200).send(response);
};

module.exports = { createPost, employeePosts, editPost };
