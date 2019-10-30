
Handlebars.templates = {};

// Wrapper function to make promises work better with jquery
function loadTemplate(name) {
  return new Promise(function(resolve, reject) {
    $.get("handlebars/" + name + ".handlebars",(data) => {
      Handlebars.templates[name] = Handlebars.compile(data);
    })
      .done(resolve)
      .fail(reject);
  });
}

// Load in templates from .handlebars files
function loadTemplates()
{
  return new Promise((resolve, reject) => {
    Promise.all([
      loadTemplate("stationFull"),
      loadTemplate("stationSummary")
    ])
    .then(resolve);
  });
}