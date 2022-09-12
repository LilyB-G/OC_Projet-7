//Importation de recipe.js à partir de models
const Thread = require('../models/tread');
//Importation du package fs de Node, module qui fournit des fonctions utiles pour intéragir avec le système des fichiers
const fs = require('fs');

//Exportation des fonctions create, update, delete, getOne, getAll
exports.createThread = (req, res, next) => {
    //modification du format de la requête pour la transformer en objet 
    
    const threadObject = JSON.parse(req.body.thread);
    
    delete threadObject._id;
                                                    
    //Création d'une nouvelle recette
    const thread = new Thread({
        //Récupération des informations
        ...threadObject,
        //userId: req.auth.userId,
        //Récupération de l'URL dynamique "image" généré par multer
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    //Enregistre l'objet dans la BDD
    
    thread.save()
        .then(() => { res.status(201).json({ message: 'Your thread is added !' }) })
        .catch(error => { res.status(400).json({ error }) }) 
};
                                            
exports.updateThread = (req, res, next) => {
    //Création d'un objet on demande si l'image est à modifier
    const threadObject = req.file ? {
        //récupération des infos des objets
        ...JSON.parse(req.body.thread),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body }; //autrement reprise de l'objet en gardant l'initial

    //delete thingObject._userId;
    threadObject.updateOne({ _id: req.params.id }, { ...recipeObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Your recipe is modified!' }))
        .catch(error => res.status(401).json({ error }));
};

exports.deleteThread = (req, res, next) => {
    Thread.findOne({ _id: req.params.id }, )
        .then(roll => {
            //Récupération du fichier
            const filename = roll.imageUrl.split('/images/')[1];
            //Suppression du ficgier grâce à unlink
            fs.unlink(`images/${filename}`, () => {
                Thread.deleteOne({ _id: req.params.id })
                    .then(() => { res.status(200).json({ message: 'Your recipe is deleted !' }) })
                    .catch(error => res.status(401).json({ error }));
            });
        })
        .catch(error => res.status(400).json({ error })
        )
};

exports.getAllThread = (req, res, next) => {
    
    Thread.find()
        .then((roll) => 
        
        res.status(200).json(roll))
        .catch(error => res.status(400).json({ error: error }));

};

//récupération d'une seule recette
exports.selectThread = (req, res, next) => {
    
    Thread.findOne({ _id: req.params.id }) //définit le même id que la recette demandée
        .then(roll => res.status(200).json(roll))
        .catch(error => res.status(400).json({ error }));
};

//Création des likes
exports.functionlike = (req, res) => {

    if (req.body.like === 1) {
        Thread.findOneAndUpdate(
            { _id: req.params.id },
            { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } }
        )
            .then(() => res.status(200).json({ message: "message liked" }))
            .catch((error) => res.status(400).json({ error }));
    }
    else if (req.body.like === -1) {
        Thread.findOneAndUpdate(
            { _id: req.params.id },
            { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } }
        )
            .then(() => res.status(200).json({ message: "message disliked" }))
            .catch((error) => res.status(400).json({ error }));
    } else {
        Thread.findOne({ _id: req.params.id }).then((result) => {
            if (result.usersLiked.includes(req.body.userId)) {
                Thread.findOneAndUpdate(
                    { _id: req.params.id },
                    { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } }
                )
                    .then(() => res.status(200).json({ message: "like deletion done" }))
                    .catch((error) => res.status(400).json({ error }));
            }
            else if (result.usersDisliked.includes(req.body.userId)) {
                Thread.findOneAndUpdate(
                    { _id: req.params.id },
                    { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } }
                )
                    .then(() => res.status(200).json({ message: "dislike deletion done" }))
                    .catch((error) => res.status(400).json({ error }))
            }
        })
    }

}



