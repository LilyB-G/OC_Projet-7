exports.updateSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
  .then((sauce) => {
      let sauceObject = { ...req.body };
      if (req.file) {
        const filename = sauce.imageUrl.split('/images/')[1];
        sauceObject = {
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
        fs.unlink(`images/${filename}`, (err) => {
          if (err) console.log(err);
          else {
            console.log(`Deleted file from ./images: ${filename}`);
          }
        });
      }
      Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce modifiée!' }))
      .catch(error => res.status(400).json({ error }));
    })
};