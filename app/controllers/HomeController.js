exports.index = (req, res) => {
    let attribute = {
        appName: "Express + Nunjucks",
        message: "Welcome to odbyt laasdlkfjslkfjalfjknd!"
    };

    res.render("home/index", { attribute: attribute });
};