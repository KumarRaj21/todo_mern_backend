const router = require("express").Router();
const User = require("../Modals/user");

const List = require("../Modals/list");


//create
router.post("/addtask", async (req, res) => {
    try {
        const { title, body, id } = req.body
        const existingUser = await User.findById(id)
        if (existingUser) {
            const list = new List({ title, body, user: existingUser._id });
            await list.save().then(() => res.status(200).json({ list }));
            existingUser.list.push(list);
            await existingUser.save();
        }
    } catch (error) {
        console.log(error)
    }
})

//update 

router.put("/updatetask/:id", async (req, res) => {
    try {
        const { title, body } = req.body
        const list = await List.findByIdAndUpdate(req.params.id, { title, body })
        list.save().then(() => res.status(200).json({ list }))

    } catch (error) {
        console.log(error)
    }
})

//completed

router.put("/togglecompletedtask/:id", async (req, res) => {
    try {
        const task = await List.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        task.done = !task.done;
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


// router.put("/completedtask/:id", async (req, res) => {
//     try {
//         const list = await List.findByIdAndUpdate(req.params.id, { done: true }, { new: true });
//         if (!list) {
//             return res.status(200).json({ message: "Task not found" });
//         }
//         res.status(200).json({ list });
//     } catch (error) {
//         console.log(error);
//         res.status(200).json({ message: "Server error" });
//     }
// });

//delete

router.delete("/deletetask/:id", async (req, res) => {
    try {
        const { id } = req.body 
        const existingUser = await User.findByIdAndUpdate(id, { $pull: { list: req.params.id } })
        if (existingUser) {
            await List.findByIdAndDelete(req.params.id).then(() => res.status(200).json({ message: "task deleted" }))
        }

    } catch (error) {
        console.log(error)
    }
})

//gettasks

router.get("/gettask/:id", async (req, res) => {
    const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 })

    if (list.length !== 0) {
        res.status(200).json({ list: list })
    }
    else {
        res.status(200).json({ "message": "No tasks" })
    }

})

module.exports = router;