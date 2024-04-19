console.log("Works");

const newPostButton = document.getElementsByClassName("newpost")[0];
const form = document.getElementsByClassName("blog-post")[0];
const editForm = document.getElementsByClassName("blog-post-edit-form")[0];
const exit = document.getElementsByClassName("exit")[0];
const editExit = document.getElementsByClassName("edit-exit")[0];
const edit = document.getElementsByClassName("edtBtn")[0];
let title = document.getElementById("title");
let description = document.getElementById("description");

if (editExit) {
    editExit.addEventListener("click", () => {
        console.log("Edit button clicked");
        editForm.setAttribute("closing", "");
        addEventListener("animationend", () => {
            editForm.style.display = "none";
        }, { once: true });
    });
}

newPostButton.addEventListener("click", () => {
    form.removeAttribute("closing");
    form.style.display = "flex";
    form.getElementsByTagName("input")[0].value = "";
    form.getElementsByTagName("textarea")[0].value = "";
});

exit.addEventListener("click", () => {
    form.setAttribute("closing", "");
    addEventListener("animationend", () => {
        form.style.display = "none";
    }, { once: true });
});