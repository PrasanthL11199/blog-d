import express from "express";
// import ejs from "ejs";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let postContent;
let posts = [];
let d = new Date();
let date = d.getDate();
let month = d.getMonth();
let postId = 1;
let postObj;

let time = d.getTime();


let recentPosts = [{
        title: "Exploring the Wonders of Deep Learning",
        description: "Deep learning is a subset of machine learning that has gained significant attention in recent years due to its ability to learn complex patterns from data. From image recognition and natural language processing to autonomous vehicles and medical diagnosis, deep learning algorithms have demonstrated remarkable capabilities across various domains. In this blog post, we'll delve into the fundamentals of deep learning, explore popular architectures such as convolutional neural networks and recurrent neural networks, and discuss real-world applications that highlight the transformative potential of this technology.",
        date: new Date("31-Aug-2023")
    },
    {
        title: "The Art of Writing Clean Code",
        description: "Writing clean code is essential for building maintainable and scalable software applications. Clean code follows principles such as readability, simplicity, and consistency, making it easier for developers to understand, modify, and extend. In this blog post, we'll discuss best practices for writing clean code, including meaningful variable names, proper indentation, concise functions, and effective documentation. By adopting these practices, developers can improve code quality, reduce bugs, and enhance overall productivity.",
        date: new Date("10-Jun-2023")
    },
    {
        title: "Journey to the Center of the Earth",
        description: "Imagine embarking on an epic journey to the depths of the Earth's core, where molten rock churns and unimaginable pressures abound. While such a journey may seem like the stuff of science fiction, scientists have long been fascinated by the mysteries that lie beneath the Earth's surface. In this blog post, we'll explore the science of geology and delve into the inner workings of our planet, from tectonic plate movements and volcanic activity to seismic waves and mineral formation. Join us as we embark on a virtual expedition to the center of the Earth!",
        date: new Date("28-Jan-2023")
    },
    {
        title: "Mastering the Art of Photography",
        description: "Photography is more than just pointing and shooting – it's an art form that requires creativity, technical skill, and a keen eye for composition. Whether you're a beginner or an experienced photographer, there's always room for improvement and growth. In this blog post, we'll share tips, tricks, and techniques for mastering the art of photography, from understanding exposure and composition to mastering post-processing techniques. Whether you're capturing landscapes, portraits, or macro shots, this guide will help you take your photography to the next level.",
        date: new Date("01-Nov-2022")
    },
    {
        title: "Cooking with Chef Julia: A Culinary Adventure",
        description: "Join us on a culinary adventure with Chef Julia as she shares her favorite recipes and cooking tips. From savory soups and hearty stews to decadent desserts and baked goods, Chef Julia's recipes are sure to tantalize your taste buds and inspire your inner chef. In this blog post, we'll explore the art of cooking from scratch, using fresh ingredients and simple techniques to create delicious and wholesome meals. Whether you're a seasoned home cook or just starting out in the kitchen, there's something for everyone to enjoy in Chef Julia's kitchen!",
        date: new Date("25-May-2020")
    }
];




app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

function createPost(id, title, description, date, isEdited = false) {
    postObj = { id: id, title: title, description: description, date: date, isEdited: isEdited };

    return postObj;
}

function editPost(id, title, description) {
    postContent[id].title = title;
    postContent[id].description = description;
}

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/recentPosts", (req, res) => {
    console.log("entered here...");
    res.render("index.ejs", { recentPosts: recentPosts });
})

app.get("/view", (req, res) => {
    res.render("index.ejs", { posts: posts });
})

app.post("/delete", (req, res) => {
    console.log(req.body);
    posts = posts.filter(post => post.id != req.body.id);
    recentPosts = recentPosts.filter(post => { return post.id != req.body.id });
    console.log(posts);
    if (posts.length > 0) {
        res.render("index.ejs", { posts: posts });
    } else {
        res.render("index.ejs");
    }
});

app.post("/edit", (req, res) => {
    let id = req.body.id;
    posts.forEach(post => {
        if (post.id == id) {
            console.log(post.id + " " + post.title + " " + post.description);

            res.render("index.ejs", { posts: posts, title: post.title, description: post.description, id: post.id });
        }
    });
    // res.render("index.ejs",{posts : posts, title : req.body.id, description : req.body.description});

});

app.post("/submit", (req, res) => {
    let id = req.body.id;
    let isPresent = false;

    //to check if the post ID is already present i.e., to check if this is an edit request...
    posts.forEach(post => {
        if (post.id == req.body.id) {
            isPresent = true;
            console.log("already exists");
            post.title = req.body.title;
            post.description = req.body.description;
            post.isEdited = true;
        }
    });

    if (isPresent) {
        res.render("index.ejs", { posts: posts });
    } else {
        postContent = createPost(postId++, req.body.title, req.body.description, new Date());
        posts.push(postContent);
        recentPosts.unshift(postContent);
        console.log(posts);
        console.log(d);
        res.render("index.ejs", { posts: posts });
    }
});

app.listen(port, () => {
    console.log("Listening on port " + port);
});