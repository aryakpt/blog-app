const fileController = {
  upload(req, res) {
    if (!req.file) {
      return res.status(400).send({ message: 'Image upload failed!' });
    }

    return res.status(200).send({
      status: 200,
      message: 'Image uploaded successfully!',
      result: req.file.path,
    });
  },
};

export default fileController;
