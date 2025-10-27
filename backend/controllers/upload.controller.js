export const uploadImage = async(req, res) => {
    try {
        if(!req.file) {
            console.log(req.file)
            return res.status(400).json({message : "No image provided"})
        }
        res.status(201).json({profileImage : req.file.path})
    } catch (error) {
        console.log("Error in upload controller : ", error)
        res.status(500).json({message : "Internal server error"})
    }
}