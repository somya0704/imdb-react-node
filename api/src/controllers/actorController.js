let Actor = require("../models/actorModel")

export const getActors = async (req,res) => {
    try{
       const actors = await Actor.find();
       return res.json({ status: "success", message: "actors list retrieved", actors: actors });
    } catch (error) {
       res.status(400).json({ error: "something went wrong"})
       throw error;
    }
}

export const newActor =  async (req,res) => {
    const { data } = req.body;
    try{ 
        const actor = new Actor(data);
        console.log(actor);  
      const newActor = await actor.save();
      return res.json({ status: "ok", message: "new actor added", actor: newActor });
    } catch (error) {
       res.status(400).json({ error: error})
       throw error;
    } 
}

export const updateActor = async (req,res) => {
  
    try{console.log(req.params.name)
        //console.log(req.body)
        let actors = await Actor.findOneAndUpdate({name: req.params.name}, req.body)
        if (!actors) {
            return res.status(404).send("not found");
          } else {
              //console.log(req.body)
            // actors = await Actor.findOneAndUpdate(req.body)
            res.status(200).send(actors);
          }   
    } catch (error) {
        res.status(400).json({ error: "something went wrong"})
        throw error;
    }

}