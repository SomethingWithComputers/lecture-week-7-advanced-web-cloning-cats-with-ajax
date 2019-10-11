var catNames = ["Mr. Fluffles", "Smokey", "Tiger", "Kitty", "Sassy", "Chewy", "Patch", "Roxy", "Sam"];

// Retrieve where the profiles are stored
var $profiles = $("#profiles");

// Retrieve the "template" that we'll be reusing
var $template = $(".template");

// Attach an event to clicking on remove
$template.find(".remove").on("click", function (event) {
    // Retrieve the parent of the remove button
    // (which is the profile)
    // And remove it completely
    console.log($(this).parent().remove());
});

// Remove it from view, but instead of remove
// detach() retrains the events
$template.detach();
$template.removeClass("template");

// Clones the template and adds a cat to the profiles
function addCat() {
    $.ajax("http://aws.random.cat/meow", {
        method: "GET"
    }).done(function (data) {
        // Output it to console so we can check its structure
        console.log(data);

        // True makes it also copy events
        var $clone = $template.clone(true);

        // Retrieve a random name and image from the list
        var randomName = randomItemFromList(catNames);
        var randomPicture = data.file;

        // Set the username to the cat name
        $clone.find(".username")
            .text(randomName);

        // Set the img src to the image
        $clone.find("img")
            .attr("src", randomPicture);

        // Append the clone to our profile
        $profiles.append($clone);
    }).fail(function (error) {
        console.error(error);
    });
}

// Makes sure that a cat is added at the right time
$("#add-cat").on("click", addCat);


// Helper function to retrieve a random item
// from any list
function randomItemFromList(items) {
    return items[Math.floor(Math.random() * items.length)];
}
